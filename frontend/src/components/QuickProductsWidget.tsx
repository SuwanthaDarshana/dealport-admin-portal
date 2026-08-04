'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { api } from '@/lib/api';
import { Product } from '@/types';

export default function QuickProductsWidget() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getProducts({ limit: 3 });
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to load quick products:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Product Quick Add</h4>
        <span className="text-[11px] text-emerald-600 font-semibold cursor-pointer">See more</span>
      </div>

      {loading ? (
        <div className="text-xs text-slate-400 text-center py-2">Loading quick products...</div>
      ) : (
        products.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition"
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
                <h5 className="text-xs font-bold text-slate-800 line-clamp-1">{p.name}</h5>
                <span className="text-xs font-extrabold text-slate-900">${p.price.toFixed(2)}</span>
              </div>
            </div>

            <button
              title="Add product"
              className="flex items-center gap-1 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-2.5 py-1 rounded-lg shadow-2xs transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        ))
      )}
    </div>
  );
}
