"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 240;

const getFramePath = (frameIndex: number) => {
  const padded = String(Math.max(1, Math.min(TOTAL_FRAMES, frameIndex))).padStart(3, "0");
  return `/extracted_frames/ezgif-frame-${padded}.jpg`;
};

interface BackgroundCanvasVideoProps {
  onFrameUpdate?: (frame: number) => void;
}

export default function BackgroundCanvasVideo({ onFrameUpdate }: BackgroundCanvasVideoProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());

  const [currentFrame, setCurrentFrame] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true); // Autoplay as background video
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);

  // Draw frame to canvas with high-DPI crisp aspect-cover scaling
  const drawFrame = useCallback((frameNum: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current.get(frameNum);
    if (img && img.complete && img.naturalWidth > 0) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // Calculate aspect cover scale
      const scale = Math.max(cw / iw, ch / ih);
      const sw = iw * scale;
      const sh = ih * scale;
      const ox = (cw - sw) / 2;
      const oy = (ch - sh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, 0, 0, iw, ih, ox, oy, sw, sh);
      onFrameUpdate?.(frameNum);
    }
  }, [onFrameUpdate]);

  // Handle high-DPI canvas resizing
  useEffect(() => {
    const updateSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      drawFrame(currentFrame);
    };

    updateSize();
    window.addEventListener("resize", updateSize, { passive: true });
    return () => window.removeEventListener("resize", updateSize);
  }, [currentFrame, drawFrame]);

  // Preload initial frame + sequential frames
  useEffect(() => {
    let isMounted = true;
    const initialImg = new Image();
    initialImg.src = getFramePath(1);
    initialImg.onload = () => {
      if (!isMounted) return;
      imagesRef.current.set(1, initialImg);
      drawFrame(1);
      setIsLoaded(true);

      // Preload subsequent frames
      const preloadSequence = async () => {
        // Step 1: Preload immediate first 30 frames for seamless playback start
        for (let i = 2; i <= 30; i++) {
          if (!isMounted) return;
          const img = new Image();
          img.src = getFramePath(i);
          img.onload = () => {
            if (isMounted) imagesRef.current.set(i, img);
          };
        }

        // Step 2: Preload key interval frames
        for (let i = 31; i <= TOTAL_FRAMES; i += 3) {
          if (!isMounted) return;
          const img = new Image();
          img.src = getFramePath(i);
          img.onload = () => {
            if (isMounted) imagesRef.current.set(i, img);
          };
        }

        // Step 3: Fill in remaining frames
        for (let i = 2; i <= TOTAL_FRAMES; i++) {
          if (!isMounted) return;
          if (imagesRef.current.has(i)) continue;
          const img = new Image();
          img.src = getFramePath(i);
          img.onload = () => {
            if (isMounted) imagesRef.current.set(i, img);
          };
          if (i % 15 === 0) {
            await new Promise((r) => setTimeout(r, 20));
          }
        }
      };

      preloadSequence();
    };

    return () => {
      isMounted = false;
    };
  }, [drawFrame]);

  // Video Autoplay / Loop animation cycle at 24fps
  useEffect(() => {
    if (!isPlaying) return;

    let animId: number;
    let lastTime = performance.now();
    const fps = 24;
    const interval = 1000 / fps;

    const loop = (currentTime: number) => {
      const delta = currentTime - lastTime;
      if (delta >= interval) {
        lastTime = currentTime - (delta % interval);
        setCurrentFrame((prev) => {
          const next = prev >= TOTAL_FRAMES ? 1 : prev + 1;
          drawFrame(next);
          return next;
        });
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, drawFrame]);

  // Scroll scrubbing when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      if (scrollY <= 0) return; // let video loop naturally at top

      const maxScrollDistance = windowHeight * 1.5;
      const progress = Math.min(1, Math.max(0, scrollY / maxScrollDistance));
      const targetFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.floor(progress * (TOTAL_FRAMES - 1)) + 1));

      if (imagesRef.current.has(targetFrame)) {
        setCurrentFrame(targetFrame);
        drawFrame(targetFrame);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [drawFrame]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none -z-10">
      {/* HTML5 Canvas scaled with devicePixelRatio and object-cover */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover transition-opacity duration-500"
        style={{
          opacity: isLoaded ? 1 : 0,
        }}
      />

      {/* Crisp, clean vignette: keeps the center video completely clear and focused */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/65 pointer-events-none" 
      />

      {/* Subtle bottom shadow to anchor the oversized DREAMFRAME brand typography */}
      <div 
        className="absolute bottom-0 inset-x-0 h-[26vh] bg-gradient-to-t from-[#07060a]/80 via-transparent to-transparent pointer-events-none" 
      />

      {/* Minimal Video Play/Pause & Scrub Controls at Bottom Right */}
      <div 
        className="absolute bottom-6 right-6 md:bottom-8 md:right-10 pointer-events-auto z-40 flex items-center gap-2"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {showControls && (
          <div className="glass-pill rounded-full px-3 py-1.5 flex items-center gap-3 animate-in fade-in duration-200">
            <input
              type="range"
              min={1}
              max={TOTAL_FRAMES}
              value={currentFrame}
              onChange={(e) => {
                setIsPlaying(false);
                const frame = parseInt(e.target.value, 10);
                setCurrentFrame(frame);
                drawFrame(frame);
              }}
              className="w-24 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#ff5c28]"
              title="Scrub video frames"
            />
            <span className="text-[10px] font-mono text-white/80">
              {String(currentFrame).padStart(3, "0")}/{TOTAL_FRAMES}
            </span>
          </div>
        )}

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="glass-pill rounded-full w-9 h-9 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition-all cursor-pointer shadow-lg"
          title={isPlaying ? "Pause background video" : "Play background video"}
          aria-label="Toggle background video playback"
        >
          <span className="text-xs">{isPlaying ? "❚❚" : "▶"}</span>
        </button>
      </div>
    </div>
  );
}
