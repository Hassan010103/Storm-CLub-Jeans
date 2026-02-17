import React, { useEffect, useState } from 'react';

const IMAGES = Array.from({ length: 8 }, (_, i) => `/img${i + 1}.jpg`);

const Gallery: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % IMAGES.length);
    }, 3000);
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

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {IMAGES.map((src, index) => {
              const isActive = index === current;
              return (
                <div
                  key={src}
                  className="min-w-full flex items-center justify-center px-4"
                >
                  <div
                    className={`relative w-full max-w-4xl aspect-[16/9] overflow-hidden bg-brand-dark border border-white/10 ${
                      isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-70'
                    } transition-all duration-700`}
                  >
                    <img
                      src={src}
                      alt={`Storm Club gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {IMAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full ${
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

