'use client';

import { useState } from 'react';
import { MoreVertical } from 'lucide-react';

export default function WeeklyReportChart() {
  const [activeTab, setActiveTab] = useState<'thisWeek' | 'lastWeek'>('thisWeek');
  const [hoveredPoint, setHoveredPoint] = useState<{ day: string; val: number } | null>(null);

  const days = [
    { day: 'Sun', val: 20 },
    { day: 'Mon', val: 35 },
    { day: 'Tue', val: 30 },
    { day: 'Wed', val: 48 }, // Peak on Thursday/Wed
    { day: 'Thu', val: 32 },
    { day: 'Fri', val: 40 },
    { day: 'Sat', val: 28 },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-800">Report for this week</h3>
          <p className="text-xs text-slate-400">Weekly operational overview & product stats</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab('thisWeek')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'thisWeek'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              This week
            </button>
            <button
              onClick={() => setActiveTab('lastWeek')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'lastWeek'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Last week
            </button>
          </div>
          <button className="text-slate-400 hover:text-slate-600 p-1">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 py-4 px-2 mb-6 bg-slate-50/70 rounded-xl border border-slate-100 text-center">
        <div>
          <span className="text-lg font-extrabold text-slate-900 block">52k</span>
          <span className="text-[11px] font-medium text-slate-400 uppercase">Customers</span>
        </div>
        <div>
          <span className="text-lg font-extrabold text-slate-900 block">3.5k</span>
          <span className="text-[11px] font-medium text-slate-400 uppercase">Total Products</span>
        </div>
        <div>
          <span className="text-lg font-extrabold text-slate-900 block">2.5k</span>
          <span className="text-[11px] font-medium text-slate-400 uppercase">Stock Products</span>
        </div>
        <div>
          <span className="text-lg font-extrabold text-slate-900 block">0.5k</span>
          <span className="text-[11px] font-medium text-red-500 uppercase">Out of Stock</span>
        </div>
        <div>
          <span className="text-lg font-extrabold text-emerald-600 block">250k</span>
          <span className="text-[11px] font-medium text-slate-400 uppercase">Revenue</span>
        </div>
      </div>

      {/* Area Chart Visualization */}
      <div className="relative h-56 w-full pt-4">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 700 200">
          <defs>
            <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="0" y1="40" x2="700" y2="40" stroke="#f1f5f9" strokeDasharray="4 4" />
          <line x1="0" y1="80" x2="700" y2="80" stroke="#f1f5f9" strokeDasharray="4 4" />
          <line x1="0" y1="120" x2="700" y2="120" stroke="#f1f5f9" strokeDasharray="4 4" />
          <line x1="0" y1="160" x2="700" y2="160" stroke="#f1f5f9" strokeDasharray="4 4" />

          {/* Smooth area curve */}
          <path
            d="M 50 160 C 120 120, 150 140, 250 80 C 350 20, 420 120, 520 70 C 600 110, 620 130, 650 150 L 650 180 L 50 180 Z"
            fill="url(#emeraldGradient)"
          />
          <path
            d="M 50 160 C 120 120, 150 140, 250 80 C 350 20, 420 120, 520 70 C 600 110, 620 130, 650 150"
            fill="none"
            stroke="#059669"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Highlighted point callout for Wednesday */}
          <g transform="translate(345, 20)">
            <circle cx="0" cy="0" r="6" fill="#059669" className="animate-ping opacity-75" />
            <circle cx="0" cy="0" r="5" fill="#ffffff" stroke="#059669" strokeWidth="3" />
            <rect x="-35" y="-30" width="70" height="22" rx="6" fill="#065f46" />
            <text x="0" y="-15" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
              Thursday 14k
            </text>
          </g>
        </svg>

        {/* X Axis Labels */}
        <div className="flex justify-between px-6 mt-2 text-xs font-semibold text-slate-400">
          {days.map((d) => (
            <span key={d.day} className="hover:text-emerald-600 transition cursor-pointer">
              {d.day}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
