'use client';

import { useRealTimeData } from '@/hooks/useRealTimeData';
import { 
  Siren, 
  MapPin, 
  Phone, 
  Activity, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Radio,
  Navigation,
  ShieldAlert 
} from 'lucide-react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

export default function EmergencyPanel() {
  const { alerts } = useRealTimeData();
  const [selectedAlertId, setSelectedAlertId] = useState(null);
  const [incidentState, setIncidentState] = useState({}); // { [id]: 'NEW' | 'DISPATCHED' | 'ON_SCENE' | 'RESOLVED' }

  // Select first alert automatically if none selected
  useEffect(() => {
    if (alerts.length > 0 && !selectedAlertId) {
      setSelectedAlertId(alerts[0].id);
    }
  }, [alerts, selectedAlertId]);

  const activeAlert = alerts.find(a => a.id === selectedAlertId) || alerts[0];
  const currentState = activeAlert ? (incidentState[activeAlert.id] || 'NEW') : 'NEW';

  const handleAction = (id, action) => {
    setIncidentState(prev => ({
      ...prev,
      [id]: action
    }));
  };

  const steps = [
    { id: 'NEW', label: 'Incident Reported', icon: Siren },
    { id: 'DISPATCHED', label: 'Units Dispatched', icon: ArrowRight },
    { id: 'ON_SCENE', label: 'Responders Arrived', icon: Navigation },
    { id: 'RESOLVED', label: 'Incident Cleared', icon: CheckCircle2 },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentState);

  return (
    <div className="h-[calc(100vh-100px)] max-h-[900px] flex gap-6 p-2 max-w-[1600px] mx-auto">
      {/* LEFT: Incident Feed */}
      <div className="w-1/3 flex flex-col gap-4">
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl border border-slate-800 flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold flex items-center gap-3">
                    <Siren className="text-red-500 animate-pulse" />
                    Emergency Dispatch
                </h1>
                <p className="text-slate-400 text-sm mt-1">SafeCity Response Grid • Sector 4</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-red-900/30 border border-red-500/30 rounded-full text-xs font-mono text-red-400">
                <Radio size={12} className="animate-pulse" /> LIVE
            </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
             <h3 className="font-bold text-slate-700">Incoming Feed</h3>
             <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded-md font-bold">{alerts.length} Active</span>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
            {alerts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center opacity-60">
                    <ShieldAlert size={48} className="mb-4" />
                    <p>No active incidents reported.</p>
                    <p className="text-sm">Monitoring network sensors...</p>
                </div>
            ) : (
                alerts.map(alert => (
                    <button
                        key={alert.id}
                        onClick={() => setSelectedAlertId(alert.id)}
                        className={clsx(
                            "w-full text-left p-4 rounded-xl border transition-all duration-200 group relative overflow-hidden",
                            selectedAlertId === alert.id 
                                ? "bg-slate-900 border-slate-800 text-white shadow-lg" 
                                : "bg-white border-slate-100 hover:border-slate-300 hover:shadow-md text-slate-600"
                        )}
                    >
                        {/* Progress Bar for priority */}
                        {alert.severity === 'CRITICAL' && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                        )}
                        
                        <div className="flex justify-between items-start mb-2 pl-3">
                            <span className={clsx(
                                "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                                selectedAlertId === alert.id ? "bg-red-500 text-white" : "bg-red-100 text-red-600"
                            )}>
                                {alert.type}
                            </span>
                            <span className="text-xs font-mono opacity-60">
                                {new Date(alert.timestamp).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                            </span>
                        </div>
                        <div className="pl-3">
                            <div className={clsx("font-bold text-sm mb-1", selectedAlertId === alert.id ? "text-white" : "text-slate-800")}>
                                {alert.location}
                            </div>
                            <div className="text-xs opacity-70 flex items-center gap-2">
                                <span className="font-mono">ID: {alert.driverId}</span>
                                <span>•</span>
                                <span>{incidentState[alert.id] || 'NEW'}</span>
                            </div>
                        </div>
                    </button>
                ))
            )}
          </div>
        </div>
      </div>

      {/* RIGHT: Incident Command Center */}
      <div className="w-2/3 flex flex-col">
        {activeAlert ? (
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex-1 flex flex-col">
                {/* Header */}
                <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-800 mb-2">Incident #{activeAlert.id.slice(-4)}</h2>
                            <div className="flex items-center gap-4 text-sm text-slate-500">
                                <span className="flex items-center gap-1"><Clock size={16} /> Time: {new Date(activeAlert.timestamp).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                                <span className="flex items-center gap-1"><MapPin size={16} /> {activeAlert.location}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Priority Level</div>
                            <div className="text-2xl font-black text-red-600 flex items-center gap-2 justify-end">
                                <Activity className="animate-pulse" />
                                {activeAlert.severity}
                            </div>
                        </div>
                    </div>

                    {/* Stepper */}
                    <div className="relative flex items-center justify-between mt-8 px-4">
                        {/* Connecting Line */}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 -z-10"></div>
                        <div 
                            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-500 -z-10 transition-all duration-500"
                            style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                        ></div>

                        {steps.map((step, idx) => {
                             const isCompleted = idx <= currentStepIndex;
                             const isCurrent = idx === currentStepIndex;
                             return (
                                <div key={step.id} className="flex flex-col items-center gap-2 bg-white px-2">
                                    <div className={clsx(
                                        "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                                        isCompleted ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-slate-200 text-slate-300",
                                        isCurrent && "ring-4 ring-blue-100 scale-110"
                                    )}>
                                        <step.icon size={18} />
                                    </div>
                                    <span className={clsx(
                                        "text-xs font-bold uppercase",
                                        isCompleted ? "text-blue-700" : "text-slate-300"
                                    )}>{step.label}</span>
                                </div>
                             );
                        })}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-8 bg-slate-50/30">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Activity size={18} className="text-slate-400" />
                                Live Telemetry
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-red-50 rounded-lg border border-red-100 text-center">
                                    <div className="text-xs text-red-400 font-bold uppercase mb-1">Impact G-Force</div>
                                    <div className="text-2xl font-mono font-bold text-red-600">8.4g</div>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-center">
                                    <div className="text-xs text-slate-400 font-bold uppercase mb-1">Vehicle Velocity</div>
                                    <div className="text-2xl font-mono font-bold text-slate-700">0 km/h</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                             <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Phone size={18} className="text-slate-400" />
                                Emergency Contacts
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">FM</div>
                                        <div>
                                            <p className="font-bold text-sm text-slate-700">Family Member</p>
                                            <p className="text-xs text-slate-400">+91 98765 43210</p>
                                        </div>
                                    </div>
                                    <button className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-md font-bold text-slate-600 hover:text-blue-600">Call</button>
                                </div>
                                <div className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">INS</div>
                                        <div>
                                            <p className="font-bold text-sm text-slate-700">Insurance</p>
                                            <p className="text-xs text-slate-400">Policy #7788-99</p>
                                        </div>
                                    </div>
                                    <button className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-md font-bold text-slate-600 hover:text-blue-600">Notify</button>
                                </div>
                            </div>
                        </div>
                    </div>

                        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm h-full flex flex-col">
                             <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Navigation size={18} className="text-slate-400" />
                                Response Actions
                            </h3>
                            
                            <div className="space-y-4 flex-1">
                                <button 
                                    disabled={currentState !== 'NEW'}
                                    onClick={() => handleAction(activeAlert.id, 'DISPATCHED')}
                                    className="w-full p-4 rounded-xl border border-blue-100 bg-blue-50 text-left hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-blue-900">Dispatch Ambulance</span>
                                        <ArrowRight size={16} className="text-blue-500 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                    <p className="text-xs text-blue-600">Notify nearest EMS unit (Apollo Hospital, 2.4km)</p>
                                </button>

                                <button 
                                     disabled={currentState !== 'DISPATCHED'}
                                     onClick={() => handleAction(activeAlert.id, 'ON_SCENE')}
                                     className="w-full p-4 rounded-xl border border-amber-100 bg-amber-50 text-left hover:bg-amber-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-amber-900">Confirm Arrival</span>
                                        <ArrowRight size={16} className="text-amber-500 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                    <p className="text-xs text-amber-600">Verify responders have reached location</p>
                                </button>

                                <button 
                                     disabled={currentState !== 'ON_SCENE'}
                                     onClick={() => handleAction(activeAlert.id, 'RESOLVED')}
                                     className="w-full p-4 rounded-xl border border-emerald-100 bg-emerald-50 text-left hover:bg-emerald-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-emerald-900">Resolve Incident</span>
                                        <CheckCircle2 size={16} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <p className="text-xs text-emerald-600">Close ticket and generate report</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="flex-1 bg-slate-50 border border-slate-200 border-dashed rounded-2xl flex items-center justify-center text-slate-400">
                <div className="text-center">
                    <Siren size={64} className="mx-auto mb-4 opacity-20" />
                    <p>Select an incident to view details and manage response.</p>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
