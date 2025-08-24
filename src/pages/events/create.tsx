import React, { useState } from 'react';

const IMAGE_TYPES = ['Live Gif', 'Gif', 'Rebound', 'Video'];
const LAYOUTS = ['Single', '2 by 2', '1 and 2', '2 Strip', '3 Strip', '4 Strip'];
const CROPS = [
  { label: 'None', value: 'none' },
  { label: 'Square', value: 'square' },
  { label: 'Circle', value: 'circle' }
];
const COLOR_SCHEMES = ['Dark', 'Light'];

export default function CreateEvent() {
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });
  const [imageType, setImageType] = useState(IMAGE_TYPES[0]);
  const [layout, setLayout] = useState(LAYOUTS[0]);
  const [crop, setCrop] = useState(CROPS[0].value);
  const [margins, setMargins] = useState(10);
  const [corners, setCorners] = useState(0);
  const [colorScheme, setColorScheme] = useState(COLOR_SCHEMES[0]);
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [bgColor, setBgColor] = useState('#555555');
  const [startScreenPortrait, setStartScreenPortrait] = useState<File | null>(null);
  const [startScreenLandscape, setStartScreenLandscape] = useState<File | null>(null);
  const [showGetReady, setShowGetReady] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const [startDelay, setStartDelay] = useState(1);
  const [camera, setCamera] = useState('Front');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-semibold mb-8">New Event</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-2xl p-8 animate-fadein">
          {/* Left column */}
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm mb-2">Event Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={eventName}
                onChange={e => setEventName(e.target.value)}
                placeholder="Enter event name"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={date}
                onChange={e => setDate(e.target.value)}
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
                    className={`px-4 py-2 rounded border ${imageType === type ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-700 border-gray-300'} font-medium`}
                    onClick={() => setImageType(type)}
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
                    className={`px-4 py-2 rounded border ${layout === l ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-700 border-gray-300'} font-medium`}
                    onClick={() => setLayout(l)}
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
                    className={`px-4 py-2 rounded border ${crop === c.value ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-700 border-gray-300'} font-medium`}
                    onClick={() => setCrop(c.value)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Margins</label>
              <input type="range" min={0} max={50} value={margins} onChange={e => setMargins(Number(e.target.value))} className="w-full" />
              <div className="text-xs text-gray-500">{margins}</div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Corners</label>
              <input type="range" min={0} max={50} value={corners} onChange={e => setCorners(Number(e.target.value))} className="w-full" />
              <div className="text-xs text-gray-500">{corners}</div>
            </div>
          </div>
          {/* Right column */}
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm mb-2">Text Color</label>
              <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-12 h-8 p-0 border-0" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Background Color</label>
              <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-12 h-8 p-0 border-0" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Booth Color Scheme</label>
              <select value={colorScheme} onChange={e => setColorScheme(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2">
                {COLOR_SCHEMES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Camera</label>
              <select value={camera} onChange={e => setCamera(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2">
                <option value="Front">Front</option>
                <option value="Back">Back</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={showGetReady} onChange={e => setShowGetReady(e.target.checked)} id="getready" />
              <label htmlFor="getready" className="text-gray-700 text-sm">Show "Get Ready" Prompt</label>
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Countdown seconds</label>
              <input type="number" min={1} max={10} value={countdown} onChange={e => setCountdown(Number(e.target.value))} className="w-full border border-gray-300 rounded px-4 py-2" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Start delay seconds</label>
              <input type="number" min={0} max={10} value={startDelay} onChange={e => setStartDelay(Number(e.target.value))} className="w-full border border-gray-300 rounded px-4 py-2" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Background Image (Portrait)</label>
              <input type="file" accept="image/*" onChange={e => setStartScreenPortrait(e.target.files?.[0] || null)} className="w-full" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Background Image (Landscape)</label>
              <input type="file" accept="image/*" onChange={e => setStartScreenLandscape(e.target.files?.[0] || null)} className="w-full" />
            </div>
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded mt-4 transition-colors text-lg"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
      <style>{`.animate-fadein{animation:fadein .2s ease}@keyframes fadein{from{opacity:0;transform:scale(.98)}to{opacity:1;transform:scale(1)}}`}</style>
    </div>
  );
}
