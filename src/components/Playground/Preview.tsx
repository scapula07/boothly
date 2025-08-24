import React from 'react';

export default function Preview() {
  return (
    <div className="bg-white/5 rounded-2xl border border-white/10 p-5 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Preview</h3>
        <span className="text-white/60 text-sm">1920x1080 • 10s</span>
      </div>
      <div className="flex-1 rounded-lg overflow-hidden bg-black/40 flex items-center justify-center">
        <div className="text-white/60 text-sm">Your preview will appear here</div>
      </div>
    </div>
  );
}