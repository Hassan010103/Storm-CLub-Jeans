import React from 'react';
import { FEATURES } from '../constants';

const Features: React.FC = () => {
  return (
    <section className="py-24 bg-brand-dark border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white uppercase mb-4">
            Why Buy From Storm Club?
          </h2>
          <div className="w-24 h-1 bg-brand-accent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature) => (
            <div 
              key={feature.id} 
              className="group p-8 bg-brand-black border border-white/5 hover:border-brand-accent/50 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 {/* Decorative huge icon in background */}
                 <div className="scale-[2.5] transform">{feature.icon}</div>
              </div>
              
              <div className="mb-6 inline-block p-3 bg-brand-gray rounded-sm group-hover:bg-brand-accent/10 transition-colors">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-3 group-hover:text-brand-accent transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;