'use client';

import { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import { api } from '@/lib/api';
import { Product } from '@/types';

export default function BestSellingWidget() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getBestSellingProducts();
        setProducts(data);
      } catch (err) {
        console.error('Failed to load best-selling products from NestJS API:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm font-sans">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-slate-800">Best selling product</h3>
        <button className="flex items-center gap-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 px-3.5 py-1.5 rounded-full transition shadow-xs">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter</span>
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            {/* Green Header Row matching Figma Screenshot */}
            <tr className="bg-emerald-50/70 border-b border-emerald-100 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
              <th className="py-3 px-4">PRODUCT</th>
              <th className="py-3 px-4 text-center">TOTAL ORDER</th>
              <th className="py-3 px-4 text-center">STATUS</th>
              <th className="py-3 px-4 text-right">PRICE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {loading ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-slate-400">
                  <div className="inline-flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-600"></div>
                    <span>Loading Best Sellers from NestJS API...</span>
                  </div>
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-slate-400">
                  No product data available.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                        {p.images && p.images[0] ? (
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-bold text-emerald-600 bg-emerald-50 text-xs">
                            {p.name[0]}
                          </div>
                        )}
                      </div>
                      <span className="font-bold text-slate-800 text-xs truncate max-w-[140px]">
                        {p.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center font-semibold text-slate-800">
                    {p.orderCount || 0}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        p.stockStatus === 'IN_STOCK' || p.stock > 0
                          ? 'text-emerald-600'
                          : 'text-red-500'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${p.stockStatus === 'IN_STOCK' || p.stock > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                      {p.stockStatus === 'IN_STOCK' || p.stock > 0 ? 'Stock' : 'Stock out'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-extrabold text-slate-900">
                    ${p.price.toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-right">
        <button className="text-xs font-semibold text-indigo-600 border border-indigo-200 px-5 py-1.5 rounded-full hover:bg-indigo-50 transition">
          Details
        </button>
      </div>
    </div>
  );
}
