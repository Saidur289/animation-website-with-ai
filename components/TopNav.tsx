"use client";

import React, { useState } from "react";

interface TopNavProps {
  onOpenStudio?: () => void;
}

export default function TopNav({ onOpenStudio }: TopNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-6 left-6 md:top-8 md:left-10 z-50">
        {/* Iconic Glass Capsule Menu matching reference screenshot */}
        <div className="glass-pill rounded-full px-4 py-2 flex items-center gap-3.5 shadow-2xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.09]">
          {/* Circular orange icon with vertical stripes matching the reference */}
          <div className="w-6 h-6 rounded-full bg-[#ff5c28] flex items-center justify-center p-1 shadow-[0_0_12px_rgba(255,92,40,0.5)]">
            <div className="w-full h-full flex items-center justify-between px-0.5">
              <span className="w-[1.5px] h-3 bg-black/70 rounded-full" />
              <span className="w-[1.5px] h-3.5 bg-black/70 rounded-full" />
              <span className="w-[1.5px] h-3 bg-black/70 rounded-full" />
            </div>
          </div>

          {/* Brand Name */}
          <span className="text-white font-medium text-sm tracking-wide">
            DreamFrame
          </span>

          {/* Divider */}
          <div className="w-[1px] h-3.5 bg-white/15" />

          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col items-center justify-center gap-1 w-5 h-5 text-white/80 hover:text-white transition-colors cursor-pointer group"
            aria-label="Toggle navigation menu"
            id="nav-menu-toggle"
          >
            <span
              className={`w-4 h-[1.5px] bg-current rounded-full transition-transform duration-300 ${
                menuOpen ? "rotate-45 translate-y-[5.5px]" : ""
              }`}
            />
            <span
              className={`w-4 h-[1.5px] bg-current rounded-full transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`w-4 h-[1.5px] bg-current rounded-full transition-transform duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[5.5px]" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Top Right Status & Quick Action */}
      <div className="fixed top-6 right-6 md:top-8 md:right-10 z-40 hidden sm:flex items-center gap-3">
        <div className="glass-pill rounded-full px-3.5 py-1.5 flex items-center gap-2 text-xs text-white/70">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>v2.4 Neural Core</span>
        </div>
        <button
          onClick={onOpenStudio}
          className="glass-pill rounded-full px-4 py-1.5 text-xs font-medium text-white hover:bg-white/10 transition-colors cursor-pointer border border-white/10 hover:border-purple-500/40"
          id="quick-studio-btn"
        >
          Launch Studio
        </button>
      </div>

      {/* Navigation Drawer / Modal */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md flex items-start pt-24 px-6 md:px-12 animate-in fade-in duration-200"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="glass-panel rounded-3xl p-6 md:p-8 max-w-md w-full border border-white/15 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#ff5c28] flex items-center justify-center">
                  <span className="w-1 h-2 bg-black/60 rounded-full" />
                </div>
                <span className="font-semibold text-white tracking-wide">
                  DREAMFRAME NAVIGATION
                </span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white/50 hover:text-white text-lg p-1"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <nav className="flex flex-col gap-3">
              {[
                { name: "Diffusion Engine", tag: "FLUX.2 Core", href: "#engine" },
                { name: "Canvas Studio", tag: "Infinite 8K", href: "#studio" },
                { name: "Frame Sequence", tag: "240 Frames", href: "#canvas-hero" },
                { name: "Community Gallery", tag: "Top Picks", href: "#gallery" },
                { name: "API & Developers", tag: "99.9% SLA", href: "#api" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.07] transition-all group"
                >
                  <span className="text-white/90 group-hover:text-white font-medium text-base">
                    {item.name}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50 group-hover:text-purple-300 group-hover:border-purple-400/30">
                    {item.tag}
                  </span>
                </a>
              ))}
            </nav>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-white/40">Next.js 16 • Turbopack</span>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenStudio?.();
                }}
                className="text-xs font-semibold px-4 py-2 rounded-full bg-[#ff5c28] hover:bg-[#ff6e3d] text-white transition-all shadow-[0_0_15px_rgba(255,92,40,0.4)]"
              >
                Start Creating →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
