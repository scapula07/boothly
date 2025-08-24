import React from 'react';

type ThumbnailRailProps = {
  thumbs: string[];
};


const presets = [
  {
    id: "toon",
    name: "Cartoon",
    prompt: "catwoman with sharp cat ears in a brown and pink coat",
    thumbnail: "/images/thumb-cartoon.jpg",
    src:"/catwoman.mp4"
  },
  {
    id: "sketch",
    name: "Sketch",
    prompt: "Chinese (((dragon))), breathing fire, ancient chinese mountain landscape, sunshine, beautiful blue sky",
    thumbnail: "/images/thumb-sketch.jpg",
    src:"/ancient-dragon.mp4"
  },
  {
    id: "sketch",
    name: "Sketch",
    prompt: "sculpture ((claymation)) muppet sunglasses",
    thumbnail: "/images/thumb-sketch.jpg",
    src:"/claymation.mp4"
  },
    {
    id: "sketch",
    name: "Sketch",
    prompt: "((cubism)) tesseract ((flat colors))",
    thumbnail: "/images/thumb-sketch.jpg",
    src:"/cubism.mp4"
  },
  {
    id: "sketch",
    name: "Sketch",
    prompt: "abstract pop art with bold black lines, vibrant colors, (((dark fantasy))), cartoon face elements, psychedelic and graffiti style ((Keith Haring))",
    thumbnail: "/images/thumb-sketch.jpg",
    src:"/Keith-Haring.mp4"
  },
];



import { useState } from 'react';

export default function ThumbnailRail({ onPick, onSelectPrompt }: { onPick?: (src: string, preset: any) => void, onSelectPrompt?: (prompt: string) => void }) {
  // Duplicate the presets to create a seamless loop effect
  const loopedPresets = [...presets, ...presets];
  const [selected, setSelected] = useState<number | null>(null);
  console.log('Selected thumbnail index:', selected);

  function handlePick(i: number, p: any) {
    setSelected(i);
    if (onPick) onPick(p.src, p);
    if (onSelectPrompt && p.prompt) onSelectPrompt(p.prompt);
  }

  // Ref for the scroll container
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll logic: increment scrollLeft/scrollTop in sync with animation
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let frame: number;
    let last = performance.now();
    function step(now: number) {
      const dt = now - last;
      last = now;
      if (!el) return;
      // Horizontal or vertical
      if (window.innerWidth >= 1024) {
        // vertical
        el.scrollTop += 0.5 * (dt / 16.67); // ~0.5px per frame
        if (el.scrollTop >= el.scrollHeight / 2) el.scrollTop = 0;
      } else {
        // horizontal
        el.scrollLeft += 0.5 * (dt / 16.67);
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
      }
      frame = requestAnimationFrame(step);
    }
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="relative max-w-full lg:max-h-[600px] overflow-x-auto lg:overflow-y-auto hide-scrollbar"
      tabIndex={-1}
    >
      <div
        className="flex lg:flex-col gap-4"
        style={{
          width: 'max-content',
        }}
        tabIndex={-1}
      >
        {loopedPresets.map((p, i) => (
          <div
            key={i}
            className={`rounded-2xl overflow-hidden border flex-shrink-0 transition-all duration-200 cursor-pointer ${selected === i ? 'border-blue-500 ring-2 ring-blue-400' : 'border-black/10'}`}
            onClick={() => handlePick(i, p)}
            tabIndex={0}
            aria-label={`Pick ${p.name}`}
          >
            <video
              src={p?.src}
              autoPlay
              loop
              muted
              playsInline
              className="w-[180px] h-[120px] lg:w-[220px] lg:h-[160px] object-cover"
            />
          </div>
        ))}
      </div>
      {/* Hide scrollbar with custom CSS */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}