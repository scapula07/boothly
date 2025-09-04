import { useState } from 'react';

export function PricingSection({id}: {id?: string}) {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Starter',
      subtitle: 'Great to explore the booth',
      isBasic: false,
      opacity: 'opacity-60',
      ring: 'border border-[#E5E7EB]',
      blur: 'blur-[2px]',
      buttonStyle:
        'w-full h-11 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed',
      usage: ['Limited videos/month', 'Preset effects only'],
      features: ['Webcam capture', 'Community support'],
      extras: []
    },
    {
      name: 'Basic',
      subtitle: "The essentials to provide your best work for clients.",
      isBasic: true,
      opacity: '',
      ring: 'border-2 border-[#891F0C]',
      buttonStyle:
        'w-full h-11 rounded-lg bg-[#891F0C] text-white font-semibold hover:bg-[#761a0a] transition-colors',
      usage: [
        '10 videos/month (10–15s each)',
        'Up to 5 AI-transformed videos; rest use preset filters'
      ],
      features: [
        'Webcam or mobile capture',
        '2 preset VFX + AI transformation',
        'Basic branding: 1 logo, 1 theme color',
        'MP4 downloads (720p)'
      ],
      extras: [
        '1 active booth at a time',
        'Logo upload & style selection',
        'View video/download counts',
        'Reset theme once/month'
      ]
    },
    {
      name: 'Premium',
      subtitle: 'For teams who need more scale',
      isBasic: false,
      opacity: 'opacity-60',
      ring: 'border border-[#E5E7EB]',
      blur: 'blur-[2px]',
      buttonStyle:
        'w-full h-11 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed',
      usage: ['Higher monthly limits', 'More AI transformations'],
      features: ['Advanced effects library', 'Brand templates', 'Priority support'],
      extras: []
    }
  ];

  return (
    <section className="w-full py-16 flex flex-col space-y-6 sm:py-20" >
         <div className="flex flex-col items-center w-full space-y-4 ">
              <p className="text-[32px] font-[600] text-center w-[60%]">
Pricing Designed for Brands That Refuse to Blend In.
              </p>
              <h5 className="text-[16px] text-center font-[500] w-[50%]">
                Real-time content. Branded experiences. No stress. Here’s who’s already winning with it — and why you should be next.
              </h5>
            </div>
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">Choose the plan that's right for your event needs</p>
        </div>
        {/* Segmented control */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="inline-flex items-center rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={`h-8 sm:h-9 px-3 sm:px-5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                !isAnnual ? 'bg-white text-gray-900' : ''
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`h-8 sm:h-9 px-3 sm:px-5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                isAnnual ? 'bg-white text-gray-900' : ''
              }`}
            >
              Annual (save 20%)
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 place-items-center max-w-7xl mx-auto px-4">
          {plans.map((plan) => {
            const isBasic = plan.isBasic;
            return (
              <div
                key={plan.name}
                className={`${
                  isBasic
                    ? // Basic card responsive layout
                      `relative bg-white text-black rounded-[12px] ${plan.ring} ${plan.opacity} p-6 sm:p-8 w-full max-w-[384px] min-h-[600px] sm:min-h-[693px] lg:min-h-[833px]`
                    : // Starter/Premium responsive layout
                      `relative bg-white text-black rounded-[12px] ${plan.ring} ${plan.opacity} ${plan.blur ?? ''} p-6 sm:p-8 w-full max-w-[384px] min-h-[600px] sm:min-h-[693px]`
                }`}
              >
                <div className="flex flex-col h-full">
                  {/* Title */}
                  <div className="mb-0">
                    <h3 className="text-xl font-extrabold">{plan.name}</h3>
                    <p className="text-xs mt-2 max-w-sm">{plan.subtitle}</p>
                  </div>

                  {/* Sections */}
                  <div className="space-y-6 flex-1">
                    <div>
                      <p className="text-sm font-semibold mb-2 ">Usage Limits</p>
                      <ul className="space-y-2 text-sm ">
                        {(plan as any).usage?.map((f: string) => (
                          <li key={f} className="flex items-start gap-2">
                            <CheckIcon />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm font-semibold mb-2 ">Features</p>
                      <ul className="space-y-2 text-sm ">
                        {(plan as any).features?.map((f: string) => (
                          <li key={f} className="flex items-start gap-2">
                            <CheckIcon />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {(plan as any).extras && (plan as any).extras.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold mb-2 ">Features+</p>
                        <ul className="space-y-2 text-sm ">
                          {(plan as any).extras.map((f: string) => (
                            <li key={f} className="flex items-start gap-2">
                              <CheckIcon />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Footer CTA */}
                  <div className="pt-6">
                    <button className={plan.buttonStyle}>Continue</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}