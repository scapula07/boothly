import React from 'react';

export type RightPaneView = 'thumbnails' | 'settings';

type ToolbarProps = {
  currentView: RightPaneView;
  onViewChange: (view: RightPaneView) => void;
};

export default function Toolbar({ currentView, onViewChange }: ToolbarProps) {
  const btn = 'w-10 h-10 rounded-full backdrop-blur border flex items-center justify-center shadow transition-colors';
  const icon = 'w-5 h-5 transition-colors';

  return (
    <div className="flex flex-col gap-3 p-2 rounded-full bg-white/40 backdrop-blur border border-black/10 shadow">
      <button 
        className={`${btn} ${currentView === 'thumbnails' 
          ? 'bg-white text-gray-800 border-black/10' 
          : 'bg-white/80 text-gray-600 border-black/5 hover:bg-white hover:text-gray-800'
        }`}
        onClick={() => onViewChange('thumbnails')} 
        aria-label="Templates"
      >
        <svg className={icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      </button>
      <button 
        className={`${btn} ${currentView === 'settings' 
          ? 'bg-white text-gray-800 border-black/10' 
          : 'bg-white/80 text-gray-600 border-black/5 hover:bg-white hover:text-gray-800'
        }`}
        onClick={() => onViewChange('settings')} 
        aria-label="Settings"
      >
        <svg className={icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    </div>
  );
}