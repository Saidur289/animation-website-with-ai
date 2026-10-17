"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 240;

const getFramePath = (frameIndex: number) => {
  const padded = String(Math.max(1, Math.min(TOTAL_FRAMES, frameIndex))).padStart(3, "0");
  return `/frames_240/frame-${padded}.png`;
};

interface ScrollCanvasSequenceProps {
  trackRef: React.RefObject<HTMLDivElement | null>;
}

export default function ScrollCanvasSequence({ trackRef }: ScrollCanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());

  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const lastRenderedFrameRef = useRef<number>(-1);
  const prefersReducedMotionRef = useRef<boolean>(false);

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [activeFrame, setActiveFrame] = useState<number>(1);

  // High-performance canvas drawing with DPR scaling and aspect cover
  const drawFrame = useCallback((frameNum: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Retrieve exact frame, or fallback to closest loaded frame to avoid any flicker
    let img = imagesRef.current.get(frameNum);
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset <= 30; offset++) {
        const prev = imagesRef.current.get(frameNum - offset);
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = imagesRef.current.get(frameNum + offset);
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    if (img && img.complete && img.naturalWidth > 0) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // Exact aspect-cover calculation with zero distortion
      const scale = Math.max(cw / iw, ch / ih);
      const sw = iw * scale;
      const sh = ih * scale;
      const ox = (cw - sw) / 2;
      const oy = (ch - sh) / 2;

      ctx.drawImage(img, 0, 0, iw, ih, ox, oy, sw, sh);
      setActiveFrame(frameNum);
    }
  }, []);

  // Responsive retina/DPR canvas sizing
  useEffect(() => {
    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);

      // Redraw immediately on resize
      if (lastRenderedFrameRef.current > 0) {
        drawFrame(lastRenderedFrameRef.current);
      } else {
        drawFrame(1);
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize, { passive: true });
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, [drawFrame]);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotionRef.current = mediaQuery.matches;

    const listener = (e: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = e.matches;
    };
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Progressive preloading strategy
  useEffect(() => {
    let isMounted = true;

    // Load Frame 1 immediately
    const firstImg = new Image();
    firstImg.src = getFramePath(1);
    firstImg.onload = () => {
      if (!isMounted) return;
      imagesRef.current.set(1, firstImg);
      drawFrame(1);
      lastRenderedFrameRef.current = 1;
      setIsLoaded(true);

      // Progressive chunked preloading of all 240 frames
      const loadAllFrames = async () => {
        // Phase 1: Immediate buffer of the first 25 frames for zero initial scrub latency
        for (let i = 2; i <= 25; i++) {
          if (!isMounted) return;
          const img = new Image();
          img.src = getFramePath(i);
          img.onload = () => {
            if (isMounted) imagesRef.current.set(i, img);
          };
        }

        // Phase 2: Keyframes across the entire sequence (every 4th frame)
        for (let i = 26; i <= TOTAL_FRAMES; i += 4) {
          if (!isMounted) return;
          const img = new Image();
          img.src = getFramePath(i);
          img.onload = () => {
            if (isMounted) imagesRef.current.set(i, img);
          };
        }

        // Phase 3: Fill all remaining frames
        for (let i = 2; i <= TOTAL_FRAMES; i++) {
          if (!isMounted) return;
          if (imagesRef.current.has(i)) continue;

          const img = new Image();
          img.src = getFramePath(i);
          img.onload = () => {
            if (isMounted) imagesRef.current.set(i, img);
          };

          if (i % 16 === 0) {
            await new Promise((resolve) => setTimeout(resolve, 15));
          }
        }
      };

      loadAllFrames();
    };

    return () => {
      isMounted = false;
    };
  }, [drawFrame]);

  // Scroll listener: Calculates precise scroll progress between 0 and 1
  useEffect(() => {
    const handleScroll = () => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const scrollableHeight = track.offsetHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      // 0 at top, 1 at bottom of scroll runway
      const rawProgress = -rect.top / scrollableHeight;
      const progress = Math.min(1, Math.max(0, rawProgress));
      targetProgressRef.current = progress;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial measurement
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [trackRef]);

  // Persistent 60FPS requestAnimationFrame loop with smooth interpolation / lerp
  useEffect(() => {
    let animId: number;

    const renderLoop = () => {
      const target = targetProgressRef.current;
      let current = currentProgressRef.current;

      if (prefersReducedMotionRef.current) {
        current = target;
      } else {
        // Silky smooth Apple-style lerp easing
        const delta = target - current;
        current += delta * 0.12;
      }

      currentProgressRef.current = current;

      // Map progress directly to frame 1 -> 240
      const frameIndex = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.round(current * (TOTAL_FRAMES - 1)) + 1)
      );

      // Only redraw when target frame index changes
      if (frameIndex !== lastRenderedFrameRef.current) {
        drawFrame(frameIndex);
        lastRenderedFrameRef.current = frameIndex;
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, [drawFrame]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none -z-10 bg-[#080706]">
      {/* Fullscreen HTML5 Sticky Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover transition-opacity duration-700"
        style={{
          opacity: isLoaded ? 1 : 0,
        }}
      />

      {/* Deep Gold & Dark Luxury Seamless Vignette: No visible edges */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#080706]/40 via-transparent to-[#080706]/70 pointer-events-none" 
      />

      {/* Subtle warm champagne gold rim lighting overlay */}
      <div 
        className="absolute inset-0 bg-radial-[circle_900px_at_50%_35%] from-amber-900/10 via-transparent to-transparent pointer-events-none" 
      />

      {/* Seamless bottom fade for oversized DREAMFRAME text */}
      <div 
        className="absolute bottom-0 inset-x-0 h-[28vh] bg-gradient-to-t from-[#080706] via-[#080706]/75 to-transparent pointer-events-none" 
      />

      {/* Minimalistic luxury frame counter at bottom right */}
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-10 pointer-events-none z-30 flex items-center gap-2">
        <div className="glass-pill rounded-full px-3 py-1 flex items-center gap-2 text-[10px] font-mono text-[#e5d5b8]/80 border border-[#d4af37]/20 shadow-xl bg-black/40 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
          <span>FRAME {String(activeFrame).padStart(3, "0")} / {TOTAL_FRAMES}</span>
        </div>
      </div>
    </div>
  );
}
