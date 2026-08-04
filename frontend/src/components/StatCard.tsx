import { MoreVertical, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  subtitle?: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  previousText?: string;
  dualStat?: {
    label1: string;
    value1: string;
    user1?: string;
    label2: string;
    value2: string;
    change2?: string;
  };
}

export default function StatCard({
  title,
  subtitle = 'Last 7 days',
  value,
  change,
  isPositive = true,
  previousText,
  dualStat,
}: StatCardProps) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-bold text-slate-800">{title}</h3>
        <button className="text-slate-400 hover:text-slate-600 p-1">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-slate-400 mb-3">{subtitle}</p>

      {dualStat ? (
        <div className="grid grid-cols-2 gap-4 pt-1">
          <div className="border-r border-slate-100 pr-3">
            <span className="text-xs font-semibold text-slate-500 block mb-1">
              {dualStat.label1}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-slate-900">
                {dualStat.value1}
              </span>
              {dualStat.user1 && (
                <span className="text-xs text-slate-400 font-normal">
                  user {dualStat.user1}
                </span>
              )}
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-500 block mb-1">
              {dualStat.label2}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-slate-900">
                {dualStat.value2}
              </span>
              {dualStat.change2 && (
                <span className="text-[11px] font-semibold text-red-500 flex items-center">
                  <TrendingDown className="w-3 h-3 mr-0.5" />
                  {dualStat.change2}
                </span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {value}
            </span>
            {change && (
              <span
                className={`text-xs font-semibold flex items-center px-1.5 py-0.5 rounded-md ${
                  isPositive
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'text-red-700 bg-red-50'
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {change}
              </span>
            )}
          </div>

          {previousText && (
            <p className="text-xs text-slate-400 border-t border-slate-100 pt-2.5 mt-2">
              Previous 7days <span className="font-semibold text-slate-600">{previousText}</span>
            </p>
          )}
        </>
      )}

      <div className="mt-3 text-right">
        <button className="text-[11px] font-semibold text-emerald-600 border border-emerald-200 px-3 py-1 rounded-lg hover:bg-emerald-50 transition">
          Details
        </button>
      </div>
    </div>
  );
}
