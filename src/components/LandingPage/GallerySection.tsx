import React from 'react';

export function GallerySection({ id }: { id?: string }) {
  const images = [
    {
      id: 1,
      src: '/g1.png', // Large left panel - metallic visor head
      alt: 'Futuristic metallic visor on a dark head',
      isLarge: true,
    },
    {
      id: 2,
      src: '/g2.png', // Top-right - crying face with brushstrokes
      alt: 'Artistic crying face with expressive brushstrokes',
      isLarge: false,
    },
    {
      id: 3,
      src: '/g3.png', // Middle-right - geometric mosaic face
      alt: 'Colorful geometric mosaic face',
      isLarge: false,
    },
    {
      id: 4,
      src: '/g7.png', // Bottom-left - sculptural tube head
      alt: 'Sculptural head made of colorful tubes',
      isLarge: false,
    },
    {
      id: 5,
      src: '/g6.png', // Bottom-right - bioluminescent face
      alt: 'Abstract bioluminescent face',
      isLarge: false,
    },
  ];

  return (
    <section id={id} className="w-full py-24 flex space-y-10 flex-col sm:py-24">
       <div className="flex flex-col items-center w-full space-y-4 ">
        <p className="text-[32px] font-[600] text-center w-[60%]">
         See the Magic in Action
        </p>
        <h5 className="text-[16px] text-center font-[500] w-[50%]">
 A        showcase of real event moments, instantly transformed into share-worthy branded content.
        </h5>
      </div>
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="grid grid-rows-2 gap-6 w-full">
          {/* First Row: 3 images (first large, next two smaller) - full width */}
          <div className="grid grid-cols-9 gap-6 w-full">
            {/* Large image on the left, spans 6 columns */}
            <div className="col-span-6 relative overflow-hidden rounded-2xl w-full">
              <img
                src={images[0].src}
                alt={images[0].alt}
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </div>
            {/* Two stacked images on the right, each spans 3 columns */}
            <div className="col-span-3 flex flex-col gap-4 w-full">
              <div className="relative overflow-hidden rounded-2xl w-full">
                <img
                  src={images[1].src}
                  alt={images[1].alt}
                  className="w-full h-[200px] lg:h-[240px] object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-2xl w-full">
                <img
                  src={images[2].src}
                  alt={images[2].alt}
                  className="w-full h-[200px] lg:h-[240px] object-cover"
                />
              </div>
            </div>
            {/* Empty col-span-3 for spacing or future use */}
            <div className="col-span-3"></div>
          </div>
          {/* Second Row: 2 images */}
          <div className="grid grid-cols-2 gap-6">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={images[3].src}
                alt={images[3].alt}
                className="w-full h-[280px] lg:h-[420px] object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={images[4].src}
                alt={images[4].alt}
                className="w-full h-[280px] lg:h-[420px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}