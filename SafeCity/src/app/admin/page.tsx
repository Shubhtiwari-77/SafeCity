'use client';

import { Map, AlertOctagon, TrendingDown, Users } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const cityData = [
  { name: 'Jan', accidents: 45, prevented: 120 },
  { name: 'Feb', accidents: 38, prevented: 135 },
  { name: 'Mar', accidents: 42, prevented: 140 },
  { name: 'Apr', accidents: 30, prevented: 155 },
  { name: 'May', accidents: 25, prevented: 170 },
  { name: 'Jun', accidents: 18, prevented: 190 },
];

const blackspots = [
  { location: 'Silk Board Junction', risk: 'High', incidents: 12 },
  { location: 'Outer Ring Road (Near Bellandur)', risk: 'Medium', incidents: 8 },
  { location: 'MG Road Signal', risk: 'Low', incidents: 3 },
  { location: 'Old Madras Road', risk: 'High', incidents: 10 },
];

export default function AdminPanel() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-indigo-50 p-6 rounded-xl border border-indigo-100">
        <div>
          <h1 className="text-2xl font-bold text-indigo-900">City Safety Analytics</h1>
          <p className="text-indigo-600">Admin Overview & Policy Planning</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg shadow-sm border border-indigo-200 font-medium">Export Report</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Incidents (YTD)', value: '198', change: '-12%', icon: AlertOctagon, color: 'text-red-600 bg-red-100' },
          { label: 'Accidents Prevented', value: '910', change: '+24%', icon: TrendingDown, color: 'text-green-600 bg-green-100' },
          { label: 'Platform Users', value: '5.2k', change: '+8%', icon: Users, color: 'text-blue-600 bg-blue-100' },
          { label: 'High Risk Zones', value: '4', change: '0', icon: Map, color: 'text-orange-600 bg-orange-100' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
             <div>
               <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
               <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
               <span className={`text-xs font-bold ${stat.change.startsWith('-') ? 'text-green-600' : 'text-slate-500'}`}>{stat.change} vs last year</span>
             </div>
             <div className={`p-3 rounded-lg ${stat.color}`}>
               <stat.icon size={24} />
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-bold text-lg text-slate-800 mb-6">Accident Trends vs Prevention</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="accidents" stroke="#ef4444" strokeWidth={3} name="Accidents" />
                <Line type="monotone" dataKey="prevented" stroke="#22c55e" strokeWidth={3} name="Prevented by AI" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-bold text-lg text-slate-800 mb-4">Detected Blackspots</h3>
          <div className="space-y-4">
             {blackspots.map((spot, i) => (
               <div key={i} className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                 <div className="flex justify-between items-start">
                   <h4 className="font-bold text-slate-700">{spot.location}</h4>
                   <span className={`px-2 py-1 text-xs rounded font-bold ${
                     spot.risk === 'High' ? 'bg-red-100 text-red-700' :
                     spot.risk === 'Medium' ? 'bg-orange-100 text-orange-700' :
                     'bg-yellow-100 text-yellow-700'
                   }`}>{spot.risk} Risk</span>
                 </div>
                 <p className="text-slate-500 text-sm mt-1">{spot.incidents} incidents reported</p>
                 <button className="mt-2 text-xs text-blue-600 font-medium hover:underline">View Mitigation Plan</button>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
