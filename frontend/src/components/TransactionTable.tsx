'use client';

import { useState, useEffect } from 'react';
import { Filter, ChevronRight } from 'lucide-react';
import { api } from '@/lib/api';
import { Transaction } from '@/types';

export default function TransactionTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getTransactions();
        setTransactions(data);
      } catch (err) {
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-emerald-100 text-emerald-700 font-semibold';
      case 'Pending':
        return 'bg-amber-100 text-amber-700 font-semibold';
      case 'Canceled':
        return 'bg-red-100 text-red-700 font-semibold';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-slate-800">Transaction</h3>
        <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
              <th className="py-3 px-2">No</th>
              <th className="py-3 px-2">Id Customer</th>
              <th className="py-3 px-2">Order Date</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-6 text-center text-slate-400">
                  Loading transactions...
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-6 text-center text-slate-400">
                  No transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((tx, idx) => (
                <tr key={tx.id || idx} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-2 font-bold text-slate-900">{idx + 1}.</td>
                  <td className="py-3 px-2 font-semibold text-slate-800">{tx.orderId}</td>
                  <td className="py-3 px-2 text-slate-500">01 Oct | 11:29 am</td>
                  <td className="py-3 px-2">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] ${getStatusBadge(tx.status)}`}>
                      <span className="w-1.5 h-1.5 rounded-full fill-current bg-current"></span>
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-right font-bold text-slate-900">
                    ${tx.amount.toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-right">
        <button className="text-xs font-semibold text-emerald-600 border border-emerald-200 px-4 py-1.5 rounded-xl hover:bg-emerald-50 transition">
          Details
        </button>
      </div>
    </div>
  );
}
