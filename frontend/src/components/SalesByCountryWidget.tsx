export default function SalesByCountryWidget() {
  const countries = [
    { flag: '🇺🇸', name: 'US', sales: '30k', change: '+25.8%', isPositive: true },
    { flag: '🇧🇷', name: 'Brazil', sales: '30k', change: '-15.8%', isPositive: false },
    { flag: '🇦🇺', name: 'Australia', sales: '25k', change: '+35.8%', isPositive: true },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-slate-800">Sales by Country</h4>
        <span className="text-[11px] text-slate-400 font-semibold uppercase">Sales</span>
      </div>

      <div className="space-y-3">
        {countries.map((c) => (
          <div key={c.name} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <span className="text-lg">{c.flag}</span>
              <div>
                <span className="font-bold text-slate-800 block">{c.sales}</span>
                <span className="text-[10px] text-slate-400">{c.name}</span>
              </div>
            </div>
            <span
              className={`font-semibold text-xs ${
                c.isPositive ? 'text-emerald-600' : 'text-red-500'
              }`}
            >
              {c.change}
            </span>
          </div>
        ))}
      </div>

      <button className="w-full text-center text-xs font-semibold text-emerald-600 hover:bg-emerald-50 py-1.5 rounded-xl border border-emerald-200 transition">
        View Insight
      </button>
    </div>
  );
}
