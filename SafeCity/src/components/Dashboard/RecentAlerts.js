'use client';

import { AlertTriangle, Clock, MapPin, ExternalLink, ShieldAlert, X, Video } from 'lucide-react';
import clsx from 'clsx';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function RecentAlerts({ alerts }) {
  const [cameraOpen, setCameraOpen] = useState(null);
  const router = useRouter();

  const handleTakeAction = (alertId) => {
    // Navigate to emergency panel
    router.push('/emergency');
  };

  return (
    <>
      {/* Camera Feed Modal */}
      {cameraOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl relative">
              <button 
                onClick={() => setCameraOpen(null)}
                className="absolute top-4 right-4 z-10 bg-slate-900/50 hover:bg-slate-800 text-white p-2 rounded-full backdrop-blur-md transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="relative aspect-video bg-black group relative overflow-hidden">
                {/* Real-looking Surveillance Feed Pattern */}
                <img 
                    src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmZoeXMyZ3I5M3J6bmZoeXMyZ3I5M3J6bmZoeXMyZ3I5M3J6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKrEzvJbsQNovUA/giphy.gif" 
                    alt="Live Traffic Feed" 
                    className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
                
                {/* Scanning Line Animation */}
                <div className="absolute inset-0 bg-green-500/10 h-1 w-full animate-[scan_3s_linear_infinite] opacity-20 pointer-events-none"></div>

                {/* Simulated Camera UI Overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600/90 backdrop-blur text-white px-3 py-1 rounded-md text-xs font-bold animate-pulse shadow-lg shadow-red-900/50">
                    <div className="w-2 h-2 bg-white rounded-full"></div> REC • LIVE
                </div>
                
                <div className="absolute top-4 right-4 font-mono text-green-400 text-xs bg-black/50 px-2 py-1 rounded backdrop-blur border border-green-500/30">
                    CAM-{cameraOpen.id.slice(-4)} • ISO 800 • 30FPS
                </div>

                <div className="absolute bottom-4 left-4 text-xs font-mono text-white/90 bg-black/60 px-3 py-2 rounded-lg backdrop-blur border border-white/10">
                    <div className="flex items-center gap-4">
                        <span>LAT: 12.9716 N</span>
                        <span>LNG: 77.5946 E</span>
                        <span className="text-yellow-400">VEHICLE DETECTED</span>
                    </div>
                </div>
                
                {/* Target Reticle on "Vehicle" */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-red-500/50 rounded-lg flex items-center justify-center animate-pulse">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-red-500 -mt-1 -ml-1"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-red-500 -mt-1 -mr-1"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-red-500 -mb-1 -ml-1"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-red-500 -mb-1 -mr-1"></div>
                    <div className="bg-red-500/20 text-red-100 text-[10px] font-bold px-1 absolute -bottom-6">
                        TARGET: {cameraOpen.driverId}
                    </div>
                </div>
              </div>
              
              <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-between items-center">
                 <div className="text-slate-400 text-sm">
                    Location: <span className="text-white font-bold">{cameraOpen.location}</span>
                 </div>
                 <button 
                    onClick={() => { setCameraOpen(null); handleTakeAction(cameraOpen.id); }}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                 >
                    Dispatch Unit
                 </button>
              </div>
           </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 flex flex-col h-full lg:h-[600px] overflow-hidden">
        <div className="p-6 border-b border-slate-100/80 bg-slate-50/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
              <div className="p-2 bg-rose-100 rounded-lg"><AlertTriangle className="text-rose-600" size={20} /></div>
              Recent Alerts
              </h3>
              <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </span>
          </div>
          <p className="text-sm text-slate-500">Live feed from sensor network</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {alerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
              <div className="p-4 bg-slate-50 rounded-full"><ShieldAlert size={48} className="text-slate-300" /></div>
              <p className="font-medium">No active threats detected.</p>
            </div>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className={clsx(
                  "group relative p-5 rounded-xl border transition-all duration-300 hover:shadow-md cursor-pointer overflow-hidden",
                  alert.severity === 'CRITICAL' ? 'bg-rose-50/50 border-rose-200 hover:border-rose-300' :
                  alert.severity === 'HIGH' ? 'bg-orange-50/50 border-orange-200 hover:border-orange-300' :
                  'bg-amber-50/50 border-amber-200 hover:border-amber-300'
                )}
              >
                {/* Status Indicator Bar */}
                <div className={clsx(
                    "absolute left-0 top-0 bottom-0 w-1.5",
                    alert.severity === 'CRITICAL' ? 'bg-rose-500' :
                    alert.severity === 'HIGH' ? 'bg-orange-500' :
                    'bg-amber-500'
                )}></div>

                <div className="flex justify-between items-start mb-3 pl-2">
                  <span className={clsx(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border",
                    alert.severity === 'CRITICAL' ? 'bg-white border-rose-200 text-rose-700' :
                    alert.severity === 'HIGH' ? 'bg-white border-orange-200 text-orange-700' :
                    'bg-white border-amber-200 text-amber-700'
                  )}>
                    {alert.type.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1 bg-white px-2 py-1 rounded-md border border-slate-100">
                    <Clock size={12} />
                    {alert.timestamp.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                
                <div className="pl-2"> 
                  <div className="text-sm font-bold text-slate-800 mb-1 flex items-center gap-2">
                      vehicle {alert.driverId}
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-1.5 mb-4">
                      <MapPin size={12} /> {alert.location}
                  </div>
                  
                  <div className="flex gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button 
                          onClick={(e) => { e.stopPropagation(); setCameraOpen(alert); }}
                          className="flex-1 text-xs bg-white border border-slate-200 text-slate-600 px-3 py-2 rounded-lg font-medium hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800 transition-colors shadow-sm flex items-center justify-center gap-1"
                      >
                          <ExternalLink size={12} /> Camera
                      </button>
                      <button 
                          onClick={(e) => { e.stopPropagation(); handleTakeAction(alert.id); }}
                          className={clsx(
                              "flex-1 text-xs text-white px-3 py-2 rounded-lg font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1", 
                              alert.severity === 'CRITICAL' ? 'bg-rose-600 hover:bg-rose-700' : 'bg-blue-600 hover:bg-blue-700'
                          )}
                      >
                      Take Action
                      </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
