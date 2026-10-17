"use client";

import React, { useState, useRef } from "react";
import TopNav from "@/components/TopNav";
import ScrollCanvasSequence from "@/components/ScrollCanvasSequence";
import InteractiveStudioModal from "@/components/InteractiveStudioModal";
import LogoMarqueeSection from "@/components/LogoMarqueeSection";
import BentoGridSection from "@/components/BentoGridSection";

export default function Home() {
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const heroTrackRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden selection:bg-[#ff5c28] selection:text-white bg-[#080706]">
      {/* =========================================================================
          HERO SCROLL TRACK: Pinned Runway for Cinematic Scroll-Linked Animation (h-[400vh])
          Preserves exact layout, text, navbar, buttons, spacing, colors, and styling
          ========================================================================= */}
      <div ref={heroTrackRef} className="relative h-[400vh]">
        {/* Sticky Viewport Container: Stays pinned while scrolling through the sequence */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
          {/* Cinematic Scroll-Linked Image Sequence Canvas directly behind the hero */}
          <ScrollCanvasSequence trackRef={heroTrackRef} />

          {/* Top Navigation Capsule */}
          <TopNav onOpenStudio={() => setIsStudioOpen(true)} />

          {/* =========================================================================
              HERO CONTENT: Minimal, Spacious, and Cinematic
              Atmospheric shadow behind left text, white/lavender typography & subtle pink glow
              ========================================================================= */}
          {/* Smooth Cinematic Dark Atmospheric Gradient behind left headline: strongest at 10-25%, fading out toward 45-50%, no hard edges */}
          <div 
            className="absolute inset-y-0 left-0 w-full sm:w-[60%] lg:w-[50%] pointer-events-none z-0"
            style={{
              background: "linear-gradient(to right, rgba(8, 7, 6, 0.94) 0%, rgba(8, 7, 6, 0.85) 15%, rgba(8, 7, 6, 0.65) 25%, rgba(8, 7, 6, 0.28) 38%, rgba(8, 7, 6, 0.08) 46%, transparent 50%)",
            }}
          />

          <main className="relative z-10 w-full h-full flex flex-col justify-between pt-24 sm:pt-28 md:pt-32 pb-0 px-6 sm:px-10 md:px-14 lg:px-16 max-w-[1680px] mx-auto">
            
            {/* Main Content Row: Left Content + Center Focus + Right Content */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-8 flex-1 my-auto w-full">
              
              {/* ===================================================
                  LEFT: Availability Badge + Headline (Enhanced Readability)
                  =================================================== */}
              <div className="flex flex-col items-start justify-center z-30 max-w-[440px] xl:max-w-[500px]">
                {/* Small Availability-Style Badge */}
                <div 
                  className="glass-pill rounded-full px-3.5 py-1.5 inline-flex items-center gap-2.5 mb-5 md:mb-6 shadow-md border border-white/15 hover:border-white/25 transition-colors"
                  id="hero-availability-badge"
                >
                  {/* Glowing Orange Pulse Dot */}
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5c28] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff5c28] shadow-[0_0_8px_#ff5c28]" />
                  </span>

                  {/* Badge Text */}
                  <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-zinc-100">
                    AI IMAGE GENERATOR
                  </span>
                </div>

                {/* Headline: Slightly bolder, clean white → subtle lavender gradient with soft shadow/glow */}
                <h1 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.9rem] xl:text-[3.45rem] font-extrabold tracking-[-0.035em] leading-[1.12] text-transparent bg-clip-text bg-gradient-to-br from-white via-[#faf7ff] to-[#ddd6fe]"
                  style={{
                    filter: "drop-shadow(0 4px 20px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 35px rgba(221, 214, 254, 0.35))",
                  }}
                >
                  Synthesize cinematic AI visuals with pure realism
                </h1>
              </div>

              {/* ===================================================
                  RIGHT: Supporting Description + Start Creating CTA Button
                  =================================================== */}
              <div className="flex flex-col items-start justify-center z-30 max-w-[340px] sm:max-w-[400px] lg:max-w-[340px] xl:max-w-[380px]">
                {/* Concise Supporting Description */}
                <p className="text-sm sm:text-base text-zinc-200/90 font-normal leading-relaxed mb-6 sm:mb-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                  DreamFrame transforms natural language prompts into photorealistic 8K imagery, cinematic 3D worlds, and surreal digital art with sub-second neural inference.
                </p>

                {/* Signature CTA Button */}
                <button
                  onClick={() => setIsStudioOpen(true)}
                  className="group relative inline-flex items-center gap-3.5 p-1.5 pr-7 rounded-full bg-gradient-to-r from-[#ff5c28] via-[#e11d48] to-[#9333ea] hover:brightness-110 active:scale-[0.98] transition-all duration-300 shadow-[0_10px_30px_rgba(255,92,40,0.45)] cursor-pointer"
                  id="hero-start-creating-btn"
                >
                  {/* White Circle Disc with Arrow on Left */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center text-[#ff5c28] shadow-md group-hover:translate-x-1 transition-transform duration-300">
                    <svg
                      className="w-4 h-4 fill-none stroke-current stroke-[2.5]"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </div>

                  {/* CTA Text */}
                  <span className="text-white font-semibold text-sm sm:text-base tracking-wide">
                    Start Creating
                  </span>

                  {/* Highlight ring */}
                  <div className="absolute inset-0 rounded-full ring-1 ring-white/30 pointer-events-none" />
                </button>
              </div>
            </div>

            {/* ===================================================
                BOTTOM SECTION: DREAMFRAME Main Visual (~90vw wide, centered)
                White/lavender gradient, subtle pink glow, and soft depth shadow
                =================================================== */}
            <div className="w-[90vw] max-w-[90vw] mx-auto text-center overflow-visible pointer-events-none select-none z-10 -mt-4 sm:-mt-8 md:-mt-12 lg:-mt-14 flex justify-center items-center">
              <span 
                className="text-[13.5vw] leading-[0.82] font-black tracking-[-0.035em] uppercase inline-block text-transparent bg-clip-text bg-gradient-to-b from-white via-[#f7f3ff] to-[#ded4f8]"
                style={{
                  filter: "drop-shadow(0 16px 45px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 50px rgba(244, 114, 182, 0.32)) drop-shadow(0 0 95px rgba(192, 132, 252, 0.25))",
                }}
              >
                DREAMFRAME
              </span>
            </div>
          </main>
        </div>
      </div>

      {/* =========================================================================
          SECONDARY SECTION: Deep-Dive Neural Capabilities
          ========================================================================= */}
      <section id="engine" className="relative z-20 py-24 px-6 sm:px-10 md:px-16 max-w-[1440px] mx-auto border-t border-white/10 bg-[#07060a]/95 backdrop-blur-xl rounded-t-3xl shadow-2xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono text-purple-300 mb-3">
              <span>✦</span> ARCHITECTURE SPECIFICATION
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              Next-Gen Neural Diffusion Engine
            </h2>
          </div>
          <p className="text-zinc-400 text-sm md:text-base max-w-md">
            Built from scratch to empower designers, art directors, and storytellers with ultra-fast cinematic generation and zero latency compromise.
          </p>
        </div>

        {/* Feature Spec Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              metric: "0.18s",
              title: "Sub-Second Latency",
              desc: "Instant text-to-pixel synthesis powered by optimized TensorRT FP8 kernel pipelines.",
              tag: "Real-time",
            },
            {
              metric: "8192px",
              title: "Native 8K Resolution",
              desc: "Deep high-frequency detail retention without artifacting or unnatural edge blur.",
              tag: "Hyper-detail",
            },
            {
              metric: "240 FPS",
              title: "Continuous Sequence Control",
              desc: "Maintain character and spatial consistency across camera sweeps and motion cuts.",
              tag: "Consistency",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
                <span className="text-4xl font-mono text-purple-400 font-bold">#</span>
              </div>
              <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-purple-300 mb-3 tracking-tight">
                {item.metric}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold text-white tracking-wide">
                  {item.title}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-zinc-300">
                  {item.tag}
                </span>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Sequence Milestones Strip */}
        <div className="mt-16 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5c28]" />
              <h4 className="font-semibold text-white text-sm sm:text-base tracking-wide">
                Background Sequence Milestones
              </h4>
            </div>
            <span className="text-xs font-mono text-zinc-400">
              240 Video Frames
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { frame: 1, label: "The Portal Opens", prompt: "Wildflower meadow dream gate" },
              { frame: 80, label: "Through the Horizon", prompt: "Floating island zoom" },
              { frame: 160, label: "Cosmic Skybus", prompt: "Astronaut with orange retro bus" },
              { frame: 220, label: "Not Out Of This Space", prompt: "3D editorial typography" },
            ].map((seq) => (
              <div
                key={seq.frame}
                onClick={() => setIsStudioOpen(true)}
                className="group relative rounded-2xl overflow-hidden glass-pill border border-white/10 hover:border-orange-400/50 cursor-pointer transition-all duration-300"
              >
                <div className="aspect-[16/10] overflow-hidden bg-black/60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/frames_240/frame-${String(seq.frame).padStart(3, "0")}.png`}
                    alt={seq.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3 bg-black/70 backdrop-blur-xs flex flex-col gap-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white group-hover:text-orange-400 transition-colors">
                      {seq.label}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">
                      #{seq.frame}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate">
                    {seq.prompt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          FOOTER: Minimalist Editorial
          =================================================== */}
      <footer className="relative z-20 border-t border-white/10 py-10 px-6 sm:px-12 max-w-[1680px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 bg-[#080706]">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-[#ff5c28] flex items-center justify-center p-0.5">
            <span className="w-0.5 h-2.5 bg-black rounded-full" />
          </div>
          <span className="text-zinc-200 font-semibold tracking-wider">
            DREAMFRAME AI
          </span>
          <span>© 2026. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white transition-colors">Hero</a>
          <a href="#engine" className="hover:text-white transition-colors">Engine</a>
          <button
            onClick={() => setIsStudioOpen(true)}
            className="hover:text-orange-400 transition-colors cursor-pointer"
          >
            Launch Studio
          </button>
        </div>
      </footer>

      {/* Interactive Studio Modal */}
      <InteractiveStudioModal
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
      />
    </div>
  );
}
