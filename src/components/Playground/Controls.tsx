import React from 'react';
import type { TenantConfig } from '@/lib/tenants';

type ControlsProps = {
  tenant: TenantConfig;
  prompt: string;
  setPrompt: (val: string) => void;
};

export default function Controls({ tenant, prompt, setPrompt }: ControlsProps) {
  return (
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
  );
}