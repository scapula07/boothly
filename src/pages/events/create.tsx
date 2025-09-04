import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { userApi } from '../../firebase/event';

const IMAGE_TYPES = ['Live Gif', 'Gif', 'Rebound', 'Video'];
const LAYOUTS = ['Single', '2 by 2', '1 and 2', '2 Strip', '3 Strip', '4 Strip'];
const CROPS = [
  { label: 'None', value: 'none' },
  { label: 'Square', value: 'square' },
  { label: 'Circle', value: 'circle' }
];
const COLOR_SCHEMES = ['Dark', 'Light'];

const TEMPLATE_SETTINGS: Record<string, Partial<typeof defaultSettings>> = {
  '1': { imageType: 'Gif', layout: '2 by 2', colorScheme: 'Dark' },
  '2': { imageType: 'Video', layout: '1 and 2', colorScheme: 'Light' },
  '3': { imageType: 'Live Gif', layout: 'Single', colorScheme: 'Dark' },
  'scratch': {},
};

const defaultSettings = {
  eventName: '',
  date: new Date().toISOString().slice(0, 10),
  imageType: 'Live Gif',
  layout: 'Single',
  crop: 'none',
  margins: 10,
  corners: 0,
  colorScheme: 'Dark',
  textColor: '#FFFFFF',
  bgColor: '#555555',
  startScreenPortrait: null as File | null,
  startScreenLandscape: null as File | null,
  showGetReady: true,
  countdown: 3,
  startDelay: 1,
  camera: 'Front',
};

export default function CreateEvent() {
  const router = useRouter();
  const { template } = router.query;

  const [settings, setSettings] = useState(defaultSettings);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (template && TEMPLATE_SETTINGS[template as string]) {
      setSettings((prev) => ({ ...prev, ...TEMPLATE_SETTINGS[template as string] }));
    }
  }, [template]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const userId = "exampleUserId"; // Replace with actual user ID from authentication
    const eventData = {
      templateId: template as string,
      eventName: settings.eventName,
      date: settings.date,
      imageType: settings.imageType,
      layout: settings.layout,
      crop: settings.crop,
      margins: settings.margins,
      corners: settings.corners,
      colorScheme: settings.colorScheme,
      textColor: settings.textColor,
      bgColor: settings.bgColor,
      startScreenPortrait: settings.startScreenPortrait,
      startScreenLandscape: settings.startScreenLandscape,
      showGetReady: settings.showGetReady,
      countdown: settings.countdown,
      startDelay: settings.startDelay,
      camera: settings.camera,
    };

    const result = await userApi.createEvent(userId, eventData);

    if (result.success) {
      alert(result.message);
      router.push(`/event/${result.id}`);
    } else {
      alert(result.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-semibold mb-8">New Event</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-2xl p-8 animate-fadein">
          {/* Left column */}
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm mb-2">Event Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={settings.eventName}
                onChange={e => setSettings({ ...settings, eventName: e.target.value })}
                placeholder="Enter event name"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={settings.date}
                onChange={e => setSettings({ ...settings, date: e.target.value })}
              />
              <p className="text-xs text-gray-500 mt-1">The date you pick here does not have any effect on the expiry date. <a href="#" className="text-purple-600 underline">Learn more</a></p>
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Image Type</label>
              <div className="flex gap-2 flex-wrap">
                {IMAGE_TYPES.map(type => (
                  <button
                    type="button"
                    key={type}
                    className={`px-4 py-2 rounded border ${settings.imageType === type ? 'bg-[#292524] text-white border-[#292524]' : 'bg-white text-gray-700 border-gray-300'} font-medium hover:bg-[#292524] hover:text-white hover:border-[#292524] transition-colors`}
                    onClick={() => setSettings({ ...settings, imageType: type })}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Layout</label>
              <div className="flex gap-2 flex-wrap">
                {LAYOUTS.map(l => (
                  <button
                    type="button"
                    key={l}
                    className={`px-4 py-2 rounded border ${settings.layout === l ? 'bg-[#292524] text-white border-[#292524]' : 'bg-white text-gray-700 border-gray-300'} font-medium hover:bg-[#292524] hover:text-white hover:border-[#292524] transition-colors`}
                    onClick={() => setSettings({ ...settings, layout: l })}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Crop</label>
              <div className="flex gap-2">
                {CROPS.map(c => (
                  <button
                    type="button"
                    key={c.value}
                    className={`px-4 py-2 rounded border ${settings.crop === c.value ? 'bg-[#292524] text-white border-[#292524]' : 'bg-white text-gray-700 border-gray-300'} font-medium hover:bg-[#292524] hover:text-white hover:border-[#292524] transition-colors`}
                    onClick={() => setSettings({ ...settings, crop: c.value })}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Margins</label>
              <input type="range" min={0} max={50} value={settings.margins} onChange={e => setSettings({ ...settings, margins: Number(e.target.value) })} className="w-full" />
              <div className="text-xs text-gray-500">{settings.margins}</div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Corners</label>
              <input type="range" min={0} max={50} value={settings.corners} onChange={e => setSettings({ ...settings, corners: Number(e.target.value) })} className="w-full" />
              <div className="text-xs text-gray-500">{settings.corners}</div>
            </div>
          </div>
          {/* Right column */}
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm mb-2">Text Color</label>
              <input type="color" value={settings.textColor} onChange={e => setSettings({ ...settings, textColor: e.target.value })} className="w-12 h-8 p-0 border-0" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Background Color</label>
              <input type="color" value={settings.bgColor} onChange={e => setSettings({ ...settings, bgColor: e.target.value })} className="w-12 h-8 p-0 border-0" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Booth Color Scheme</label>
              <select value={settings.colorScheme} onChange={e => setSettings({ ...settings, colorScheme: e.target.value })} className="w-full border border-gray-300 rounded px-4 py-2">
                {COLOR_SCHEMES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Camera</label>
              <select value={settings.camera} onChange={e => setSettings({ ...settings, camera: e.target.value })} className="w-full border border-gray-300 rounded px-4 py-2">
                <option value="Front">Front</option>
                <option value="Back">Back</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={settings.showGetReady} onChange={e => setSettings({ ...settings, showGetReady: e.target.checked })} id="getready" />
              <label htmlFor="getready" className="text-gray-700 text-sm">Show "Get Ready" Prompt</label>
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Countdown seconds</label>
              <input type="number" min={1} max={10} value={settings.countdown} onChange={e => setSettings({ ...settings, countdown: Number(e.target.value) })} className="w-full border border-gray-300 rounded px-4 py-2" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Start delay seconds</label>
              <input type="number" min={0} max={10} value={settings.startDelay} onChange={e => setSettings({ ...settings, startDelay: Number(e.target.value) })} className="w-full border border-gray-300 rounded px-4 py-2" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Background Image (Portrait)</label>
              <input type="file" accept="image/*" onChange={e => setSettings({ ...settings, startScreenPortrait: e.target.files?.[0] || null })} className="w-full" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Background Image (Landscape)</label>
              <input type="file" accept="image/*" onChange={e => setSettings({ ...settings, startScreenLandscape: e.target.files?.[0] || null })} className="w-full" />
            </div>
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className={`w-full bg-[#292524] hover:bg-[#1c1917] text-white font-semibold py-3 rounded mt-4 transition-colors text-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
      <style>{`.animate-fadein{animation:fadein .2s ease}@keyframes fadein{from{opacity:0;transform:scale(.98)}to{opacity:1;transform:scale(1)}}`}</style>
    </div>
  );
}
