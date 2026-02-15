'use client';

import { Car, AlertTriangle, Navigation, Layers, ZoomIn, ZoomOut } from 'lucide-react';

export function LiveMap({ drivers }) {
  return (
    <div className="relative w-full h-[600px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 shadow-2xl group">
      {/* Map Background Simulation */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/77.5946,12.9716,13,0,0/800x600?access_token=pk.eyJ1IjoidGVtcCIsImEiOiJjemZ4In0.temp')] bg-cover bg-center opacity-80 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 to-slate-900/60 pointer-events-none" />
        
        {/* Placeholder for when image doesn't load/no token */}
        <div className="w-full h-full bg-[#1a1d24] flex items-center justify-center opacity-50">
             <div className="grid grid-cols-12 grid-rows-12 w-full h-full gap-0.5 opacity-20">
                {Array.from({ length: 144 }).map((_, i) => (
                    <div key={i} className="bg-slate-700/30"></div>
                ))}
            </div>
        </div>
      </div>
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        <button className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md p-2 rounded-lg shadow-lg border border-white/10 transition-colors">
            <Layers size={20} />
        </button>
        <div className="flex flex-col bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-white/10 overflow-hidden">
            <button className="p-2 text-white hover:bg-white/20 border-b border-white/10"><ZoomIn size={20} /></button>
            <button className="p-2 text-white hover:bg-white/20"><ZoomOut size={20} /></button>
        </div>
      </div>

      <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-white/20 flex items-center gap-3">
        <div className="relative">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute inset-0 opacity-75"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full relative block"></span>
        </div>
        <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Live Monitoring</p>
            <p className="text-sm font-bold text-slate-800">{drivers.length} Vehicles Active</p>
        </div>
      </div>

      {drivers.map((driver) => (
        <div
          key={driver.id}
          className="absolute z-10 transition-all duration-[1000ms] ease-linear flex flex-col items-center group/marker cursor-pointer"
          style={{
            // Simple projection for demo: lat/lng to %
            // Center roughly at 12.97, 77.59 (Bangalore)
            // Scaling tweaked for better spread
            left: `${50 + (driver.lng - 77.5946) * 1000}%`, 
            top: `${50 - (driver.lat - 12.9716) * 1000}%`,
          }}
        >
          <div className={`
            p-2 rounded-full shadow-lg transform group-hover/marker:scale-125 transition-all duration-300 relative
            ${driver.status === 'ACCIDENT' ? 'bg-red-600 text-white shadow-red-500/50 z-50' : 
              driver.status === 'DANGER' ? 'bg-orange-500 text-white shadow-orange-500/50 z-40' :
              driver.status === 'WARNING' ? 'bg-yellow-400 text-black shadow-yellow-400/50 z-30' :
              'bg-blue-600 text-white shadow-blue-600/50 z-20'}
          `}>
            {driver.status === 'ACCIDENT' && <span className="absolute -inset-4 rounded-full border-4 border-red-500/30 animate-ping"></span>}
            {driver.status === 'ACCIDENT' ? <AlertTriangle size={18} fill="currentColor" /> : <Navigation size={18} fill="currentColor" className="transform rotate-45" />}
          </div>
          
          {/* Tooltip Card */}
          <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 group-hover/marker:opacity-100 transition-all duration-300 pointer-events-none transform translate-y-2 group-hover/marker:translate-y-0">
             <div className="bg-white/95 backdrop-blur rounded-xl shadow-xl p-3 border border-slate-100 min-w-[140px] text-xs">
                <div className="flex justify-between items-center mb-1 pb-1 border-b border-slate-100">
                    <span className="font-bold text-slate-800">{driver.vehicleNo}</span>
                    <span className={`w-2 h-2 rounded-full ${driver.status === 'SAFE' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                </div>
                <div className="space-y-1 text-slate-600">
                    <div className="flex justify-between"><span>Speed:</span> <span className="font-mono font-bold">{Math.round(driver.speed)} km/h</span></div>
                    <div className="flex justify-between"><span>Risk:</span> <span className={`font-bold ${driver.riskScore > 50 ? 'text-red-500' : 'text-green-600'}`}>{driver.riskScore}/100</span></div>
                </div>
             </div>
             {/* Arrow */}
             <div className="w-3 h-3 bg-white transform rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2"></div>
          </div>
        </div>
      ))}

      {/* Legend */}
      <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-xl border border-white/20 flex flex-wrap justify-center gap-6 text-xs font-medium pointer-events-auto mx-auto max-w-fit">
            <div className="flex items-center gap-2 text-slate-700">
                <span className="w-3 h-3 rounded-full bg-blue-600 shadow-sm"></span> Safe
            </div>
            <div className="flex items-center gap-2 text-slate-700">
                <span className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm"></span> Warning
            </div>
            <div className="flex items-center gap-2 text-slate-700">
                <span className="w-3 h-3 rounded-full bg-orange-500 shadow-sm"></span> Danger
            </div>
            <div className="flex items-center gap-2 text-slate-700">
                <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse shadow-sm"></span> Accident
            </div>
        </div>
      </div>
    </div>
  );
}
