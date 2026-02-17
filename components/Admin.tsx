import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';
import { Trash2, Plus, LogOut, ArrowLeft, Image as ImageIcon, Upload, Loader2, Camera } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

interface AdminProps {
  products: Product[];
  goHome: () => void;
}

const CATEGORIES = ['Slim Fit', 'Regular Fit', 'Ripped', 'Stretch', 'Trend'];

const formatPrice = (price: string) => {
  if (!price) return '₹0';
  const clean = String(price).replace(/[^\d.]/g, '');
  return `₹${clean || '0'}`;
};

const Admin: React.FC<AdminProps> = ({ products, goHome }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // File Upload State
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    category: 'Slim Fit',
    modelNo: '',
    sizeRange: '28-36',
    fabric: '',
    price: '',
    moq: '50 Pcs',
    image: ''
  });

  useEffect(() => {
    const auth = localStorage.getItem('isAdminAuthenticated');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'stormclub2024') {
      setIsAuthenticated(true);
      localStorage.setItem('isAdminAuthenticated', 'true');
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAdminAuthenticated');
    goHome();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // For price, always store numeric value only (no currency symbol)
    if (name === 'price') {
      const numeric = value.replace(/[^\d.]/g, '');
      setFormData({ ...formData, [name]: numeric });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  // Optional: Cloudinary configuration (client-side unsigned upload)
  // If you set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET
  // in your env vars, images will be uploaded to Cloudinary and only the
  // resulting URL will be stored in Firestore. If these are not set, the
  // app will fall back to storing a compressed base64 string directly.
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const cloudinaryUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const uploadImageToCloudinary = async (imageDataUrl: string): Promise<string | null> => {
    if (!cloudName || !cloudinaryUploadPreset) {
      return null; // Cloudinary is not configured, skip uploading
    }

    try {
      const formData = new FormData();
      formData.append('file', imageDataUrl);
      formData.append('upload_preset', cloudinaryUploadPreset);

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        console.error('Cloudinary upload failed', await response.text());
        return null;
      }

      const data = await response.json();
      return data.secure_url as string;
    } catch (error) {
      console.error('Cloudinary upload error', error);
      return null;
    }
  };

  // NEW: Compress and Encode Image locally
  const processFile = (file: File) => {
    setIsUploading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        // Create a canvas to resize/compress the image
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800; // Resize to max 800px width to keep DB light
        const scaleSize = MAX_WIDTH / img.width;
        
        // Calculate new dimensions
        // If image is smaller than max, keep original size
        const newWidth = img.width > MAX_WIDTH ? MAX_WIDTH : img.width;
        const newHeight = img.width > MAX_WIDTH ? img.height * scaleSize : img.height;

        canvas.width = newWidth;
        canvas.height = newHeight;
        
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, newWidth, newHeight);
        
        // Compress to JPEG at 60% quality
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6);
        
        setBase64Image(compressedBase64);
        setPreviewUrl(compressedBase64);
        setIsUploading(false);
      };
    };
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.modelNo || !formData.price) {
      alert('Please fill in required fields');
      return;
    }

    if (!db) {
      alert("Firebase is not configured. Please check firebase.ts");
      return;
    }

    setIsUploading(true);

    try {
      // IMAGE HANDLING
      // 1. If Cloudinary is configured, try uploading the compressed image there
      // 2. If upload fails or Cloudinary is not configured, fall back to:
      //    - compressed base64 (if present), or
      //    - manually entered URL, or
      //    - a random placeholder image
      let imageUrl = formData.image || '';

      if (base64Image) {
        const uploadedUrl = await uploadImageToCloudinary(base64Image);
        imageUrl = uploadedUrl || base64Image || imageUrl;
      }

      if (!imageUrl) {
        imageUrl = 'https://picsum.photos/600/800?random=' + Date.now();
      }

      const rawPrice = String(formData.price ?? '').replace(/[^\d.]/g, '');
      const storedPrice = rawPrice || '0';

      const newProduct = {
        name: formData.name || 'New Product',
        category: (formData.category as any) || 'Slim Fit',
        modelNo: formData.modelNo || 'SC-NEW',
        sizeRange: formData.sizeRange || '28-36',
        fabric: formData.fabric || 'Denim',
        // store plain numeric price; display layer adds currency symbol
        price: storedPrice,
        moq: formData.moq || '50 Pcs',
        image: imageUrl,
      };

      if (editingId) {
        // Update existing Firestore document
        const ref = doc(db, 'products', editingId);
        await updateDoc(ref, newProduct);
      } else {
        // Create new Firestore document
        await addDoc(collection(db, 'products'), newProduct);
      }

      // Reset Form
      setFormData({
        name: '',
        category: 'Slim Fit',
        modelNo: '',
        sizeRange: '28-36',
        fabric: '',
        price: '',
        moq: '50 Pcs',
        image: ''
      });
      setBase64Image(null);
      setPreviewUrl(null);
      setEditingId(null);
      alert(editingId ? 'Product updated successfully!' : 'Product added successfully!');

    } catch (err) {
      console.error("Error adding product: ", err);
      alert("Failed to add product. Check console for details.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!db) {
      alert('Database is not connected. Please check Firebase configuration.');
      return;
    }
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, 'products', id));
      } catch (err) {
        console.error("Error deleting product:", err);
        alert("Failed to delete product from database. See console for details.");
      }
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      modelNo: product.modelNo,
      sizeRange: product.sizeRange,
      fabric: product.fabric,
      // strip any currency symbol if present
      price: String(product.price).replace(/[^\d.]/g, ''),
      moq: product.moq,
      image: product.image,
    });
    setPreviewUrl(product.image || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center px-4">
        <div className="bg-brand-dark p-8 border border-white/10 w-full max-w-md shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center uppercase tracking-widest">Admin Access</h2>
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-500 text-xs uppercase tracking-widest mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black border border-gray-800 text-white p-3 focus:border-brand-accent focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-gray-500 text-xs uppercase tracking-widest mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-gray-800 text-white p-3 focus:border-brand-accent focus:outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-brand-accent text-white font-bold uppercase tracking-widest py-3 hover:bg-white hover:text-black transition-all"
            >
              Login
            </button>
            <button
              type="button"
              onClick={goHome}
              className="w-full text-gray-500 text-xs uppercase tracking-widest hover:text-white mt-4"
            >
              Back to Website
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black text-white">
      {/* Admin Header */}
      <div className="bg-brand-dark border-b border-white/10 p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={goHome} className="text-gray-400 hover:text-white flex items-center gap-2 text-sm uppercase tracking-widest">
              <ArrowLeft className="w-4 h-4" /> Back to Site
            </button>
            <h1 className="font-heading text-xl font-bold uppercase hidden md:block">Storm Club Admin</h1>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-900/50 text-red-200 px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-red-800 transition-colors flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Add Product Form */}
        <div className="lg:col-span-1">
          <div className="bg-brand-dark p-6 border border-white/10 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-2">
              <Plus className="w-5 h-5 text-brand-accent" /> {editingId ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-gray-500 text-[10px] uppercase tracking-widest mb-1">Model Name *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Midnight Rider Slim"
                  className="w-full bg-black border border-gray-800 text-white p-2 text-sm focus:border-brand-accent focus:outline-none"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-500 text-[10px] uppercase tracking-widest mb-1">Model No *</label>
                  <input
                    name="modelNo"
                    value={formData.modelNo}
                    onChange={handleInputChange}
                    placeholder="SC-101"
                    className="w-full bg-black border border-gray-800 text-white p-2 text-sm focus:border-brand-accent focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-500 text-[10px] uppercase tracking-widest mb-1">
                    Price <span className="text-brand-accent">(₹)</span> *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-2 flex items-center text-gray-500 text-xs">₹</span>
                    <input
                      type="number"
                      inputMode="decimal"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="850"
                      className="w-full bg-black border border-gray-800 text-white pl-6 pr-2 py-2 text-sm focus:border-brand-accent focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-500 text-[10px] uppercase tracking-widest mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-gray-800 text-white p-2 text-sm focus:border-brand-accent focus:outline-none"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-500 text-[10px] uppercase tracking-widest mb-1">Fabric Details</label>
                <input
                  name="fabric"
                  value={formData.fabric}
                  onChange={handleInputChange}
                  placeholder="e.g. 98% Cotton 2% Elastane"
                  className="w-full bg-black border border-gray-800 text-white p-2 text-sm focus:border-brand-accent focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-500 text-[10px] uppercase tracking-widest mb-1">Size Range</label>
                  <input
                    name="sizeRange"
                    value={formData.sizeRange}
                    onChange={handleInputChange}
                    placeholder="28-36"
                    className="w-full bg-black border border-gray-800 text-white p-2 text-sm focus:border-brand-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 text-[10px] uppercase tracking-widest mb-1">MOQ</label>
                  <input
                    name="moq"
                    value={formData.moq}
                    onChange={handleInputChange}
                    placeholder="50 Pcs"
                    className="w-full bg-black border border-gray-800 text-white p-2 text-sm focus:border-brand-accent focus:outline-none"
                  />
                </div>
              </div>

              {/* Enhanced Image Upload Section */}
              <div className="border-t border-gray-800 pt-4 mt-2">
                <label className="block text-gray-500 text-[10px] uppercase tracking-widest mb-2">Product Image</label>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/*"
                  className="hidden"
                  capture="environment" // Hints mobile browsers to use camera
                />

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center p-4 border border-dashed border-gray-700 hover:border-brand-accent hover:bg-brand-accent/5 transition-all rounded-sm text-gray-400 hover:text-white"
                  >
                    <Camera className="w-6 h-6 mb-2" />
                    <span className="text-[10px] uppercase font-bold">Take Photo / Upload</span>
                  </button>

                  <div className="relative aspect-[3/4] bg-black border border-gray-800 flex items-center justify-center overflow-hidden">
                    {previewUrl ? (
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-gray-700 flex flex-col items-center">
                        <ImageIcon className="w-6 h-6 mb-1" />
                        <span className="text-[9px]">No Image</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-4">
                    <p className="text-[10px] text-gray-500 mb-1 uppercase tracking-widest">Or paste URL</p>
                    <input
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="https://..."
                      className="w-full bg-black border border-gray-800 text-white p-2 text-sm focus:border-brand-accent focus:outline-none"
                    />
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-4">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full bg-brand-accent text-white font-bold uppercase tracking-widest py-3 hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                    </>
                  ) : (
                    editingId ? 'Save Changes' : 'Add Product'
                  )}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setFormData({
                        name: '',
                        category: 'Slim Fit',
                        modelNo: '',
                        sizeRange: '28-36',
                        fabric: '',
                        price: '',
                        moq: '50 Pcs',
                        image: ''
                      });
                      setPreviewUrl(null);
                      setBase64Image(null);
                    }}
                    className="w-full border border-gray-700 text-gray-400 hover:text-white hover:border-white text-xs uppercase tracking-widest py-2"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Product List */}
        <div className="lg:col-span-2">
          <div className="bg-brand-dark border border-white/10">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h2 className="font-bold text-white uppercase tracking-widest">Current Catalog ({products.length})</h2>
              {/* Force refresh is not needed with realtime db, but we can keep a status indicator */}
              <div className="flex items-center gap-2 text-[10px] text-green-500 uppercase tracking-widest">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Live Database
              </div>
            </div>
            
            <div className="divide-y divide-gray-800 max-h-[800px] overflow-y-auto">
              {products.map((product) => (
                <div key={product.id} className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors group">
                  <div className="w-16 h-20 bg-black flex-shrink-0 relative overflow-hidden">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-700">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-bold text-sm uppercase truncate">{product.name}</h3>
                        <p className="text-brand-accent text-xs font-mono">{product.modelNo}</p>
                      </div>
                      <span className="text-gray-500 text-xs bg-black px-2 py-1 uppercase">{product.category}</span>
                    </div>
                  <div className="mt-2 flex gap-4 text-xs text-gray-400">
                    <span>Price: {formatPrice(product.price)}</span>
                    <span>MOQ: {product.moq}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-3 py-1 text-[10px] uppercase tracking-widest border border-gray-700 text-gray-300 hover:text-white hover:border-brand-accent transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-500/10 transition-all rounded-sm"
                    title="Delete Product"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                </div>
              ))}
              
              {products.length === 0 && (
                <div className="p-12 text-center text-gray-500">
                  No products found in the database.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Admin;