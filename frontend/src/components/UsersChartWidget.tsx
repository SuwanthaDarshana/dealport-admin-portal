import { MoreVertical } from 'lucide-react';

export default function UsersChartWidget() {
  const bars = [35, 45, 60, 25, 70, 85, 40, 65, 90, 50, 75, 60, 45, 80, 55, 95, 40, 70, 85];

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] font-medium text-slate-400 uppercase">Users in last 30 minutes</span>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      <div className="text-2xl font-extrabold text-slate-900 mb-2">21.5K</div>
      <p className="text-[11px] font-semibold text-slate-400 mb-3">Users per minute</p>

      {/* Bar chart */}
      <div className="h-14 flex items-end gap-1 px-1">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 rounded-t transition-all"
            style={{ height: `${h}%` }}
            title={`Minute ${i + 1}: ${h * 200} users`}
          />
        ))}
      </div>
    </div>
  );
}
