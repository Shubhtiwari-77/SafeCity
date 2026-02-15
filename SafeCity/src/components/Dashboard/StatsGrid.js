'use client';

import { Activity, Car, AlertOctagon, TrendingUp } from 'lucide-react';

const stats = [
  { label: 'Total Fleet', value: '2,450', change: '+12%', changeType: 'positive', icon: Car, color: 'text-blue-600 bg-blue-50 border-blue-100' },
  { label: 'Critical Alerts', value: '14', change: '-5%', changeType: 'positive', icon: AlertOctagon, color: 'text-rose-600 bg-rose-50 border-rose-100' },
  { label: 'Driver Safety Index', value: '92%', change: '+2%', changeType: 'positive', icon: Activity, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
  { label: 'Avg Risk Score', value: '18.4', change: '-1.2', changeType: 'positive', icon: TrendingUp, color: 'text-amber-600 bg-amber-50 border-amber-100' },
];

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <div 
          key={idx} 
          className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 flex items-center justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default"
        >
          <div>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">{stat.label}</p>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{stat.value}</h3>
            {stat.change && (
              <div className={`flex items-center gap-1 text-xs mt-2 font-bold ${stat.changeType === 'positive' ? 'text-emerald-600' : 'text-rose-500'}`}>
                <span className={`px-1.5 py-0.5 rounded ${stat.changeType === 'positive' ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                  {stat.change}
                </span>
                <span className="text-slate-400 font-normal ml-1">vs last week</span>
              </div>
            )}
          </div>
          <div className={`p-4 rounded-xl border ${stat.color} shadow-sm`}>
            <stat.icon size={28} strokeWidth={2.5} />
          </div>
        </div>
      ))}
    </div>
  );
}
