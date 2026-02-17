import React, { useState, useEffect } from 'react';
import { Filter, MessageCircle, FileText, Search, X, ZoomIn, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface CatalogProps {
  products: Product[];
}

const categories = ['All', 'Slim Fit', 'Regular Fit', 'Ripped', 'Stretch', 'Trend'];

const formatPrice = (price: string) => {
  if (!price) return '₹0';
  const clean = String(price).replace(/[^\d.]/g, '');
  return `₹${clean || '0'}`;
};

const Catalog: React.FC<CatalogProps> = ({ products }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter Logic
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.modelNo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle Scroll lock when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section id="catalog" className="py-16 md:py-24 bg-brand-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 border-b border-white/10 pb-6 md:pb-8">
          <div className="w-full md:w-auto">
            <span className="text-brand-accent text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-2 block animate-fade-in-up">
              New Arrivals 2024
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white uppercase animate-fade-in-up leading-tight" style={{ animationDelay: '0.1s' }}>
              The Collection
            </h2>
          </div>
          
          <div className="mt-6 md:mt-0 flex flex-col md:items-end gap-4 animate-fade-in-up w-full md:w-auto" style={{ animationDelay: '0.2s' }}>
             <a 
              href="https://wa.me/919350643992?text=Hi Storm Club, I would like to request the full PDF Catalog." 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors uppercase text-[10px] md:text-xs tracking-widest group border border-gray-800 px-4 py-2 rounded-sm md:border-0 md:p-0 md:rounded-none"
            >
              <FileText className="w-4 h-4 group-hover:text-brand-accent transition-colors" /> 
              <span>Download Full PDF Catalog</span>
            </a>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          
          {/* Categories - Horizontal Scroll on Mobile */}
          <div className="w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex flex-nowrap md:flex-wrap gap-2 min-w-max">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 transition-all duration-300 uppercase text-[10px] md:text-xs font-bold tracking-widest whitespace-nowrap border ${
                    activeCategory === cat 
                      ? 'bg-white text-black border-white' 
                      : 'bg-transparent text-gray-500 hover:text-white border-gray-800 hover:border-gray-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-64">
            <input 
              type="text" 
              placeholder="Search Model No..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border-b border-gray-700 text-white pl-8 pr-4 py-2 focus:outline-none focus:border-brand-accent transition-colors placeholder-gray-600 text-sm"
            />
            <Search className="absolute left-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group bg-transparent">
                {/* Image Container */}
                <div 
                  className="relative overflow-hidden aspect-[3/4] mb-3 md:mb-4 cursor-pointer bg-brand-dark"
                  onClick={() => openModal(product)}
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0 opacity-90 group-hover:opacity-100"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-2 right-2 flex flex-col items-end gap-1 md:gap-2">
                    <span className="bg-brand-accent text-white text-[11px] md:text-xs font-bold px-2.5 py-1 md:px-3 md:py-1.5 uppercase tracking-widest shadow-lg">
                      {formatPrice(product.price)}
                    </span>
                     {product.category === 'Trend' && (
                        <span className="bg-white text-black text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 md:px-2 md:py-1 uppercase tracking-widest shadow-lg">
                          Hot
                        </span>
                     )}
                  </div>

                  {/* Quick View Overlay (Desktop only) */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center">
                    <button className="bg-white text-black px-6 py-2 uppercase text-xs font-bold tracking-widest hover:bg-brand-accent hover:text-white transition-colors flex items-center gap-2">
                      <ZoomIn className="w-4 h-4" /> Quick View
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <h3 className="text-white font-bold uppercase tracking-wider truncate md:pr-2 text-sm md:text-base group-hover:text-brand-accent transition-colors cursor-pointer" onClick={() => openModal(product)}>
                      {product.name}
                    </h3>
                    <span className="text-gray-500 text-[10px] md:text-xs whitespace-nowrap mt-1 md:mt-0">{product.modelNo}</span>
                  </div>
                  <p className="text-gray-500 text-[10px] md:text-xs mt-1 mb-3">{product.category} &bull; {product.fabric}</p>
                  
                  <div className="grid grid-cols-2 gap-2 border-t border-gray-800 pt-3">
                     <div className="text-center border-r border-gray-800">
                        <p className="text-[8px] md:text-[9px] text-gray-500 uppercase tracking-widest">Size</p>
                        <p className="text-white text-[10px] md:text-xs font-medium">{product.sizeRange}</p>
                     </div>
                     <div className="text-center">
                        <p className="text-[8px] md:text-[9px] text-gray-500 uppercase tracking-widest">MOQ</p>
                        <p className="text-white text-[10px] md:text-xs font-medium">{product.moq}</p>
                     </div>
                  </div>

                  <a 
                    href={`https://wa.me/919350643992?text=I am interested in ${product.name} (${product.modelNo})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-brand-dark border border-gray-800 text-white py-2 md:py-3 font-bold uppercase text-[9px] md:text-[10px] tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                  >
                    Inquire <MessageCircle className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border border-dashed border-gray-800 rounded-lg">
            <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl text-white font-bold uppercase mb-2">No Products Found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            <button 
              onClick={() => {setSearchTerm(''); setActiveCategory('All');}}
              className="mt-6 text-brand-accent hover:text-white underline uppercase text-xs tracking-widest"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={closeModal}></div>
          
          <div className="bg-brand-black border border-white/10 w-full h-full md:h-auto md:max-w-5xl md:max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl animate-fade-in-up flex flex-col md:flex-row">
            
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 text-white/50 hover:text-white bg-black/50 p-2 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Image */}
            <div className="w-full md:w-1/2 bg-brand-dark relative aspect-[3/4] md:aspect-auto flex-shrink-0">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-brand-accent text-white text-sm md:text-base font-bold px-5 py-2.5 uppercase tracking-widest">
                 {formatPrice(selectedProduct.price)} / pc
              </div>
            </div>

            {/* Modal Details */}
            <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col bg-brand-black">
              <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
                {selectedProduct.category}
              </span>
              
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-white uppercase mb-2 leading-none">
                {selectedProduct.name}
              </h2>
              <p className="text-gray-500 text-base md:text-lg mb-6 md:mb-8 font-light">Model: {selectedProduct.modelNo}</p>

              <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
                <div className="flex justify-between border-b border-gray-800 pb-4">
                   <span className="text-gray-400 uppercase text-xs tracking-widest">Fabric</span>
                   <span className="text-white font-medium text-right text-sm">{selectedProduct.fabric}</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-4">
                   <span className="text-gray-400 uppercase text-xs tracking-widest">Size Range</span>
                   <span className="text-white font-medium text-right text-sm">{selectedProduct.sizeRange}</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-4">
                   <span className="text-gray-400 uppercase text-xs tracking-widest">Minimum Order Qty</span>
                   <span className="text-white font-medium text-right text-sm">{selectedProduct.moq}</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-4">
                   <span className="text-gray-400 uppercase text-xs tracking-widest">Availability</span>
                   <span className="text-green-400 font-bold uppercase text-xs tracking-widest text-right">In Stock</span>
                </div>
              </div>

              <div className="mt-auto space-y-4 pb-8 md:pb-0">
                 <a 
                  href={`https://wa.me/919350643992?text=Hi, I am interested in placing an order for *${selectedProduct.name}* (Model: ${selectedProduct.modelNo}). Please share shipping details.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-brand-accent hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" /> Inquire on WhatsApp
                </a>
                <p className="text-center text-gray-600 text-[10px] uppercase tracking-widest">
                  Direct Factory Pricing &bull; Fast Dispatch
                </p>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default Catalog;