import React from 'react';

export default function VideoDemo({ id }: { id?: string }) {
  return (
    <div id={id} className="w-full bg-[#EFF2F7] py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero media panel */}
        <div className="relative">
          {/* Media container with custom clipped right corner */}
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: '28px',
              clipPath:
                'polygon(0 0, calc(100% - 180px) 0, 100% 70px, 100% 100%, 0 100%, 70px 100%, 0 calc(100% - 70px))'
            }}
          >
            {/* Background image */}
            <img
              src="/hero-demo.png"
              alt="AI video demo"
              className="w-full h-[420px] sm:h-[520px] object-cover"
            />

            {/* Content overlay - text and play button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Text headline */}
              <h2 className="text-white text-center font-extrabold leading-tight mb-8" style={{ fontSize: '48px' }}>
                Make better
                <br />
                AI videos faster!
              </h2>

              {/* Play button */}
              <div className="relative">
                <div className="w-[160px] h-[160px] rounded-full flex items-center justify-center bg-gradient-to-b from-[#2A2A2A] to-[#0E0E0E] shadow-xl">
                  <div className="w-[64px] h-[64px] rounded-full bg-white/10 flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5V19L19 12L8 5Z" fill="#ffffff" />
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full border border-white/40 translate-x-1 translate-y-1" />
              </div>
            </div>
          </div>

          {/* Rating pill */}
          <div className="absolute -bottom-10 right-8">
            <div className="flex items-center gap-4 bg-white rounded-[18px] shadow-lg px-4 py-3">
              <img src="/democus.png" alt="Star" className="w-[400px]" />
       
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}