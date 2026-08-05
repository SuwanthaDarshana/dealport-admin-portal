'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Upload,
  Plus,
  Save,
  Check,
  Calendar,
  Image as ImageIcon,
  RotateCcw,
  Pencil,
  Wand2,
  X,
  Search,
  ChevronDown,
} from 'lucide-react';
import { api } from '@/lib/api';
import { Category } from '@/types';

export default function AddProductPage() {
  const router = useRouter();

  // Form State matching Figma PDF
  const [name, setName] = useState('iPhone 15');
  const [description, setDescription] = useState(
    'The iPhone 15 delivers cutting-edge performance with the A16 Bionic chip, an immersive Super Retina XDR display, advanced dual-camera system, and exceptional battery life, all encased in stunning aerospace-grade aluminum.'
  );
  const [price, setPrice] = useState('999.89');
  const [discountPrice, setDiscountPrice] = useState('99');
  const [taxIncluded, setTaxIncluded] = useState(true);
  const [stock, setStock] = useState('Unlimited');
  const [isUnlimitedStock, setIsUnlimitedStock] = useState(true);
  const [stockStatus, setStockStatus] = useState<'IN_STOCK' | 'OUT_OF_STOCK' | 'PENDING'>('IN_STOCK');
  const [categoryId, setCategoryId] = useState('');
  const [tag, setTag] = useState('Smartphone');
  const [featured, setFeatured] = useState(true);
  const [expirationStart, setExpirationStart] = useState('');
  const [expirationEnd, setExpirationEnd] = useState('');

  // Image State matching Figma PDF thumbnails
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80',
  ]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Color Swatches matching Figma screenshot (light green, pink, gray, cream, dark gray)
  const colors = ['#d1fae5', '#fbcfe8', '#e2e8f0', '#fef3c7', '#334155'];
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  // Loading & Categories State
  const [categories, setCategories] = useState<Category[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await api.getCategories();
        setCategories(data);
        if (data.length > 0) setCategoryId(data[0].id);
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    }
    loadCategories();
  }, []);

  // Calculated Sale Value
  const parsedPrice = parseFloat(price) || 0;
  const parsedDiscount = parseFloat(discountPrice) || 0;
  const calculatedSale = parsedPrice > 0 ? (parsedPrice - parsedDiscount).toFixed(2) : '900.89';

  const handleAddImageUrl = () => {
    if (imageUrlInput.trim()) {
      setImages([...images, imageUrlInput.trim()]);
      setImageUrlInput('');
    }
  };

  const handleRemoveImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    if (activeImageIndex >= updated.length) {
      setActiveImageIndex(Math.max(0, updated.length - 1));
    }
  };

  const handleSaveProduct = async (status: 'PUBLISHED' | 'DRAFT') => {
    if (!name.trim()) {
      setStatusMessage({ text: 'Product name is required', type: 'error' });
      return;
    }
    if (!price || parseFloat(price) < 0) {
      setStatusMessage({ text: 'Valid product price is required', type: 'error' });
      return;
    }

    setSubmitting(true);
    setStatusMessage(null);

    try {
      await api.createProduct({
        name,
        description,
        price: parseFloat(price),
        discountPrice: discountPrice ? parseFloat(discountPrice) : undefined,
        taxIncluded,
        stock: isUnlimitedStock ? 99999 : parseInt(stock) || 0,
        isUnlimitedStock,
        stockStatus,
        status,
        categoryId: categoryId || undefined,
        tags: [tag],
        images,
        colorSwatches: [selectedColor],
        featured,
        expirationStart: expirationStart || undefined,
        expirationEnd: expirationEnd || undefined,
      });

      setStatusMessage({
        text: `Product successfully ${status === 'PUBLISHED' ? 'published' : 'saved to draft'}!`,
        type: 'success',
      });

      setTimeout(() => {
        router.push('/dashboard/products');
      }, 1200);
    } catch (err: any) {
      setStatusMessage({ text: err.message || 'Failed to save product', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header Actions matching Figma PDF */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Add New Product</h2>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Search product for add */}
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search product for add"
              className="w-full pl-3.5 pr-9 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
          </div>

          <button
            type="button"
            disabled={submitting}
            onClick={() => handleSaveProduct('PUBLISHED')}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition disabled:opacity-50"
          >
            Publish Product
          </button>

          <button
            type="button"
            disabled={submitting}
            onClick={() => handleSaveProduct('DRAFT')}
            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-300 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 shadow-2xs transition disabled:opacity-50"
          >
            <Save className="w-4 h-4 text-slate-500" />
            <span>Save to draft</span>
          </button>

          <button
            type="button"
            className="p-2 bg-white border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <span>{statusMessage.text}</span>
          <button onClick={() => setStatusMessage(null)}>×</button>
        </div>
      )}

      {/* Main 2-Column Form Layout matching Figma PDF */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Form Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Basic Details Container */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">
              Basic Details
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Product Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="iPhone 15"
                className="w-full px-4 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Product Description
              </label>
              <div className="relative">
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="The iPhone 15 delivers cutting-edge performance..."
                  className="w-full px-4 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none pr-16"
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-slate-400">
                  <Pencil className="w-3.5 h-3.5 hover:text-slate-600 cursor-pointer" />
                  <Wand2 className="w-3.5 h-3.5 hover:text-slate-600 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Container */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">
              Pricing
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Product Price
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={`$${price}`}
                  onChange={(e) => setPrice(e.target.value.replace('$', ''))}
                  placeholder="$999.89"
                  className="w-full pl-4 pr-16 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <div className="absolute right-3 flex items-center gap-1 text-slate-500 text-xs cursor-pointer">
                  <span className="text-base">🇺🇸</span>
                  <ChevronDown className="w-3 h-3" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Discounted Price <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">$</span>
                    <input
                      type="text"
                      value={discountPrice}
                      onChange={(e) => setDiscountPrice(e.target.value)}
                      placeholder="99"
                      className="w-full pl-7 pr-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none"
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">
                    Sale= <strong className="text-slate-900">${calculatedSale}</strong>
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Tax Included
                </label>
                <div className="flex items-center gap-6 py-1.5">
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="tax"
                      checked={taxIncluded}
                      onChange={() => setTaxIncluded(true)}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="tax"
                      checked={!taxIncluded}
                      onChange={() => setTaxIncluded(false)}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Expiration Dates */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Expiration
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="date"
                    value={expirationStart}
                    onChange={(e) => setExpirationStart(e.target.value)}
                    placeholder="Start"
                    className="w-full px-4 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-700 outline-none"
                  />
                </div>

                <div className="relative">
                  <input
                    type="date"
                    value={expirationEnd}
                    onChange={(e) => setExpirationEnd(e.target.value)}
                    placeholder="End"
                    className="w-full px-4 py-2 bg-slate-50/70 border border-slate-200 rounded-xl text-xs text-slate-700 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Inventory Container */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">
              Inventory
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Stock Quantity
                </label>
                <input
                  type="text"
                  disabled={isUnlimitedStock}
                  value={isUnlimitedStock ? 'Unlimited' : stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 disabled:opacity-70 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Stock Status
                </label>
                <div className="relative">
                  <select
                    value={stockStatus}
                    onChange={(e) => setStockStatus(e.target.value as 'IN_STOCK' | 'OUT_OF_STOCK' | 'PENDING')}
                    className="w-full px-4 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 appearance-none outline-none"
                  >
                    <option value="IN_STOCK">In Stock</option>
                    <option value="OUT_OF_STOCK">Out of Stock</option>
                    <option value="PENDING">Pending</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Unlimited Switch */}
            <div className="flex items-center gap-3 pt-1">
              <div
                onClick={() => setIsUnlimitedStock(!isUnlimitedStock)}
                className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-colors ${
                  isUnlimitedStock ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white shadow-xs transform transition-transform ${
                    isUnlimitedStock ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </div>
              <span className="text-xs font-bold text-slate-800">Unlimited</span>
            </div>

            {/* Highlight Checkbox */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <label htmlFor="featured" className="text-xs font-semibold text-slate-600 cursor-pointer">
                Highlight this product in a featured section.
              </label>
            </div>

            {/* Bottom Form Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                disabled={submitting}
                onClick={() => handleSaveProduct('DRAFT')}
                className="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 transition"
              >
                Save to draft
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={() => handleSaveProduct('PUBLISHED')}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition"
              >
                Publish Product
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column (1 Col) matching Figma */}
        <div className="space-y-6">
          
          {/* Upload Product Image Container matching Figma */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">
              Upload Product Image
            </h3>

            <span className="block text-xs font-bold text-slate-800">Product Image</span>

            {/* Image Preview Box matching Figma */}
            <div className="relative aspect-square w-full rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center p-6">
              {images.length > 0 && images[activeImageIndex] ? (
                <img
                  src={images[activeImageIndex]}
                  alt="Product preview"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center p-4">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-slate-600">Drag & drop image</p>
                </div>
              )}

              {/* Action Buttons inside image box matching Figma screenshot */}
              <div className="absolute bottom-3 left-3">
                <button
                  type="button"
                  onClick={() => {
                    const url = prompt('Enter image URL:');
                    if (url) setImages([...images, url]);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-xs border border-slate-200 text-slate-700 text-[11px] font-bold rounded-xl shadow-2xs hover:bg-white"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-slate-500" />
                  <span>Browse</span>
                </button>
              </div>

              <div className="absolute bottom-3 right-3">
                <button
                  type="button"
                  onClick={() => {
                    const url = prompt('Replace image URL:');
                    if (url) {
                      const updated = [...images];
                      updated[activeImageIndex] = url;
                      setImages(updated);
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-xs border border-slate-200 text-slate-700 text-[11px] font-bold rounded-xl shadow-2xs hover:bg-white"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Replace</span>
                </button>
              </div>
            </div>

            {/* Thumbnail Row matching Figma PDF */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {images.map((url, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-square rounded-xl border-2 overflow-hidden cursor-pointer bg-slate-50 ${
                    activeImageIndex === idx ? 'border-emerald-600' : 'border-slate-200'
                  }`}
                >
                  <img src={url} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage(idx);
                    }}
                    className="absolute top-1 right-1 w-4 h-4 rounded-full bg-slate-800/80 text-white flex items-center justify-center text-[10px]"
                  >
                    ×
                  </button>
                </div>
              ))}

              {/* Add Image Slot */}
              <div
                onClick={() => {
                  const url = prompt('Add new image URL:');
                  if (url) setImages([...images, url]);
                }}
                className="aspect-square rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 flex flex-col items-center justify-center cursor-pointer text-emerald-600 transition"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center mb-1 shadow-2xs">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-emerald-700">Add Image</span>
              </div>
            </div>
          </div>

          {/* Categories Container matching Figma */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">
              Categories
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Product Categories
              </label>
              <div className="relative">
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 appearance-none outline-none"
                >
                  <option value="">Select your product</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Product Tag
              </label>
              <div className="relative">
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 appearance-none outline-none"
                >
                  <option value="">Select your product</option>
                  <option value="Smartphone">Smartphone</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Home">Home</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Select your color swatches */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">
                Select your color
              </label>
              <div className="flex items-center gap-2.5">
                {colors.map((c) => (
                  <div
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    style={{ backgroundColor: c }}
                    className={`w-9 h-9 rounded-xl cursor-pointer transition transform hover:scale-105 border border-slate-200 ${
                      selectedColor === c ? 'ring-2 ring-emerald-600 ring-offset-1' : ''
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
