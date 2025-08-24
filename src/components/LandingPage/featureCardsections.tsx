export function FeatureCardSection({ id }: { id?: string }) {
  const cards = [
    {
      theme: 'light',
      title: 'Real-Time Video Effects',
      description:
        'Step into the booth and watch the magic happen. AI-powered effects apply instantly, giving users a cinematic transformation before their eyes.',
      tags: ['Live Effects', 'Seamless Output', 'Real-Time AI', 'Instant Rendering'],
      tagImg: '/tag1.png',
      icon: '/icon1.png'
    },
    {
      theme: 'dark',
      title: 'Optimized for Sharing',
      description:
        'Your content, everywhere. Videos are pre-formatted for TikTok, Instagram, LinkedIn, and more — perfect size, sound, and impact.',
      tags: ['Instagram Stories', 'TikTok Ready', 'Viral Format', 'Local downloads'],
          tagImg: '/tag2.png',
       icon: '/icon2.png'
    },
    {
      theme: 'dark',
      title: 'Virtual & Physical Booths',
      description:
        "Whether you're at a live venue or hosting online, the AI Video Booth works anywhere. One platform, all event types.",
      tags: ['Virtual Events', 'Hybrid Ready', 'Web Access', 'Kiosk Integration'],
      tagImg: '/tag3.png',
        icon: '/icon3.png'
    },
    {
      theme: 'light',
      title: 'Brand-Centric Customization',
      description:
        'From logos to color palettes, tailor every frame to match your brand. No more generic filters — every clip feels uniquely yours.',

      tags: ['Brand Colors', 'White-Label Ready', 'Branded Templates'],
      tagImg: '/tag3.png',
       icon: '/icon4.png'
    }
  ];

  return (
    <section id={id} className="w-full bg-[#F3F5FB] py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-2xl sm:text-3xl md:text-[28px] lg:text-[32px] font-extrabold text-gray-900 mb-8 sm:mb-12">
          What Makes It Magic (and Worth Sharing)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 place-items-center">
          {cards.map((card, idx) => {
            const isLight = card.theme === 'light';
            return (
              <div
                key={idx}
                className={`${
                  isLight ? 'bg-white text-gray-900' : 'bg-[#0F0F10] text-white'
                } relative rounded-[20px] shadow-md px-6 sm:px-8 pt-10 pb-16 overflow-hidden w-full max-w-[600px] md:min-h-[700px]`}
                style={{ opacity: 1 }}
              >
                {/* Icon */}
                <div className="mx-auto mb-5 w-16 h-16 rounded-xl bg-gradient-to-br from-red-600 to-[#1b256b] flex items-center justify-center shadow-lg">
                  {/* <span className="text-white text-2xl">{card.icon}</span> */}
                    <img src={card.icon} alt="icon" className="w-8 h-8"/>
                </div>

                {/* Title */}
                <h3 className="text-center text-lg sm:text-xl font-extrabold mb-3">
                  {card.title}
                </h3>

                {/* Description */}
                <p
                  className={`text-center text-sm leading-relaxed max-w-md mx-auto ${
                    isLight ? 'text-gray-600' : 'text-gray-300'
                  }`}
                >
                  {card.description}
                </p>

                {/* Checker background blocks (lower area) */}
                <div className="absolute left-6 right-6 bottom-16 grid grid-cols-3 gap-4 opacity-60 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`${
                        isLight ? 'bg-gray-100' : 'bg-white/5'
                      } aspect-square rounded-md`}
                    />
                  ))}
                </div>

                {/* Tags */}
                <div className="absolute bottom-4 left-0 right-0 flex flex-wrap items-center justify-center gap-2 px-3">
                  {/* {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`${
                        isLight
                          ? 'bg-gray-100 text-gray-700'
                          : 'bg-white/10 text-gray-200'
                      } text-[11px] sm:text-xs px-3 py-1 rounded-full whitespace-nowrap`}
                    >
                      {tag}
                    </span>
                  ))} */}
                   <img src={card.tagImg}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}