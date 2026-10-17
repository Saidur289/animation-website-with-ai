"use client";

import React, { useState } from "react";

interface InteractiveStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_PROMPTS = [
  {
    title: "Dream Portal",
    prompt: "Surreal white doorway standing in an endless alpine flower meadow, floating islands, hyperrealistic octane render",
    frame: 1,
  },
  {
    title: "Cosmic Skybus",
    prompt: "Vintage orange camper bus floating through sunset clouds with astronaut sitting on ladder, 8k cinematic surrealism",
    frame: 180,
  },
  {
    title: "Not Out Of This Space",
    prompt: "Astronaut in orange spacesuit perched atop floating clouds, snow-capped mountain backdrop, bold 3D typography",
    frame: 220,
  },
  {
    title: "Floating Sanctuary",
    prompt: "Lush botanical floating rock islands with cascading waterfalls beneath glowing crescent moon, soft twilight lighting",
    frame: 45,
  },
];

export default function InteractiveStudioModal({ isOpen, onClose }: InteractiveStudioModalProps) {
  const [promptText, setPromptText] = useState(PRESET_PROMPTS[0].prompt);
  const [selectedRatio, setSelectedRatio] = useState("16:9");
  const [selectedModel, setSelectedModel] = useState("DreamFrame FLUX.2");
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewFrame, setPreviewFrame] = useState(1);
  const [progress, setProgress] = useState(0);

  if (!isOpen) return null;

  const handleGenerate = () => {
    setIsGenerating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          // Pick a random exciting frame
          const frames = [1, 50, 120, 180, 220];
          const next = frames[Math.floor(Math.random() * frames.length)];
          setPreviewFrame(next);
          return 100;
        }
        return prev + 25;
      });
    }, 150);
  };

  const currentFrameSrc = `/extracted_frames/ezgif-frame-${String(previewFrame).padStart(3, "0")}.jpg`;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="glass-panel w-full max-w-3xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#ff5c28] to-purple-600 flex items-center justify-center text-white shadow-md">
              ✦
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">
                DreamFrame Neural Studio
              </h3>
              <p className="text-xs text-zinc-400">
                Interactive real-time text-to-image synthesis
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full glass-pill flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Studio Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Controls Column */}
          <div className="md:col-span-7 flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5 uppercase tracking-wider">
                Prompt Definition
              </label>
              <textarea
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                rows={3}
                className="w-full bg-black/40 border border-white/15 rounded-2xl p-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-400/80 transition-colors resize-none"
                placeholder="Describe anything you imagine..."
              />
            </div>

            {/* Prompt Presets */}
            <div>
              <label className="block text-[11px] font-medium text-zinc-400 mb-2 uppercase tracking-wider">
                Popular Aesthetic Presets
              </label>
              <div className="flex flex-wrap gap-2">
                {PRESET_PROMPTS.map((preset) => (
                  <button
                    key={preset.title}
                    onClick={() => {
                      setPromptText(preset.prompt);
                      setPreviewFrame(preset.frame);
                    }}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
                  >
                    ✦ {preset.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Model & Aspect Ratio Row */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
                  Model Engine
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                >
                  <option value="DreamFrame FLUX.2">DreamFrame FLUX.2 (Hyper)</option>
                  <option value="Cinematic Ultra 8K">Cinematic Ultra 8K</option>
                  <option value="Surrealist Diffusion">Surrealist Diffusion</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
                  Aspect Ratio
                </label>
                <div className="flex gap-2">
                  {["16:9", "1:1", "9:16"].map((ratio) => (
                    <button
                      key={ratio}
                      onClick={() => setSelectedRatio(ratio)}
                      className={`flex-1 py-1.5 text-xs font-mono rounded-lg border transition-all cursor-pointer ${
                        selectedRatio === ratio
                          ? "bg-purple-600/30 border-purple-400 text-purple-200"
                          : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generate Action Button */}
            <div className="pt-2">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#ff5c28] via-[#e11d48] to-[#9333ea] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_8px_25px_rgba(255,92,40,0.4)] hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Synthesizing ({progress}%)...</span>
                  </>
                ) : (
                  <>
                    <span>✦ Generate with DreamFrame</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Preview Column */}
          <div className="md:col-span-5 flex flex-col">
            <div className="relative w-full aspect-[16/10] sm:aspect-square rounded-2xl overflow-hidden glass-panel border border-white/15 flex items-center justify-center bg-black/60 shadow-inner">
              {/* Image Output */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentFrameSrc}
                alt="Generated AI artwork"
                className={`w-full h-full object-cover transition-all duration-500 ${
                  isGenerating ? "blur-sm scale-95 opacity-60" : "blur-0 scale-100 opacity-100"
                }`}
              />

              {isGenerating && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                  <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden max-w-[160px] mb-2">
                    <div
                      className="bg-[#ff5c28] h-full transition-all duration-150"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-mono text-white/90">
                    Step {progress / 25}/4 Diffusion
                  </span>
                </div>
              )}

              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                <span className="text-[10px] font-mono bg-black/70 px-2 py-0.5 rounded text-white/80">
                  {selectedRatio} • 8K
                </span>
                <span className="text-[10px] font-mono bg-purple-900/70 border border-purple-400/30 px-2 py-0.5 rounded text-purple-200">
                  FLUX.2
                </span>
              </div>
            </div>

            <p className="text-[11px] text-zinc-500 mt-2 text-center">
              Generated in 0.18s • Sub-pixel neural reconstruction
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
