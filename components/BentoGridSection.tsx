"use client";

import React, { useState } from "react";

const STYLES = [
  { name: "Surreal Meadow", frame: 1, tag: "Cinematic" },
  { name: "Cosmic Skybus", frame: 160, tag: "Octane" },
  { name: "Alpine Gate", frame: 220, tag: "Editorial" },
];

const RATIOS = [
  { label: "16:9", desc: "Cinematic Landscape", widthClass: "w-full h-24" },
  { label: "1:1", desc: "Square Editorial", widthClass: "w-24 h-24" },
  { label: "9:16", desc: "Mobile Portrait", widthClass: "w-16 h-28" },
  { label: "21:9", desc: "Anamorphic Ultra", widthClass: "w-full h-16" },
];

export default function BentoGridSection() {
  const [activeStyle, setActiveStyle] = useState(0);
  const [activeRatio, setActiveRatio] = useState(0);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const samplePromptText = "astronaut perched on floating orange skybus in cloud canyon, snow peaks, golden sunset lighting, 8k octane render";

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(samplePromptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <section id="features" className="relative z-20 py-24 px-6 sm:px-10 md:px-14 lg:px-16 max-w-[1680px] mx-auto bg-[#080706]">
      {/* Soft Cosmic Nebula Glows in Background */}
      <div className="absolute top-[20%] left-[-100px] w-[600px] h-[600px] bg-purple-900/[0.12] rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-100px] w-[650px] h-[650px] bg-pink-900/[0.09] rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-900/[0.06] rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-[#d4af37]/25 text-xs font-mono tracking-wider text-[#e5d5b8] mb-4 shadow-md">
            <span className="text-[#ff5c28]">✦</span> ARCHITECTURAL CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.035em] text-transparent bg-clip-text bg-gradient-to-br from-white via-[#faf7ff] to-[#ddd6fe] leading-[1.15]">
            Engineered for Infinite Creative Vision
          </h2>
        </div>
        <p className="text-sm sm:text-base text-zinc-400 max-w-md leading-relaxed font-normal">
          A modular neural pipeline designed for creative directors, visual designers, and concept artists requiring pixel-level fidelity and zero downtime.
        </p>
      </div>

      {/* =========================================================================
          5-CARD ASYMMETRIC BENTO GRID
          Recreating asymmetric card proportions, rounded corners, spacing, and hierarchy
          ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* ===================================================
            CARD 1: Large Showcase Hero Card (Spans 7 cols on Desktop)
            Dominant visual centerpiece with live render inspection
            =================================================== */}
        <div className="md:col-span-12 lg:col-span-7 glass-panel rounded-[28px] p-6 sm:p-8 border border-white/10 hover:border-purple-400/40 transition-all duration-500 relative overflow-hidden group shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col justify-between min-h-[460px]">
          {/* Subtle Ambient Cosmic Pink Glow */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-pink-600/15 rounded-full blur-3xl pointer-events-none group-hover:bg-pink-600/25 transition-all duration-700" />

          {/* Card Top Metadata & Status */}
          <div className="flex items-center justify-between z-10 mb-6">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5c28] shadow-[0_0_10px_#ff5c28] animate-pulse" />
              <span className="text-xs font-mono font-semibold tracking-wider text-white/90 uppercase">
                FLUX.2 Hyper-Spatial Engine
              </span>
            </div>
            <div className="glass-pill px-3 py-1 rounded-full text-[11px] font-mono text-purple-300 border border-purple-500/20">
              8K NATIVE COHERENCE
            </div>
          </div>

          {/* Center Showcase Artwork Preview */}
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden glass-pill border border-white/10 my-auto shadow-inner bg-black/60 group-hover:border-purple-300/30 transition-all duration-500">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/frames_240/frame-${String(STYLES[activeStyle].frame).padStart(3, "0")}.png`}
              alt="FLUX.2 Neural Render"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Floating Live Metatags */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white/90 border border-white/10">
                Seed: 849204812
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-purple-950/80 backdrop-blur-md text-purple-200 border border-purple-400/30">
                Steps: 30 / 30
              </span>
            </div>

            <div className="absolute bottom-3 inset-x-3 flex items-center justify-between bg-black/70 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
              <span className="text-xs text-zinc-300 truncate font-sans">
                <span className="text-[#ff5c28] font-semibold">Style: </span>
                {STYLES[activeStyle].name} ({STYLES[activeStyle].tag})
              </span>
              <span className="text-[10px] font-mono text-emerald-400 whitespace-nowrap pl-2">
                ● 100% Coherence
              </span>
            </div>
          </div>

          {/* Card Bottom Description */}
          <div className="z-10 mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">
                Spatial Volumetric Synthesis
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-lg leading-relaxed">
                Renders cinematic 3D worlds with zero perspective distortion, photorealistic light bounce, and deep atmospheric depth.
              </p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {STYLES.map((st, i) => (
                <button
                  key={st.name}
                  onClick={() => setActiveStyle(i)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                    activeStyle === i
                      ? "bg-purple-600/30 border-purple-400 text-white font-medium shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                      : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                  }`}
                >
                  {st.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ===================================================
            CARD 2: Top Right Card (Spans 5 cols on Desktop)
            Sub-Second Latency Benchmark with Animated Pulse Ring
            =================================================== */}
        <div className="md:col-span-12 lg:col-span-5 glass-panel rounded-[28px] p-6 sm:p-8 border border-white/10 hover:border-[#ff5c28]/40 transition-all duration-500 relative overflow-hidden group shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col justify-between min-h-[460px]">
          {/* Subtle Ambient Violet/Orange Glow */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#ff5c28]/15 rounded-full blur-3xl pointer-events-none group-hover:bg-[#ff5c28]/25 transition-all duration-700" />

          {/* Card Header */}
          <div className="flex items-center justify-between z-10 mb-4">
            <span className="text-xs font-mono font-semibold tracking-wider text-white/80 uppercase">
              Inference Speed Benchmark
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#ff5c28]/20 border border-[#ff5c28]/40 text-orange-200">
              FP8 TENSORRT
            </span>
          </div>

          {/* Animated Benchmark Meter Graphic */}
          <div className="my-auto py-6 flex flex-col items-center justify-center relative z-10">
            {/* Concentric Glowing Rings */}
            <div className="relative w-44 h-44 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-purple-500/20 animate-ping opacity-40" />
              <div className="absolute inset-2 rounded-full border border-purple-500/30 animate-pulse" />
              <div className="absolute inset-4 rounded-full border border-orange-500/30" />
              <div className="w-32 h-32 rounded-full glass-panel border border-white/20 flex flex-col items-center justify-center shadow-[0_0_35px_rgba(255,92,40,0.3)] bg-black/60">
                <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-100 to-[#ff5c28] tracking-tight">
                  0.18s
                </span>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mt-0.5">
                  LATENCY
                </span>
              </div>
            </div>

            {/* Performance Metric Pills */}
            <div className="grid grid-cols-2 gap-3 w-full mt-6">
              <div className="glass-pill p-3 rounded-xl border border-white/10 text-center">
                <span className="block text-xs font-mono text-zinc-400">Throughput</span>
                <span className="text-sm font-bold text-white">45 frames/sec</span>
              </div>
              <div className="glass-pill p-3 rounded-xl border border-white/10 text-center">
                <span className="block text-xs font-mono text-zinc-400">VRAM Footprint</span>
                <span className="text-sm font-bold text-purple-300">8.4 GB Optimized</span>
              </div>
            </div>
          </div>

          {/* Card Footer Copy */}
          <div className="z-10 pt-4 border-t border-white/10">
            <h3 className="text-xl font-bold text-white tracking-tight mb-1">
              Zero-Latency Kernel
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Sub-second neural diffusion enables real-time scrubbing, prompt prototyping, and instant creative flow without waiting.
            </p>
          </div>
        </div>

        {/* ===================================================
            CARD 3: Bottom Left Card (Spans 4 cols on Desktop)
            Spatial Identity & Character Lock
            =================================================== */}
        <div className="md:col-span-6 lg:col-span-4 glass-panel rounded-[28px] p-6 sm:p-7 border border-white/10 hover:border-purple-400/40 transition-all duration-300 flex flex-col justify-between shadow-lg relative overflow-hidden group min-h-[340px]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-semibold tracking-wider text-purple-300 uppercase">
                LoRA & Subject Lock
              </span>
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            </div>

            {/* Visual Subject Stack */}
            <div className="grid grid-cols-3 gap-2 my-4">
              {[1, 80, 160].map((f, i) => (
                <div key={f} className="relative rounded-xl overflow-hidden aspect-square border border-white/10 bg-black/60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/frames_240/frame-${String(f).padStart(3, "0")}.png`}
                    alt={`Subject multi-angle ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute bottom-1 right-1 text-[9px] font-mono px-1 rounded bg-black/80 text-white/90">
                    Shot {i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white tracking-tight mb-1">
              Subject & Identity Consistency
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Lock subjects, lighting schemes, and architectural grammar across multiple frames and campaign assets.
            </p>
          </div>
        </div>

        {/* ===================================================
            CARD 4: Bottom Center Card (Spans 4 cols on Desktop)
            Dynamic Aspect Ratio & Infinite Outpainting
            =================================================== */}
        <div className="md:col-span-6 lg:col-span-4 glass-panel rounded-[28px] p-6 sm:p-7 border border-white/10 hover:border-pink-400/40 transition-all duration-300 flex flex-col justify-between shadow-lg relative overflow-hidden group min-h-[340px]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-semibold tracking-wider text-pink-300 uppercase">
                Infinite Canvas
              </span>
              <span className="text-[10px] font-mono text-zinc-400">
                {RATIOS[activeRatio].desc}
              </span>
            </div>

            {/* Dynamic Aspect Ratio Preview Box */}
            <div className="w-full h-32 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center p-3 relative overflow-hidden my-3">
              <div
                className={`border-2 border-dashed border-pink-400/60 rounded-lg flex items-center justify-center transition-all duration-500 bg-pink-500/10 ${RATIOS[activeRatio].widthClass}`}
              >
                <span className="text-xs font-mono font-bold text-white">
                  {RATIOS[activeRatio].label}
                </span>
              </div>
            </div>

            {/* Ratio Selector Buttons */}
            <div className="grid grid-cols-4 gap-1.5 mb-2">
              {RATIOS.map((r, i) => (
                <button
                  key={r.label}
                  onClick={() => setActiveRatio(i)}
                  className={`py-1 text-[11px] font-mono rounded-lg border transition-all cursor-pointer ${
                    activeRatio === i
                      ? "bg-pink-600/30 border-pink-400 text-white font-semibold"
                      : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white tracking-tight mb-1">
              Infinite Canvas Outpainting
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Expand frame boundaries to widescreen, banner, or vertical formats with zero seam artifacts or prompt bleed.
            </p>
          </div>
        </div>

        {/* ===================================================
            CARD 5: Bottom Right Card (Spans 4 cols on Desktop)
            Interactive Prompt Engine & Token Synthesizer
            =================================================== */}
        <div className="md:col-span-12 lg:col-span-4 glass-panel rounded-[28px] p-6 sm:p-7 border border-white/10 hover:border-purple-400/40 transition-all duration-300 flex flex-col justify-between shadow-lg relative overflow-hidden group min-h-[340px]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-semibold tracking-wider text-purple-300 uppercase">
                Natural Language Synthesizer
              </span>
              <button
                onClick={handleCopyPrompt}
                className="text-[11px] font-mono px-2.5 py-0.5 rounded-full glass-pill border border-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                {copiedPrompt ? "✓ Copied" : "Copy"}
              </button>
            </div>

            {/* Interactive Tokenized Prompt Box */}
            <div className="bg-black/50 rounded-xl p-3 border border-white/10 my-3 text-xs leading-relaxed text-zinc-300 font-sans">
              <span className="text-[#ff5c28] font-bold">/imagine </span>
              <span className="bg-purple-900/40 text-purple-200 px-1 py-0.5 rounded">astronaut</span>
              {" "}resting on{" "}
              <span className="bg-orange-900/40 text-orange-200 px-1 py-0.5 rounded">orange skybus</span>
              {" "}above wildflower clouds,{" "}
              <span className="bg-pink-900/40 text-pink-200 px-1 py-0.5 rounded">8k octane</span>
              {" "}render --v 6.1
            </div>

            {/* Token Tags */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-zinc-400 border border-white/5">
                Volumetric Fog
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-zinc-400 border border-white/5">
                Anamorphic Flare
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-zinc-400 border border-white/5">
                35mm Lens
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white tracking-tight mb-1">
              Neural Prompt Compiler
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Automatically injects optimal optical lens physics, focal depths, and color temperature tags into plain text ideas.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
