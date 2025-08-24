import React from 'react';

type ToolbarProps = {
  onCamera?: () => void;
  onClear?: () => void;
  onSettings?: () => void;
};

export default function Toolbar({ onCamera, onClear, onSettings }: ToolbarProps) {
  const btn = 'w-10 h-10 rounded-full bg-white/80 backdrop-blur border border-black/10 flex items-center justify-center shadow';
  const icon = 'w-5 h-5 text-gray-800';
  return (
    <div className="flex flex-col gap-3 p-2 rounded-full bg-white/40 backdrop-blur border border-black/10 shadow">
      <button className={btn} onClick={onCamera} aria-label="Camera">
        <svg className={icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h3l2-2h6l2 2h3v12H4V7z" />
        </svg>
      </button>
      <button className={btn} onClick={onClear} aria-label="Clear">
        <svg className={icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M9 7l1-2h4l1 2" />
        </svg>
      </button>
      <button className={btn} onClick={onSettings} aria-label="Settings">
        <svg className={icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8a4 4 0 100 8 4 4 0 000-8z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 12a10 10 0 0118.708-4.042M22 12A10 10 0 016.292 19.958" />
        </svg>
      </button>
    </div>
  );
}