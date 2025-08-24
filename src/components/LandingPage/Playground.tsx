import React, { useState } from 'react';
import type { TenantConfig } from '@/lib/tenants';

type PlaygroundProps = {
  tenant: TenantConfig;
};

export default function Playground({ tenant }: PlaygroundProps) {
  const [prompt, setPrompt] = useState('Create a 10s hype clip with bold captions and fast cuts.');

  return (
    <div className="min-h-screen" style={{ background: tenant.primaryColor }}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            {tenant.logoSrc && (
              <img src={tenant.logoSrc} alt={`${tenant.name} logo`} className="w-8 h-8 rounded" />
            )}
            <h1 className="text-white text-xl font-semibold">{tenant.name} Playground</h1>
          </div>
          <button
            className="px-4 py-2 rounded-lg text-white font-semibold"
            style={{ background: tenant.accentColor }}
          >
            {tenant.ctaText}
          </button>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left panel - Prompt + Settings */}
          <div className="bg-white/5 rounded-2xl border border-white/10 p-5">
            <label className="text-white/80 text-sm">Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="mt-2 w-full h-32 rounded-lg bg-white/5 text-white p-3 outline-none"
              placeholder="Describe the vibe, scene, and overlays..."
            />

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <label className="text-white/70 text-sm">Duration</label>
                <select className="mt-1 w-full rounded-lg bg-white/5 text-white p-2 outline-none">
                  <option>10s</option>
                  <option>15s</option>
                  <option>30s</option>
                </select>
              </div>
              <div>
                <label className="text-white/70 text-sm">Format</label>
                <select className="mt-1 w-full rounded-lg bg-white/5 text-white p-2 outline-none">
                  <option>9:16</option>
                  <option>1:1</option>
                  <option>16:9</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <button
                className="w-full py-3 rounded-lg text-white font-semibold"
                style={{
                  background: `linear-gradient(90deg, ${tenant.gradientFrom}, ${tenant.gradientTo})`,
                }}
              >
                Render Preview
              </button>
            </div>
          </div>

          {/* Right panel - Preview */}
          <div className="bg-white/5 rounded-2xl border border-white/10 p-5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Preview</h3>
              <span className="text-white/60 text-sm">1920x1080 • 10s</span>
            </div>
            <div className="flex-1 rounded-lg overflow-hidden bg-black/40 flex items-center justify-center">
              <div className="text-white/60 text-sm">Your preview will appear here</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}