import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Gallery from './components/Gallery';
import Catalog from './components/Catalog';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './components/Admin';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { PRODUCTS } from './constants';
import { Product } from './types';
import { db } from './firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const App: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [view, setView] = useState<'main' | 'admin'>('main');
  // Initialize with default PRODUCTS immediately for instant load
  const [products, setProducts] = useState<Product[]>(PRODUCTS);

  // Initialize Products from Firebase Real-time Listener
  useEffect(() => {
    if (!db) {
      return;
    }

    // Subscribe to the 'products' collection
    const q = query(collection(db, 'products'), orderBy('id', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const firebaseProducts: Product[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as Product;
        firebaseProducts.push({ ...data, id: doc.id });
      });
      
      // Update state only if we have products from Firebase
      // or if we have explicitly initialized the DB before (handling empty state)
      if (firebaseProducts.length > 0) {
         setProducts(firebaseProducts);
         localStorage.setItem('db_initialized', 'true');
      } else if (localStorage.getItem('db_initialized')) {
         // If DB was previously used but is now empty, show empty list
         setProducts([]);
      }
      // If DB is empty and fresh, we keep the initial PRODUCTS
      
    }, (error) => {
      console.error("Error fetching products:", error);
      // Keep default products on error
    });

    return () => unsubscribe();
  }, []);

  // Scroll to Top Listener
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (view === 'admin') {
    return (
      <Admin 
        products={products} 
        goHome={() => setView('main')} 
      />
    );
  }

  return (
    <div className="bg-brand-black min-h-screen text-white font-sans selection:bg-brand-accent selection:text-white overflow-x-hidden">
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Features />
        <Gallery />
        <Catalog products={products} />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      
      <Footer onAdminClick={() => setView('admin')} />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        {showScrollTop && (
          <button 
            onClick={scrollToTop}
            className="p-3 bg-white text-black hover:bg-brand-accent hover:text-white transition-all shadow-lg rounded-sm"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
        
        <a 
          href="https://wa.me/919350643992" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-4 bg-[#25D366] text-white hover:scale-110 transition-transform shadow-lg shadow-green-900/20 rounded-full animate-bounce"
        >
          <MessageCircle className="w-6 h-6 fill-current" />
        </a>
      </div>
    </div>
  );
};

export default App;