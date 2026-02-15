'use client';

import { useRealTimeData } from '@/hooks/useRealTimeData';
import { StatsGrid } from '@/components/Dashboard/StatsGrid';
import { LiveMap } from '@/components/Dashboard/LiveMap';
import { RecentAlerts } from '@/components/Dashboard/RecentAlerts';
import { BehaviorChart } from '@/components/Dashboard/BehaviorChart';
import { Wifi, RefreshCw, Layers, Siren } from 'lucide-react';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { drivers, alerts } = useRealTimeData();
  const [emergencyModal, setEmergencyModal] = useState(null);

  // Watch for new critical alerts
  useEffect(() => {
    if (alerts.length > 0 && alerts[0].status === 'NEW' && alerts[0].severity === 'CRITICAL') {
        const latestAlert = alerts[0];
        // Only show if it's recent (within last 5 seconds)
        if (new Date().getTime() - new Date(latestAlert.timestamp).getTime() < 5000) {
            setEmergencyModal(latestAlert);
        }
    }
  }, [alerts]);

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-8 relative">
      {/* Emergency Modal Overlay */}
      {emergencyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-300 border-4 border-red-500">
                <div className="bg-red-600 p-6 text-white text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-white animate-pulse"></div>
                    <Siren className="mx-auto w-16 h-16 mb-4 animate-bounce" />
                    <h2 className="text-3xl font-black uppercase tracking-widest">CRITICAL ALERT</h2>
                    <p className="font-mono text-red-100">ACCIDENT DETECTED • IMMEDIATE ACTION REQUIRED</p>
                </div>
                <div className="p-8 space-y-6">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                        <span className="text-slate-500 font-bold uppercase text-xs">Vehicle ID</span>
                        <span className="font-mono text-xl font-bold text-slate-900">{emergencyModal.driverId}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                        <span className="text-slate-500 font-bold uppercase text-xs">Location</span>
                        <span className="font-bold text-slate-800 text-right">{emergencyModal.location}</span>
                    </div>
                     <div className="flex justify-between items-center pb-2">
                        <span className="text-slate-500 font-bold uppercase text-xs">Status</span>
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold border border-red-200 animate-pulse">CONFIRMED IMPACT</span>
                    </div>
                    
                    <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-500 mb-4 border border-slate-100">
                        Automation triggering:
                        <ul className="list-disc pl-4 mt-2 space-y-1">
                            <li>Dispatching nearest First Responder unit...</li>
                            <li>Notifying Emergency Contacts via SMS (SENT)</li>
                            <li>Logging incident to City Transport Grid</li>
                        </ul>
                    </div>

                    <button 
                        onClick={() => setEmergencyModal(null)}
                        className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg text-lg"
                    >
                        ACKNOWLEDGE & DISPATCH
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Header Status */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Mission Control</h1>
          <p className="text-slate-500 text-sm mt-1">Real-time fleet monitoring and incident response system.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full text-xs font-bold text-emerald-700 border border-emerald-100 shadow-sm">
            <Wifi size={14} className="animate-pulse" /> SYSTEM ONLINE
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-xs font-bold text-indigo-700 border border-indigo-100 shadow-sm">
            <RefreshCw size={14} className="animate-spin-slow" /> DATA STREAMING
          </div>
           <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-xs font-bold text-slate-600 border border-slate-200">
            <Layers size={14} /> V2.4.0
          </div>
        </div>
      </div>

      <StatsGrid />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <LiveMap drivers={drivers} />
          <BehaviorChart />
        </div>
        
        <div className="xl:col-span-1 h-full min-h-[500px]">
          <RecentAlerts alerts={alerts} />
        </div>
      </div>
    </div>
  );
}
