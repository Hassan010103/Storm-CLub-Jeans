import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Quote, Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <span className="text-brand-accent text-sm font-bold uppercase tracking-[0.2em] mb-2 block">Trusted By Retailers</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white uppercase">
            Voices from the Market
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-brand-gray/30 p-8 rounded-sm relative border border-white/5 hover:bg-brand-gray/50 transition-colors">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-brand-accent/20" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-brand-accent fill-brand-accent" />
                ))}
              </div>

              <p className="text-gray-300 italic mb-6 leading-relaxed">"{t.text}"</p>

              <div>
                <p className="text-white font-bold uppercase tracking-wide text-sm">{t.name}</p>
                <p className="text-brand-accent text-xs uppercase tracking-wider mt-1">{t.role}, {t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;