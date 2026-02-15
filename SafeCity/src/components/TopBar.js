'use client';
import { usePathname } from 'next/navigation';
import { Bell, Search, ChevronDown, Menu } from 'lucide-react';
import Link from 'next/link';
import login from '../app/login/page';

export function TopBar() {
  const pathname = usePathname();
  const title = pathname === '/' ? 'Dashboard' : pathname.replace('/', '').charAt(0).toUpperCase() + pathname.replace('/', '').slice(1);

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] sticky top-0 z-40 mx-6 mt-4 mb-8 flex items-center justify-between rounded-2xl px-8 transition-all duration-300">
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-500">
            <Menu size={24} />
        </button>
        <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h2>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <span className="hover:text-blue-600 cursor-pointer">Home</span>
                <span>/</span>
                <span className="text-blue-600">{title}</span>
            </div>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 rounded-full px-4 py-2 w-64 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-300 transition-all">
            <Search className="text-slate-400 w-4 h-4 mr-2" />
            <input 
                type="text" 
                placeholder="Search drivers, alerts..." 
                className="bg-transparent border-none outline-none text-sm text-slate-700 w-full placeholder:text-slate-400"
            />
        </div>

        <button className="relative p-2 rounded-full hover:bg-slate-100 transition-colors group">
          <Bell className="text-slate-500 w-6 h-6 group-hover:text-slate-700 transition-colors" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-slate-800">Admin User</p>
            <p className="text-xs text-slate-500">System Administrator</p>
          </div>
         <Link href = "/login"> <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30 cursor-pointer hover:scale-105 transition-transform">
            AD
          </div></Link> 
          <button className="text-slate-400 hover:text-slate-600"><ChevronDown size={16} /></button>
        </div>
      </div>
    </header>
  );
}
