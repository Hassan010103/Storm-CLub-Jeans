import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image/Video Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 z-10"></div>
        <img 
          src="/hero-jeans.jpg" 
          alt="Warehouse filled with stacks of denim jeans" 
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-16">
        <span className="inline-block py-1 px-3 border border-brand-accent/50 text-brand-accent text-xs font-bold tracking-[0.2em] uppercase mb-6 bg-black/50 backdrop-blur-sm animate-fade-in-up">
          Direct Manufacturer to Retailer
        </span>
        
        <h1 className="font-heading text-5xl md:text-7xl lg:text-9xl font-bold text-white uppercase tracking-tight mb-6 leading-[0.9] drop-shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Power In <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Every Stitch.</span>
        </h1>
        
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light tracking-wide animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Karol Bagh's Premier Denim Manufacturer. <br className="hidden md:block"/>
          Stock your shop with premium denim directly from the factory.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <a 
            href="#catalog"
            onClick={(e) => handleScroll(e, '#catalog')}
            className="group relative px-8 py-4 bg-brand-accent text-white font-bold uppercase tracking-widest text-sm overflow-hidden cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
          </a>
          
          <a 
            href="#contact"
            onClick={(e) => handleScroll(e, '#contact')}
            className="group px-8 py-4 border border-white text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
          >
            Get Wholesale Rates
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a 
        href="#about"
        onClick={(e) => handleScroll(e, '#about')}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce text-gray-500 hover:text-white transition-colors cursor-pointer"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-8 h-8" />
      </a>
    </section>
  );
};

export default Hero;