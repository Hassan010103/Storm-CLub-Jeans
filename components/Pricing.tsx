import React from 'react';
import { MousePointerClick, MessageCircle, Truck } from 'lucide-react';

const Pricing: React.FC = () => {
  return (
    <section id="process" className="py-24 bg-brand-dark relative">
       {/* Background accent */}
       <div className="absolute inset-0 overflow-hidden">
         <div className="absolute -top-20 -left-20 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl"></div>
       </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-accent text-sm font-bold uppercase tracking-[0.2em] mb-2 block">Simple & Direct</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white uppercase mb-6">
            How To Order
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We keep it simple. No complex registrations. Just browse, choose, and deal directly with the owners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-24 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-gray-800 via-brand-accent to-gray-800 z-0"></div>

          {/* Step 1 */}
          <div className="bg-brand-black border border-white/10 p-10 relative z-10 hover:border-brand-accent/30 transition-all duration-300 group text-center">
            <div className="w-20 h-20 bg-brand-gray rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-brand-black group-hover:border-brand-accent transition-colors relative">
               <span className="absolute -top-2 -right-2 w-8 h-8 bg-brand-accent text-white font-bold flex items-center justify-center rounded-full text-sm">1</span>
               <MousePointerClick className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white uppercase mb-4">Browse Catalog</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Check out our latest collections and designs right here. Select the model numbers that fit your store's vibe.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-brand-black border border-white/10 p-10 relative z-10 hover:border-brand-accent/30 transition-all duration-300 group text-center">
            <div className="w-20 h-20 bg-brand-gray rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-brand-black group-hover:border-brand-accent transition-colors relative">
               <span className="absolute -top-2 -right-2 w-8 h-8 bg-brand-accent text-white font-bold flex items-center justify-center rounded-full text-sm">2</span>
               <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white uppercase mb-4">Contact Us</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Message us on WhatsApp or call us directly. Discuss quantity, check live stock availability, and get the best bulk rates.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-brand-black border border-white/10 p-10 relative z-10 hover:border-brand-accent/30 transition-all duration-300 group text-center">
            <div className="w-20 h-20 bg-brand-gray rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-brand-black group-hover:border-brand-accent transition-colors relative">
               <span className="absolute -top-2 -right-2 w-8 h-8 bg-brand-accent text-white font-bold flex items-center justify-center rounded-full text-sm">3</span>
               <Truck className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white uppercase mb-4">Fast Dispatch</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Confirm your order and payment. We pack and dispatch your goods within 24-48 hours via reliable transport.
            </p>
          </div>

        </div>

        <div className="mt-16 text-center">
             <a 
              href="#contact" 
              className="inline-block px-10 py-4 bg-brand-accent text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            >
              Start an Order Today
            </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;