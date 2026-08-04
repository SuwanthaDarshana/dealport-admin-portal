'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { api } from '@/lib/api';
import { Product } from '@/types';

export default function TopProductsWidget() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getTopRatedProducts();
        setProducts(data);
      } catch (err) {
        console.error('Failed to load top products:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-800">Top Products</h3>
        <span className="text-[11px] font-semibold text-emerald-600 hover:underline cursor-pointer">
          All product
        </span>
      </div>

      {/* Search Filter */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <Search className="w-3.5 h-3.5" />
        </div>
        <input
          type="text"
          placeholder="Search product..."
          className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="text-xs text-slate-400 text-center py-4">Loading top products...</div>
        ) : products.length === 0 ? (
          <div className="text-xs text-slate-400 text-center py-4">No top products found.</div>
        ) : (
          products.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 border border-slate-100 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                  {p.images && p.images[0] ? (
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-emerald-600 bg-emerald-50 text-xs">
                      {p.name[0]}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{p.name}</h4>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    Item: #FKZ-{p.id.slice(0, 4)}
                  </span>
                </div>
              </div>

              <span className="text-xs font-extrabold text-slate-900">
                ${p.price.toFixed(2)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
