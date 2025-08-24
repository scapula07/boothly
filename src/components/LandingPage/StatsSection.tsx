import React from 'react';

export function StatsSection({ id }: { id?: string }) {
  const stats = [
    {
      label: 'Real-time AI transformation speed',
      value: '<5 Seconds'
    },
    {
      label: 'Of users say their event content looked \'studio-produced\'',
      value: '98%'
    },
    {
      label: 'Videos created and shared using our technology',
      value: '1M+'
    },
    {
      label: 'Average cost savings compared to pro production teams',
      value: '$5K+ Saved'
    }
  ];

  return (
    <section id={id} className="w-full bg-black py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6">
            {/* Sub-headline */}
            <p className="text-white/80 text-lg font-medium">
              Redefining Event Content Creation with AI Precision
            </p>
            
            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Deliver high-quality, branded videos instantly, without the cost and delay.
            </h2>
            
            {/* Description */}
            <p className="text-white/90 text-lg leading-relaxed max-w-xl">
              Our AI Video Booth blends creativity with speed, letting you capture the energy of your event in real-time. No more waiting weeks for edits — attendees leave with professional-grade, shareable content in seconds.
            </p>
            
            {/* CTA Button */}
            <button className="bg-gradient-to-r from-[#891F0C] to-[#1b256b] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-[#7a1a0a] hover:to-[#1a1f5a] transition-all duration-300 transform hover:scale-105 flex items-center gap-3">
              Get Started For Free
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          {/* Right Column - Statistics Grid */}
          <div className="grid grid-cols-2 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-3">
                  {stat.value}
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}