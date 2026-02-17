import React, { useEffect, useState } from 'react';

// Explicit list so img2 is skipped
const IMAGES = [
  '/img1.jpg',
  '/img3.jpg',
  '/img4.jpg',
  '/img5.jpg',
  '/img6.jpg',
  '/img7.jpg',
  '/img8.jpg',
];

const Gallery: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % IMAGES.length);
  };

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
  };

  useEffect(() => {
    const interval = setInterval(goNext, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="gallery" className="py-20 bg-brand-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.2em]">
              Inside Storm Club
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white uppercase mt-3">
              Factory &amp; Showroom Gallery
            </h2>
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto group transition-shadow duration-500">
          {/* Hover glow around entire gallery */}
          <div className="absolute -inset-2 rounded-xl bg-brand-accent/0 group-hover:bg-brand-accent/10 blur-2xl transition-all duration-500 pointer-events-none" />

          <div className="relative h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px] overflow-visible flex items-center justify-center">
            {IMAGES.map((src, index) => {
              const diff = index - current;
              let positionClass = 'opacity-0 scale-75 pointer-events-none';
              let translate = 'translate-x-0';
              let blur = '';

              if (diff === 0) {
                // Center image
                positionClass = 'opacity-100 scale-100 z-30';
                translate = 'translate-x-0';
              } else if (diff === -1 || diff === IMAGES.length - 1) {
                // Left neighbor (wrap-around)
                positionClass = 'opacity-70 scale-90 z-20';
                translate = '-translate-x-[45%]';
                blur = 'blur-sm';
              } else if (diff === 1 || diff === -(IMAGES.length - 1)) {
                // Right neighbor (wrap-around)
                positionClass = 'opacity-70 scale-90 z-20';
                translate = 'translate-x-[45%]';
                blur = 'blur-sm';
              }

              return (
                <div
                  key={src}
                  className={`absolute w-[55%] sm:w-[60%] md:w-[65%] aspect-[16/9] bg-brand-dark border border-white/10 overflow-hidden rounded-sm transition-all duration-700 ease-out ${positionClass} ${translate}`}
                >
                  <img
                    src={src}
                    alt={`Storm Club gallery ${index + 1}`}
                    className={`w-full h-full object-cover ${blur}`}
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>
              );
            })}

            {/* Manual arrows */}
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-0 sm:-left-8 top-1/2 -translate-y-1/2 z-40 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-0 sm:-right-8 top-1/2 -translate-y-1/2 z-40 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all"
              aria-label="Next image"
            >
              ›
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6 relative z-50">
            {IMAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === current ? 'bg-white' : 'bg-gray-600'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;

