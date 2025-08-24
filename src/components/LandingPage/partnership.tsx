export default function Partnership({ id }: { id?: string }) {
  const brands = [
    {
      name: 'Red Bull',
      logo: '🔴',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      name: 'Spotify',
      logo: '🟢',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Airbnb',
      logo: '🔴',
      color: 'text-pink-600',
      bgColor: 'bg-pink-100'
    },
    {
      name: 'TED',
      logo: '🔴',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      name: 'Canon',
      logo: '🔴',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      name: 'YouTube',
      logo: '🔴',
      color: 'text-red-600',
      bgColor: 'bg-gray-100'
    }
  ];

  return (
    <div id={id} className="relative w-full overflow-hidden pt-10">
      {/* Top Band - Dark Reddish Brown with Diagonal Cut */}
      <div
        className="relative py-6"
        style={{
          background: "linear-gradient(90deg, #891F0C 0%, #040D34 100%)"
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify- space-x-4">
            <span className="text-white text-lg font-bold ">
              Trusted by forward-thinking brands and event pros.
            </span>
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="text-white text-lg font-bold">
              Trusted by forward
            </span>
          </div>
        </div>
        
        {/* Diagonal Cut Effect */}
        <div 
          className="absolute bottom-0 left-0 w-full h-8"
          style={{
            background: "linear-gradient(90deg, #891F0C 0%, #040D34 100%)",
            transform: "skewY(1deg)",
            transformOrigin: "bottom left"
          }}
        ></div>
      </div>

      {/* Bottom Band - Light Purple/White Background */}
      <div 
        className="relative py-12"
        style={{
          background: "linear-gradient(90deg, #F8F9FF 0%, #FFFFFF 50%, #F8F9FF 100%)"
        }}
      >
        {/* Diagonal Cut Overlay */}
        <div 
          className="absolute top-0 left-0 w-full h-8"
          style={{
            background: "linear-gradient(90deg, #F8F9FF 0%, #FFFFFF 50%, #F8F9FF 100%)",
            transform: "skewY(-1deg)",
            transformOrigin: "top left"
          }}
        ></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8 items-center">
            {brands.map((brand, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className={`w-16 h-16 ${brand.bgColor} rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  <span className="text-2xl">{brand.logo}</span>
                </div>
                <span className={`text-sm font-medium ${brand.color} text-center`}>
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}