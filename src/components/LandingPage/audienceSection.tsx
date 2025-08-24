export function AudienceSection({ id }: { id?: string }) {
  const gradientBg = {
    background: 'linear-gradient(112.08deg, #891F0C 37.64%, #040D34 92.95%)'
  } as const;

  return (
    <section id={id} className="w-full flex flex-col space-y-7 py-24 sm:py-20">
      <div className="flex flex-col items-center w-full space-y-4 ">
        <p className="text-[32px] font-[600] text-center w-[60%]">
          Not Just for Creators — Built for Brands, Teams, and Everyone In Between
        </p>
        <h5 className="text-[16px] text-center font-[500] w-[50%]">
          Real-time content. Branded experiences. No stress. Here’s who’s already winning with it — and why you should be next.
        </h5>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Gradient Card */}
        <div
          className="rounded-2xl text-white p-8 md:p-12 shadow-xl mb-8 sm:mb-12 max-w-[1240px] mx-auto"
          style={gradientBg}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] items-center h-[500px]">
            {/* Left copy */}
            <div>
              <div className="flex items-center  gap-3 text-[16px] font-[500] mb-4 opacity-90">
                <span className="inline-block w-8 h-px bg-white/70" />
                <span>Create buzzworthy, on-brand content in real time</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                Event Marketing Teams
              </h3>
              <p className="text-white/90 max-w-xl leading-relaxed">
                Deliver professional video experiences that drive engagement and
                social sharing, all while staying within event budgets and
                timelines. Finally, you can capture content that’s both premium
                and scalable across all your activations.
              </p>
            </div>
            {/* Right image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src="./aud1.png"
                alt="Event team"
                className="object-cover"
                style={{
                  width: '518px',
                  height: '380px',
                  borderRadius: '20px',
                  opacity: 1,
                  transform: 'rotate(0deg)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Bottom two white cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-7 md:p-8 shadow-lg">
            <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-gray-600 mb-4">
              <span className="inline-block w-8 h-px bg-gray-400 font-bold" />
              <span>Add interactive video creation to your feature set</span>
            </div>
            <h4 className="text-2xl font-extrabold text-gray-900 mb-3">
              Virtual Event Platforms
            </h4>
            <p className="text-gray-600 leading-relaxed mb-6">
              Seamlessly integrate our booth to offer attendees a personalized,
              AI-powered experience that boosts retention and sets your platform
              apart. It’s a plug-and-play value-add that instantly makes your
              platform more competitive.
            </p>
            <div className="relative">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src="./v1.png"
                  alt="Virtual platform"
                  className="object-cover"
                  style={{
                    width: '518px',
                    height: '324px',
                    borderRadius: '20px',
                    opacity: 1,
                    transform: 'rotate(0deg)',
                    marginLeft: '41px'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-7 md:p-8 shadow-lg">
            <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-gray-600 mb-4">
              <span className="inline-block w-8 h-px bg-gray-400 font-bold" />
              <span>Elevate every campaign with cinematic content.</span>
            </div>
            <h4 className="text-2xl font-extrabold text-gray-900 mb-3">
              Brand Activation Agencies
            </h4>
            <p className="text-gray-600 leading-relaxed mb-6">
              Offer clients a unique, scalable solution that blends creative
              storytelling with instant delivery — fully branded, zero
              post-production required. Roll it out across multiple events
              without reinventing the wheel each time.
            </p>
            <div className="relative">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src="./v2.png"
                  alt="Brand activation"
                  className="object-cover"
                  style={{
                    width: '518px',
                    height: '324px',
                    borderRadius: '20px',
                    opacity: 1,
                    transform: 'rotate(0deg)',
                    marginLeft: '41px'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}