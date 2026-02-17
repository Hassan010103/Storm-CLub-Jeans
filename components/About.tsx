import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-brand-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-gray/20 -skew-x-12 translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-brand-accent/20 rounded-sm transform rotate-2 group-hover:rotate-1 transition-transform duration-500"></div>
            <img 
              src="/our-story-new.jpg" 
              alt="Storm Club denim warehouse with stacked jeans" 
              className="relative w-full h-[520px] md:h-[600px] object-cover shadow-2xl"
            />
            <div className="absolute bottom-10 left-10 bg-black/80 backdrop-blur-md p-6 border-l-4 border-brand-accent">
              <p className="text-3xl font-heading font-bold text-white">15+ Years</p>
              <p className="text-sm text-gray-400 uppercase tracking-widest">Of Excellence in Karol Bagh</p>
            </div>
          </div>

          {/* Text Side */}
          <div>
            <span className="text-brand-accent text-sm font-bold uppercase tracking-[0.2em] mb-2 block">Our Story</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-8 uppercase leading-tight">
              Forging the Future <br/> of <span className="text-gray-500">Indian Denim.</span>
            </h2>
            
            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              At Storm Club Jeans, we don't just manufacture denim; we engineer confidence. Located in the heart of Delhi's fashion hub, Karol Bagh, we specialize in high-quality, trend-driven denim for the modern retailer.
            </p>
            
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Our state-of-the-art manufacturing facility ensures that every pair of jeans meets international standards of durability and style, while our direct-to-retailer wholesale model guarantees the best margins for your business.
            </p>

            <div className="space-y-4 mb-10">
              {[
                "Precision Manufacturing Tech",
                "Sustainable Washing Processes",
                "Dedicated Quality Control Team",
                "Pan-India Logistics Network"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-accent" />
                  <span className="text-gray-300 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <a 
              href="#process"
              className="inline-block text-white border-b border-brand-accent pb-1 hover:text-brand-accent transition-colors uppercase tracking-widest text-sm font-bold"
            >
              See How We Work
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;