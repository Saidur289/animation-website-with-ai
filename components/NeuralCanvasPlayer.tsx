"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 240;

const getFramePath = (frameIndex: number) => {
  const padded = String(Math.max(1, Math.min(TOTAL_FRAMES, frameIndex))).padStart(3, "0");
  return `/extracted_frames/ezgif-frame-${padded}.jpg`;
};

interface NeuralCanvasPlayerProps {
  onOpenStudio?: () => void;
}

export default function NeuralCanvasPlayer({ onOpenStudio }: NeuralCanvasPlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());

  const [currentFrame, setCurrentFrame] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [loadedCount, setLoadedCount] = useState<number>(0);

  const samplePrompt = "A surreal white door in a wildflower meadow opening into floating clouds with an orange skybus and astronaut, 8k cinematic lighting";

  // Draw a frame to canvas
  const drawFrame = useCallback((frameNum: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current.get(frameNum);
    if (img && img.complete && img.naturalWidth > 0) {
      // Ensure canvas internal resolution matches image resolution
      if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  }, []);

  // Preload initial frames and subsequent frames
  useEffect(() => {
    let isMounted = true;
    const initialImg = new Image();
    initialImg.src = getFramePath(1);
    initialImg.onload = () => {
      if (!isMounted) return;
      imagesRef.current.set(1, initialImg);
      drawFrame(1);
      setIsLoading(false);
      setLoadedCount((c) => c + 1);

      // Preload the remaining frames in priority chunks
      const preloadRemaining = async () => {
        // Step 1: Preload key interval frames first for instant scrubbing
        for (let i = 2; i <= TOTAL_FRAMES; i += 4) {
          if (!isMounted) return;
          const img = new Image();
          img.src = getFramePath(i);
          img.onload = () => {
            if (!isMounted) return;
            imagesRef.current.set(i, img);
            setLoadedCount((c) => c + 1);
          };
        }

        // Step 2: Preload all other frames
        for (let i = 2; i <= TOTAL_FRAMES; i++) {
          if (!isMounted) return;
          if (imagesRef.current.has(i)) continue;
          const img = new Image();
          img.src = getFramePath(i);
          img.onload = () => {
            if (!isMounted) return;
            imagesRef.current.set(i, img);
            setLoadedCount((c) => c + 1);
          };
          // Small micro-delay every 10 images to yield thread
          if (i % 12 === 0) {
            await new Promise((r) => setTimeout(r, 16));
          }
        }
      };

      preloadRemaining();
    };

    return () => {
      isMounted = false;
    };
  }, [drawFrame]);

  // Redraw when currentFrame changes
  useEffect(() => {
    drawFrame(currentFrame);
  }, [currentFrame, drawFrame]);

  // Handle Play / Pause animation loop
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

  // Scroll listener to scrub through frames as the user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (isPlaying) return; // don't fight scroll if playing auto-preview
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // Map scroll progress across first 1.5 viewport heights
      const maxScrollDistance = windowHeight * 1.8;
      const progress = Math.min(1, Math.max(0, scrollY / maxScrollDistance));
      const targetFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.floor(progress * (TOTAL_FRAMES - 1)) + 1));

      // Only find nearest loaded frame if target frame isn't ready
      let frameToDraw = targetFrame;
      if (!imagesRef.current.has(targetFrame)) {
        // Find closest loaded frame
        for (let offset = 1; offset < 20; offset++) {
          if (imagesRef.current.has(targetFrame - offset)) {
            frameToDraw = targetFrame - offset;
            break;
          } else if (imagesRef.current.has(targetFrame + offset)) {
            frameToDraw = targetFrame + offset;
            break;
          }
        }
      }

      setCurrentFrame(targetFrame);
      drawFrame(frameToDraw);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isPlaying, drawFrame]);

  // Copy prompt helper
  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(samplePrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[540px] lg:max-w-[480px] xl:max-w-[560px] mx-auto flex flex-col items-center group select-none"
    >
      {/* Ambient Radial Violet & Orange Glow behind the central canvas */}
      <div className="absolute -inset-4 bg-gradient-to-b from-purple-600/20 via-violet-900/10 to-orange-500/10 rounded-3xl blur-2xl -z-10 opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Main Canvas Frame Container */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/10] rounded-2xl md:rounded-3xl overflow-hidden glass-panel border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(147,51,234,0.2)] transition-transform duration-500 hover:border-purple-400/30">
        {/* Loading state indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#07060a]/90 z-20">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-white/60 tracking-wider font-mono">
                INITIALIZING DREAMFRAME ENGINE...
              </span>
            </div>
          </div>
        )}

        {/* The HTML5 Canvas for ultra-smooth 60fps frame scrubbing */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover cursor-ew-resize"
          onClick={() => setIsPlaying(!isPlaying)}
          title="Click to toggle cinematic playback or scrub"
        />

        {/* Top Floating Badge overlay on canvas */}
        <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10 flex items-center gap-2">
          <div className="glass-pill rounded-full px-2.5 py-1 flex items-center gap-1.5 text-[11px] font-medium text-white/90 shadow-md">
            <span className="text-orange-400">✦</span>
            <span>FLUX.2 Neural Synthesis</span>
          </div>
          <div className="glass-pill rounded-full px-2 py-1 text-[10px] font-mono text-purple-300">
            8K UHD
          </div>
        </div>

        {/* Top Right Quick Play/Pause Badge */}
        <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(!isPlaying);
            }}
            className="glass-pill rounded-full px-3 py-1 text-[11px] font-medium text-white/90 hover:text-white hover:bg-white/15 flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            id="canvas-play-toggle"
          >
            <span>{isPlaying ? "❚❚ Pause" : "▶ Play Sequence"}</span>
          </button>
        </div>

        {/* Interactive Bottom Scrub & Prompt Bar */}
        <div className="absolute bottom-0 inset-x-0 p-3 md:p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10 flex flex-col gap-2">
          {/* Timeline Scrub Slider */}
          <div className="flex items-center gap-2">
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
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#ff5c28] hover:accent-purple-400"
              aria-label="Animation sequence scrubber"
            />
            <span className="text-[10px] font-mono text-white/60 whitespace-nowrap">
              {String(currentFrame).padStart(3, "0")}/{TOTAL_FRAMES}
            </span>
          </div>

          {/* Prompt Chip */}
          <div className="flex items-center justify-between gap-2 bg-black/60 backdrop-blur-md rounded-xl px-3 py-2 border border-white/10 text-xs text-white/80">
            <p className="truncate text-[11px] sm:text-xs text-zinc-300">
              <span className="text-[#ff5c28] font-semibold">prompt: </span>
              {samplePrompt}
            </p>
            <button
              onClick={handleCopyPrompt}
              className="shrink-0 text-[11px] px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Copy prompt"
            >
              {copiedPrompt ? "✓ Copied" : "Copy"}
            </button>
          </div>
        </div>
      </div>

      {/* Floating Micro Meta Info underneath the visual */}
      <div className="w-full flex items-center justify-between px-2 pt-3 text-[11px] text-zinc-500 font-mono">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          Interactive 240-Frame Scrub
        </span>
        <button
          onClick={onOpenStudio}
          className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors cursor-pointer"
        >
          Try in Studio →
        </button>
      </div>
    </div>
  );
}
