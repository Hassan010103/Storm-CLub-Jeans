import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    businessName: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, phone, businessName, message } = formData;
    
    if (!name.trim() || !phone.trim()) {
      alert("Please enter your Name and Phone Number to continue.");
      return;
    }

    // Construct WhatsApp Message
    const text = `*New Stock Inquiry*%0A%0A*Name:* ${name}%0A*Business:* ${businessName || 'N/A'}%0A*Phone:* ${phone}%0A*Message:* ${message || 'I am interested in wholesale details.'}`;
    const whatsappUrl = `https://wa.me/919350643992?text=${text}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-brand-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <h2 className="font-heading text-4xl md:text-6xl font-bold text-white uppercase mb-8 leading-none">
              Stock Your <br/> <span className="text-brand-accent">Store.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-md">
              Have questions about stock, pricing, or shipping? Contact us directly. We respond quickly to all retailer inquiries.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-gray flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-1">Visit Factory & Showroom</h4>
                  <a 
                    href="https://maps.google.com/?q=Storm+Club+Jeans+5680+Gali+79+Raigar+Pura+Dev+Nagar+Tank+Road+Karol+Bagh+New+Delhi+110005" 
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-brand-accent transition-colors block"
                  >
                    Storm Club Jeans, Ground Floor,<br/>
                    Building No. 5680, Gali No. 79,<br/>
                    Raigar Pura, Tank Road, Dev Nagar,<br/>
                    Karol Bagh, New Delhi – 110005
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                 <div className="w-12 h-12 bg-brand-gray flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-1">Call / WhatsApp</h4>
                  <a href="tel:+919350643992" className="text-gray-400 hover:text-brand-accent transition-colors block">+91 93506 43992</a>
                  <a href="https://wa.me/919350643992" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-accent transition-colors block">
                    WhatsApp: +91 93506 43992
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                 <div className="w-12 h-12 bg-brand-gray flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-1">Email</h4>
                  <a href="mailto:amjad2373@gmail.com" className="text-gray-400 hover:text-brand-accent transition-colors block">amjad2373@gmail.com</a>
                </div>
              </div>
            </div>

             {/* WhatsApp CTA */}
             <a 
              href="https://wa.me/919350643992" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 mt-12 font-bold uppercase tracking-widest hover:brightness-110 transition-all rounded-sm"
            >
              <MessageCircle className="w-5 h-5 fill-current" /> Chat on WhatsApp
            </a>
          </div>

          {/* Form */}
          <div className="bg-brand-black p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white uppercase mb-6">Quick Inquiry</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Name *</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-brand-dark border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-brand-accent transition-colors" 
                    placeholder="Your Name" 
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Phone *</label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-brand-dark border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-brand-accent transition-colors" 
                    placeholder="+91" 
                  />
                </div>
              </div>

              <div>
                <label htmlFor="businessName" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Shop/Business Name</label>
                <input 
                  type="text" 
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full bg-brand-dark border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-brand-accent transition-colors" 
                  placeholder="Store Name" 
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  rows={4} 
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-brand-dark border border-gray-800 text-white px-4 py-3 focus:outline-none focus:border-brand-accent transition-colors" 
                  placeholder="I am interested in..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 hover:bg-brand-accent hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Map Embed (Visual Placeholder) */}
      <div className="w-full h-96 mt-24 filter grayscale invert hover:filter-none transition-all duration-700 pointer-events-none">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.7656250552726!2d77.18659231508267!3d28.64667798241221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d029c5f402ed3%3A0x94217429679ca84!2sTank%20Road%2C%20Karol%20Bagh%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1625634567890!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy"
          title="Google Map"
        ></iframe>
      </div>
    </section>
  );
};

export default Contact;