'use client';

import { useState, useEffect } from 'react';

const INITIAL_DRIVERS = [
  { id: 'D001', name: 'John Doe', vehicleNo: 'KA-01-AB-1234', lat: 12.9716, lng: 77.5946, speed: 45, riskScore: 12, status: 'SAFE', lastUpdate: new Date() },
  { id: 'D002', name: 'Jane Smith', vehicleNo: 'MH-02-CD-5678', lat: 12.9816, lng: 77.5846, speed: 65, riskScore: 45, status: 'WARNING', lastUpdate: new Date() },
  { id: 'D003', name: 'Mike Johnson', vehicleNo: 'DL-03-EF-9012', lat: 12.9616, lng: 77.6046, speed: 0, riskScore: 88, status: 'ACCIDENT', lastUpdate: new Date() },
];

export function useRealTimeData() {
  const [drivers, setDrivers] = useState(INITIAL_DRIVERS);
  const [alerts, setAlerts] = useState([
    {
      id: 'A001',
      driverId: 'D003',
      type: 'ACCIDENT',
      severity: 'CRITICAL',
      location: 'MG Road, Bangalore',
      timestamp: new Date(),
      status: 'NEW'
    }
  ]);

  // Handle incoming live data from Driver App
  useEffect(() => {
    const bc = new BroadcastChannel('safecity_fleet');
    
    bc.onmessage = (event) => {
      const { type, payload } = event.data;
      
      if (type === 'TELEMETRY') {
        setDrivers(prev => {
           const exists = prev.find(d => d.id === payload.id);
           if (exists) {
             return prev.map(d => d.id === payload.id ? { ...d, ...payload, lastUpdate: new Date() } : d);
           }
           // Add new live driver if not exists
           return [...prev, {
             ...payload,
             name: 'LIVE DEMO CAR',
             vehicleNo: 'DEMO-8888',
             riskScore: 0,
             lastUpdate: new Date()
           }];
        });
      }
      
      if (type === 'ALERT') {
        const newAlert = {
            ...payload,
            timestamp: new Date(payload.timestamp) // Rehydrate date
        };
        setAlerts(prev => [newAlert, ...prev]);
        
        // Find and update the driver status immediately
        setDrivers(prev => prev.map(d => 
            d.id === payload.driverId ? { ...d, status: 'ACCIDENT', speed: 0 } : d
        ));
      }
    };

    return () => bc.close();
  }, []);

  // Simulate real-time updates for OTHER drivers
  useEffect(() => {
    const interval = setInterval(() => {
      setDrivers(prev => prev.map(driver => {
        // Randomly update speed and position slightly
        const speedChange = Math.floor(Math.random() * 20) - 10; // Increased variation
        let newSpeed = Math.max(0, Math.min(120, driver.speed + speedChange));
        
        let newStatus = driver.status;
        
        // Simple logic for status update
        if (newSpeed > 80) newStatus = 'DANGER';
        else if (newSpeed > 60) newStatus = 'WARNING';
        else if (driver.status === 'ACCIDENT') newStatus = 'ACCIDENT'; // Keep accident state
        else newStatus = 'SAFE';

        return {
          ...driver,
          speed: newSpeed,
          // Increased movement range for visibility (0.001 instead of 0.0001)
          lat: driver.lat + (Math.random() - 0.5) * 0.002, 
          lng: driver.lng + (Math.random() - 0.5) * 0.002,
          status: newStatus,
          lastUpdate: new Date()
        };
      }));
    }, 1000); // Faster updates (1s vs 2s)

    return () => clearInterval(interval);
  }, []);

  const addAlert = (alert) => {
    setAlerts(prev => [alert, ...prev]);
  };

  return { drivers, alerts };
}
