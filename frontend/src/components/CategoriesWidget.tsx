'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, Smartphone, Shirt, Home as HomeIcon, Sparkles, Activity, Plus } from 'lucide-react';
import { api } from '@/lib/api';
import { Category } from '@/types';

export default function CategoriesWidget() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to load categories:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'electronic':
        return <Smartphone className="w-4 h-4 text-emerald-600" />;
      case 'fashion':
        return <Shirt className="w-4 h-4 text-indigo-600" />;
      case 'home':
        return <HomeIcon className="w-4 h-4 text-amber-600" />;
      case 'beauty':
        return <Sparkles className="w-4 h-4 text-pink-600" />;
      case 'sports':
        return <Activity className="w-4 h-4 text-blue-600" />;
      default:
        return <Smartphone className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Add New Product</h3>
          <p className="text-[11px] text-slate-400">Categories</p>
        </div>
        <button className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 hover:bg-emerald-50 px-2 py-1 rounded-lg transition">
          <Plus className="w-3.5 h-3.5" />
          <span>Add New</span>
        </button>
      </div>

      <div className="space-y-2">
        {loading ? (
          <div className="text-xs text-slate-400 text-center py-3">Loading categories...</div>
        ) : categories.length === 0 ? (
          <div className="text-xs text-slate-400 text-center py-3">No categories found.</div>
        ) : (
          categories.slice(0, 4).map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 cursor-pointer border border-slate-100 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-2xs">
                  {getCategoryIcon(c.slug)}
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition">
                  {c.name}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
          ))
        )}
      </div>

      <div className="mt-3 text-center">
        <button className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 transition">
          See more categories
        </button>
      </div>
    </div>
  );
}
