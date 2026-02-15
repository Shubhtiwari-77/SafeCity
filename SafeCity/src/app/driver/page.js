'use client';

import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Disc } from 'lucide-react';

export default function DriverPage() {
  const [speed, setSpeed] = useState(0);
  const [status, setStatus] = useState('SAFE');
  const [isDriving, setIsDriving] = useState(false);
  const [gForce, setGForce] = useState(1);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    // Setup communication channel with dashboard
    const bc = new BroadcastChannel('safecity_fleet');
    setChannel(bc);
    return () => bc.close();
  }, []);

  useEffect(() => {
    if (!isDriving) return;

    const interval = setInterval(() => {
      // Simulate natural speed fluctuation
      setSpeed(prev => {
        const change = Math.random() > 0.5 ? 2 : -2;
        return Math.max(0, Math.min(120, prev + change));
      });
      
      // Broadcast current status to dashboard
      channel?.postMessage({
        type: 'TELEMETRY',
        payload: {
          id: 'LIVE-DEMO-001',
          lat: 12.9716, // Static for demo base, can jitter
          lng: 77.5946,
          speed: speed,
          status: status
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isDriving, speed, status, channel]);

  const handleImpact = () => {
    setStatus('ACCIDENT');
    setGForce(8.5); // Spike G-Force
    setSpeed(0); // Immediate stop
    
    // Send immediate alert
    channel?.postMessage({
      type: 'ALERT',
      payload: {
        id: `ALERT-${Date.now()}`,
        driverId: 'LIVE-DEMO-001',
        type: 'ACCIDENT',
        severity: 'CRITICAL',
        location: 'Koramangala, 5th Block',
        timestamp: new Date(),
        status: 'NEW'
      }
    });

    // Reset after demo effect
    setTimeout(() => setGForce(1), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Driver Companion App</h1>
            <p className="text-slate-400 text-sm">Simulating IoT Device / Mobile Sensors</p>
        </div>

        {/* Status Card */}
        <div className={`
            rounded-2xl p-8 border text-center transition-all duration-300
            ${status === 'ACCIDENT' ? 'bg-red-500/10 border-red-500 shadow-[0_0_40px_-5px_rgba(239,68,68,0.3)]' : 'bg-slate-900 border-slate-800'}
        `}>
            <div className={`inline-flex p-4 rounded-full mb-4 ${status === 'ACCIDENT' ? 'bg-red-500 text-white animate-pulse' : 'bg-green-500/10 text-green-500'}`}>
                {status === 'ACCIDENT' ? <AlertTriangle size={48} /> : <Shield size={48} />}
            </div>
            <h2 className="text-4xl font-mono font-bold mb-2">{status}</h2>
            <p className="text-slate-400">System Monitoring Active</p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col items-center">
                <span className="text-slate-400 text-xs uppercase font-bold mb-2">Current Speed</span>
                <span className="text-3xl font-mono font-bold">{speed} <span className="text-sm text-slate-500">km/h</span></span>
            </div>
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col items-center">
                <span className="text-slate-400 text-xs uppercase font-bold mb-2">G-Force</span>
                <span className={`text-3xl font-mono font-bold ${gForce > 2 ? 'text-red-500' : 'text-white'}`}>{gForce.toFixed(1)}g</span>
            </div>
        </div>

        {/* Controls */}
        <div className="space-y-4 pt-8">
            <button 
                onClick={() => { setIsDriving(!isDriving); setStatus('SAFE'); setSpeed(45); }}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${isDriving ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20'}`}
            >
                {isDriving ? 'Pause Trip' : 'Start Trip'}
            </button>
            <button 
                onClick={handleImpact}
                className="w-full py-4 rounded-xl font-bold text-lg bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_-5px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_-5px_rgba(220,38,38,0.6)] transition-all active:scale-95"
            >
                SIMULATE CRASH (DEMO)
            </button>
        </div>
        
        <p className="text-center text-xs text-slate-600">
            Open this page on your phone to simulate the driver app. Keep existing dashboard open in separate tab.
        </p>
      </div>
    </div>
  );
}
