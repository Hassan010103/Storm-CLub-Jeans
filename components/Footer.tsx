import React, { useState } from 'react';
import { Instagram, Facebook, X, FileText, Shield, RefreshCcw, Lock } from 'lucide-react';
import logo from '../StormClubLogo.png';

interface FooterProps {
  onAdminClick?: () => void;
}

type LegalSection = 'privacy' | 'terms' | 'return' | null;

const LEGAL_CONTENT = {
  privacy: {
    title: "Privacy Policy",
    icon: <Shield className="w-6 h-6 text-brand-accent" />,
    content: (
      <div className="space-y-4 text-gray-300">
        <p><strong>Effective Date:</strong> January 1, 2024</p>
        <p>At Storm Club Jeans ("we," "our," or "us"), we are committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Storm Club Jeans.</p>
        
        <h4 className="text-white font-bold mt-4">1. Information We Collect</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Personal Details:</strong> Name, Phone Number, Email Address provided during inquiries.</li>
          <li><strong>Business Details:</strong> Shop Name, GST Number (if provided), and Shipping Address.</li>
          <li><strong>Communication Data:</strong> Records of WhatsApp chats and calls regarding orders.</li>
        </ul>

        <h4 className="text-white font-bold mt-4">2. How We Use Your Information</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>To process and fulfill wholesale orders.</li>
          <li>To coordinate with logistics partners (transporters) for delivery.</li>
          <li>To send updates about new stock arrivals via WhatsApp (you can opt-out anytime).</li>
          <li>To generate invoices and comply with tax regulations.</li>
        </ul>

        <h4 className="text-white font-bold mt-4">3. Data Sharing & Security</h4>
        <p>We do not sell or trade your personal information. We only share necessary details (Name, Address, Phone) with third-party logistics providers to facilitate delivery. We implement standard security measures to protect your data.</p>
      </div>
    )
  },
  terms: {
    title: "Terms of Service",
    icon: <FileText className="w-6 h-6 text-brand-accent" />,
    content: (
      <div className="space-y-4 text-gray-300">
        <p>Welcome to Storm Club Jeans. By placing an order with us, you agree to the following terms and conditions governed by the laws of India.</p>

        <h4 className="text-white font-bold mt-4">1. Wholesale Nature</h4>
        <p>We are a B2B (Business to Business) manufacturer. Sales are strictly for retailers, wholesalers, and distributors. Minimum Order Quantity (MOQ) applies as specified per model (usually 30-50 pieces).</p>

        <h4 className="text-white font-bold mt-4">2. Pricing & Taxes</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Prices quoted are Ex-Factory (Karol Bagh, New Delhi).</li>
          <li>GST (Goods and Services Tax) is extra as applicable (usually 5% for apparel under ₹1000 and 12% above).</li>
          <li>Prices are subject to change based on raw material costs without prior notice.</li>
        </ul>

        <h4 className="text-white font-bold mt-4">3. Payment Terms</h4>
        <p>Orders are processed only against 100% advance payment via Bank Transfer or UPI. For regular verified distributors, terms may be negotiated separately.</p>

        <h4 className="text-white font-bold mt-4">4. Shipping & Transport</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Goods are dispatched via standard transport/logistics companies.</li>
          <li>Freight/Shipping charges are on a "To Pay" basis (payable by the receiver at the time of delivery).</li>
          <li>Our responsibility ceases once the goods are handed over to the transporter and the LR (Lorry Receipt) / Bilty is shared. We are not liable for transit delays or damages.</li>
        </ul>

        <h4 className="text-white font-bold mt-4">5. Jurisdiction</h4>
        <p>Any disputes arising out of business transactions shall be subject to the exclusive jurisdiction of the courts in Delhi, India.</p>
      </div>
    )
  },
  return: {
    title: "Return & Refund Policy",
    icon: <RefreshCcw className="w-6 h-6 text-brand-accent" />,
    content: (
      <div className="space-y-4 text-gray-300">
        <p>Due to the wholesale nature of our business and low-margin pricing structure, we have a strict return policy.</p>

        <h4 className="text-white font-bold mt-4">1. Manufacturing Defects Only</h4>
        <p>Returns are accepted <strong>ONLY</strong> for genuine manufacturing defects (e.g., stitching errors, fabric damage, major color bleeding).</p>

        <h4 className="text-white font-bold mt-4">2. Mandatory Opening Video</h4>
        <p className="text-red-400 font-bold">IMPORTANT: You must record a clear, continuous video while opening the parcel.</p>
        <p>No claims for shortages, missing pieces, or damage will be entertained without an unboxing video. This protects both parties.</p>

        <h4 className="text-white font-bold mt-4">3. Reporting Period</h4>
        <p>Any defects must be reported within <strong>3 days</strong> of receiving the shipment. Late claims will not be accepted.</p>

        <h4 className="text-white font-bold mt-4">4. No Returns for Unsold Stock</h4>
        <p>We do not accept returns for unsold inventory, size exchange requests, or minor shade variations, which are common in denim washing processes.</p>

        <h4 className="text-white font-bold mt-4">5. Refund/Adjustment</h4>
        <p>Approved defective returns will be exchanged for fresh pieces. If stock is unavailable, the amount will be adjusted in your next order. Cash refunds are generally not provided.</p>
      </div>
    )
  }
};

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  const [activeLegal, setActiveLegal] = useState<LegalSection>(null);

  // Smooth scroll handler similar to Navbar/Hero
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
    <>
      <footer className="bg-black border-t border-white/10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={logo}
                  alt="Storm Club Jeans logo"
                  className="h-14 md:h-18 lg:h-20 w-auto object-contain"
                />
                <div>
                  <h2 className="font-heading font-bold text-2xl md:text-3xl tracking-wider text-white uppercase">
                    Storm Club
                  </h2>
                  <p className="text-[10px] md:text-xs tracking-[0.25em] text-brand-silver uppercase mt-1">
                    Premium Wholesale Denim • Karol Bagh
                  </p>
                </div>
              </div>
              <p className="text-gray-500 max-w-sm mb-8 text-sm leading-relaxed">
                Manufacturer-direct premium denim for serious retailers. Based in Karol Bagh, trusted by wholesalers and distributors across India.
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/mohammad.amjad.237305/reels/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5"/>
                </a>
                <a 
                  href="https://www.facebook.com/profile.php?id=61587858723544" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5"/>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li><a href="#home" onClick={(e) => handleScroll(e, '#home')} className="text-gray-500 hover:text-brand-accent transition-colors text-sm uppercase tracking-wider">Home</a></li>
                <li><a href="#about" onClick={(e) => handleScroll(e, '#about')} className="text-gray-500 hover:text-brand-accent transition-colors text-sm uppercase tracking-wider">About Us</a></li>
                <li><a href="#catalog" onClick={(e) => handleScroll(e, '#catalog')} className="text-gray-500 hover:text-brand-accent transition-colors text-sm uppercase tracking-wider">Catalog</a></li>
                <li><a href="#process" onClick={(e) => handleScroll(e, '#process')} className="text-gray-500 hover:text-brand-accent transition-colors text-sm uppercase tracking-wider">Wholesale Process</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Legal</h4>
              <ul className="space-y-4">
                <li>
                  <button onClick={() => setActiveLegal('privacy')} className="text-gray-500 hover:text-brand-accent transition-colors text-sm uppercase tracking-wider text-left">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveLegal('terms')} className="text-gray-500 hover:text-brand-accent transition-colors text-sm uppercase tracking-wider text-left">
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveLegal('return')} className="text-gray-500 hover:text-brand-accent transition-colors text-sm uppercase tracking-wider text-left">
                    Return Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-700 text-xs mt-0">
              Designed for Luxury. Built for Business.
            </p>
            
            {onAdminClick && (
              <button
                onClick={onAdminClick}
                className="flex items-center gap-2 text-[10px] md:text-xs text-gray-500 uppercase tracking-widest border border-gray-800 px-3 py-1 hover:text-brand-accent hover:border-brand-accent transition-all"
              >
                <Lock className="w-3 h-3" /> Admin Login
              </button>
            )}
          </div>
        </div>
      </footer>

      {/* Legal Modal */}
      {activeLegal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setActiveLegal(null)}></div>
          
          <div className="bg-brand-black border border-white/10 w-full max-w-2xl max-h-[80vh] overflow-y-auto relative z-10 shadow-2xl animate-fade-in-up">
            <div className="sticky top-0 bg-brand-black border-b border-white/10 p-6 flex justify-between items-center z-20">
              <div className="flex items-center gap-3">
                {LEGAL_CONTENT[activeLegal].icon}
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                  {LEGAL_CONTENT[activeLegal].title}
                </h3>
              </div>
              <button 
                onClick={() => setActiveLegal(null)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 leading-relaxed">
              {LEGAL_CONTENT[activeLegal].content}
            </div>

            <div className="p-6 border-t border-white/10 bg-brand-dark/50 text-center">
              <button 
                onClick={() => setActiveLegal(null)}
                className="bg-white text-black px-8 py-3 uppercase text-xs font-bold tracking-widest hover:bg-brand-accent hover:text-white transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;