'use client';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const data = [
  { name: 'Mon', risk: 12, safe: 88, accidents: 0 },
  { name: 'Tue', risk: 18, safe: 82, accidents: 1 },
  { name: 'Wed', risk: 8, safe: 92, accidents: 0 },
  { name: 'Thu', risk: 22, safe: 78, accidents: 2 },
  { name: 'Fri', risk: 15, safe: 85, accidents: 0 },
  { name: 'Sat', risk: 35, safe: 65, accidents: 1 },
  { name: 'Sun', risk: 28, safe: 72, accidents: 3 },
];

export function BehaviorChart() {
  return (
    <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 p-6 h-[400px] hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-bold text-lg text-slate-800">Weekly Safety Trend</h3>
          <p className="text-slate-500 text-sm">Risk Score vs Safety Index monitoring</p>
        </div>
        <select className="bg-slate-50 border border-slate-200 text-slate-600 text-sm rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-100">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>
      
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorSafe" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="name" 
            stroke="#94a3b8" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12 }} 
            dy={10} 
          />
          <YAxis 
            stroke="#94a3b8" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12 }} 
            dx={-10} 
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '12px', 
              border: 'none', 
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
              padding: '12px'
            }}
            itemStyle={{ fontSize: '12px', fontWeight: 600 }}
            labelStyle={{ color: '#64748b', marginBottom: '8px', fontSize: '12px' }}
          />
          <Area 
            type="monotone" 
            dataKey="risk" 
            stroke="#ef4444" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorRisk)" 
            name="Risk Score" 
          />
          <Area 
            type="monotone" 
            dataKey="safe" 
            stroke="#10b981" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorSafe)" 
            name="Safety Index" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
