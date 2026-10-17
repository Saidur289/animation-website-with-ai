"use client";

import React from "react";

const ROW_ONE_LOGOS = [
  { name: "AETHER FLUX", code: "AF-9", symbol: "✦" },
  { name: "NEURAL STUDIO", code: "NS", symbol: "◈" },
  { name: "OBSIDIAN LABS", code: "OL", symbol: "⬡" },
  { name: "HYPERREAL AI", code: "HR", symbol: "◎" },
  { name: "LUMEN ARTWORKS", code: "LA", symbol: "✧" },
  { name: "KINESIS 8K", code: "KN", symbol: "◷" },
  { name: "SYNTHETIQ", code: "SQ", symbol: "❖" },
  { name: "VORTEX CINEMA", code: "VC", symbol: "⊛" },
];

const ROW_TWO_LOGOS = [
  { name: "PRISM ENGINE", code: "PE", symbol: "▲" },
  { name: "OCTANE NEURAL", code: "ON", symbol: "⬢" },
  { name: "CHROMA WORLD", code: "CW", symbol: "◐" },
  { name: "ELEVEN ARTS", code: "EA", symbol: "◬" },
  { name: "SOLARIS 3D", code: "SL", symbol: "☼" },
  { name: "NEXUS CREATIVE", code: "NC", symbol: "◫" },
  { name: "SPECTRA LAB", code: "SP", symbol: "◪" },
  { name: "VALENCE CORE", code: "VC", symbol: "◮" },
];

export default function LogoMarqueeSection() {
  // Duplicate arrays to ensure seamless infinite looping with zero jump
  const rowOneCombined = [...ROW_ONE_LOGOS, ...ROW_ONE_LOGOS];
  const rowTwoCombined = [...ROW_TWO_LOGOS, ...ROW_TWO_LOGOS];

  return (
    <section className="relative z-20 py-20 overflow-hidden bg-[#080706] border-t border-white/[0.08]">
      {/* Subtle Cosmic Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-purple-900/[0.08] blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill border border-[#d4af37]/20 text-[11px] font-mono tracking-wider text-[#e5d5b8] mb-3">
          <span className="text-[#ff5c28]">✦</span> GLOBAL CREATIVE STANDARD
        </div>
        <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto font-normal">
          Powering next-generation visual production for the world&apos;s leading studios, directors, and design teams.
        </p>
      </div>

      {/* Marquee Wrapper with Smooth Edge Fade Mask */}
      <div className="relative w-full flex flex-col gap-5 mask-marquee-edges">
        {/* ROW 1: Moves continuously RIGHT → LEFT */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-left flex items-center gap-8 py-2">
            {rowOneCombined.map((logo, idx) => (
              <div
                key={`r1-${idx}`}
                className="group flex items-center gap-3.5 px-6 py-3.5 rounded-2xl glass-pill border border-white/[0.08] hover:border-purple-400/40 hover:bg-white/[0.08] transition-all duration-300 cursor-default select-none shadow-sm"
              >
                <div className="w-7 h-7 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-xs font-mono text-[#ff5c28] group-hover:scale-110 transition-transform">
                  {logo.symbol}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-semibold tracking-wider text-zinc-300 group-hover:text-white transition-colors">
                    {logo.name}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 group-hover:text-purple-300 transition-colors">
                    {logo.code} // VERIFIED
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: Moves continuously LEFT → RIGHT (Staggered spacing) */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-right flex items-center gap-8 py-2">
            {rowTwoCombined.map((logo, idx) => (
              <div
                key={`r2-${idx}`}
                className="group flex items-center gap-3.5 px-6 py-3.5 rounded-2xl glass-pill border border-white/[0.08] hover:border-[#ff5c28]/40 hover:bg-white/[0.08] transition-all duration-300 cursor-default select-none shadow-sm"
              >
                <div className="w-7 h-7 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-xs font-mono text-purple-400 group-hover:scale-110 transition-transform">
                  {logo.symbol}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-semibold tracking-wider text-zinc-300 group-hover:text-white transition-colors">
                    {logo.name}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 group-hover:text-[#ff5c28] transition-colors">
                    {logo.code} // ENTERPRISE
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
