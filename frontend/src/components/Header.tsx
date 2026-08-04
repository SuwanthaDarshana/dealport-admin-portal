'use client';

import { useState } from 'react';
import { Search, Bell, Sun, Moon, Menu } from 'lucide-react';
import { getStoredUser } from '@/lib/api';

interface HeaderProps {
  title?: string;
  onOpenMobileMenu?: () => void;
}

export default function Header({ title = 'Dashboard', onOpenMobileMenu }: HeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const user = getStoredUser();

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30 font-sans">
      {/* Left: Mobile Menu Trigger + Page Title */}
      <div className="flex items-center gap-3">
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            aria-label="Open navigation menu"
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <h1 className="text-lg md:text-xl font-bold text-slate-800 tracking-tight">
          {title}
        </h1>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Search Bar matching Figma rounded-full styling */}
        <div className="relative hidden sm:block w-48 md:w-80">
          <input
            type="text"
            placeholder="Search data, users, or reports"
            className="w-full pl-4 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-700 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
          />
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Notification Bell */}
          <button
            aria-label="Notifications"
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full relative transition"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* Theme Toggle Pill */}
          <div
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-11 h-6 bg-emerald-100 rounded-full p-1 cursor-pointer flex items-center transition-colors relative"
          >
            <div
              className={`w-4 h-4 rounded-full bg-emerald-600 shadow-xs transform transition-transform flex items-center justify-center text-white text-[8px] ${
                isDarkMode ? 'translate-x-5 bg-slate-800' : 'translate-x-0'
              }`}
            >
              {isDarkMode ? <Moon className="w-2.5 h-2.5" /> : <Sun className="w-2.5 h-2.5" />}
            </div>
          </div>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              {user?.name?.[0] || 'M'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
