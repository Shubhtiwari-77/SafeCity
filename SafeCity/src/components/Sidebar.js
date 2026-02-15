'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Car, Ambulance, BarChart3, Settings, LogOut } from 'lucide-react';
import { ShieldAlert } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Driver Panel', href: '/driver', icon: Car },
  { name: 'Emergency', href: '/emergency', icon: Ambulance },
  { name: 'Analytics', href: '/admin', icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen fixed left-0 top-0 overflow-hidden shadow-2xl z-50">
      <div className="p-8 border-b border-slate-800/50 flex flex-col items-center">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center -rotate-3 mb-4 shadow-lg shadow-blue-500/20">
          <ShieldAlert className="text-white" size={28} strokeWidth={2.5} />
        </div>
        <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-tight">SafeCity</h1>
        <p className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-widest">AI Safety Platform</p>
      </div>
      
      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'group flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200',
                isActive 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-900/50 translate-x-1' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white hover:translate-x-1'
              )}
            >
              <item.icon size={20} className={clsx("transition-transform group-hover:scale-110", isActive && "animate-pulse-slow")} />
              <span className="font-semibold text-sm">{item.name}</span>
              {isActive && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full shadow-glow"></div>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mx-4 mb-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:bg-slate-700 hover:text-white transition-all text-sm font-medium mb-1">
          <Settings size={18} /> Settings
        </button>
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-rose-400 hover:bg-rose-900/20 hover:text-rose-300 transition-all text-sm font-medium">
          <LogOut size={18} /> Logout
        </button>
      </div>
      
      <div className="px-8 pb-6 text-[10px] text-slate-600 text-center font-mono">
        ver 2.4.0 (Build 892)
      </div>
    </aside>
  );
}
