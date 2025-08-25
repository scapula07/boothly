import React, { useState } from 'react';
import { useRouter } from 'next/router';


const TEMPLATES = [
  { id: '1', label: 'Corporate Conference', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
  { id: '2', label: 'Music Festival', img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
  { id: '3', label: 'Product Launch', img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80' },
  { id: '4', label: 'Fashion Show', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80' },
  { id: '5', label: 'Retro 80s Vibe', img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
  { id: '6', label: 'Luxury Brand', img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80' },
  { id: '7', label: 'Trippy Psychedelic', img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
  { id: '8', label: 'Beat Sync Music Video', img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
  { id: '9', label: 'Loopable Stories', img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
  { id: '10', label: 'TikTok Challenge', img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
  { id: '11', label: 'Instagram Stories', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' }
];



export default function TemplateModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState('Themed');
  const router = useRouter();

  const handleTemplateSelection = (templateId: string) => {
    router.push(`/events/create?template=${templateId}`);
    onClose();
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl mx-auto p-8 relative animate-fadein">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 text-2xl font-bold">&times;</button>
        <h2 className="text-3xl font-semibold text-center mb-6">Select A Template</h2>
  
        {/* Template grid */}
        <div className="grid grid-cols-6 gap-4 mb-8">
          {TEMPLATES.map((tpl) => (
            <div
              key={tpl.id}
              onClick={() => handleTemplateSelection(tpl.id)}
              className="relative rounded-lg overflow-hidden border border-gray-200 bg-white shadow hover:shadow-lg cursor-pointer group flex flex-col items-center"
              style={{ minHeight: '96px' }}
            >
              <img src={tpl.img} alt={tpl.label} className="w-full h-24 object-cover" />
              <span
                className="absolute bottom-0 left-0 w-full px-2 py-2 text-sm font-medium text-white text-center bg-black/60 transition-opacity"
                style={{letterSpacing: '0.01em'}}
              >
                {tpl.label}
              </span>
            </div>
          ))}
        </div>
        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="mx-4 text-gray-400 text-lg font-semibold">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        {/* Create from scratch/code */}
        <div className="flex gap-12 justify-center">
          <div className="flex flex-col items-center flex-1">
            <span className="mb-4 text-lg font-medium text-gray-700">Create Event From Scratch</span>
            <button
              onClick={() => handleTemplateSelection('scratch')}
              className="px-8 py-3 rounded-lg border border-gray-400 bg-white hover:bg-gray-100 font-semibold text-base"
            >
              New Plain Event
            </button>
          </div>
        </div>
      </div>
      <style>{`.animate-fadein{animation:fadein .2s ease}@keyframes fadein{from{opacity:0;transform:scale(.98)}to{opacity:1;transform:scale(1)}}`}</style>
    </div>
  );
}
