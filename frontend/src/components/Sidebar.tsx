'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { clearAuthToken, getStoredUser } from '@/lib/api';
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Ticket,
  Grid,
  CreditCard,
  Award,
  PlusCircle,
  Folder,
  ListFilter,
  Star,
  Shield,
  SlidersHorizontal,
  LogOut,
  ExternalLink,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { User } from '@/types';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function Sidebar({ mobileOpen = false, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const handleLogout = () => {
    clearAuthToken();
    router.push('/login');
  };

  const isActive = (path: string) => pathname === path;

  const content = (
    <div className="w-64 bg-white border-r border-slate-200 min-h-screen flex flex-col justify-between flex-shrink-0 select-none font-sans h-full">
      <div>
        {/* Logo Brand Shell matching Figma */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-emerald-700 tracking-tight flex items-center gap-1">
              DEAL<span className="text-emerald-500 font-extrabold">P⚡RT</span>
            </span>
          </div>

          {/* Close button for mobile */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Sections */}
        <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)]">
          {/* Main Menu */}
          <div>
            <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Main menu
            </p>
            <nav className="space-y-1">
              <Link
                href="/dashboard"
                onClick={onCloseMobile}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive('/dashboard')
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>

              <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 cursor-not-allowed">
                <ShoppingCart className="w-4 h-4" />
                <span>Order Management</span>
              </div>

              <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 cursor-not-allowed">
                <Users className="w-4 h-4" />
                <span>Customers</span>
              </div>

              <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 cursor-not-allowed">
                <Ticket className="w-4 h-4" />
                <span>Coupon Code</span>
              </div>

              <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 cursor-not-allowed">
                <Grid className="w-4 h-4" />
                <span>Categories</span>
              </div>

              <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 cursor-not-allowed">
                <CreditCard className="w-4 h-4" />
                <span>Transaction</span>
              </div>

              <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 cursor-not-allowed">
                <Award className="w-4 h-4" />
                <span>Brand</span>
              </div>
            </nav>
          </div>

          {/* Product Menu */}
          <div>
            <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Product
            </p>
            <nav className="space-y-1">
              <Link
                href="/dashboard/products/add"
                onClick={onCloseMobile}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive('/dashboard/products/add')
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Products</span>
              </Link>

              <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 cursor-not-allowed">
                <Folder className="w-4 h-4" />
                <span>Product Media</span>
              </div>

              <Link
                href="/dashboard/products"
                onClick={onCloseMobile}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive('/dashboard/products')
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <ListFilter className="w-4 h-4" />
                <span>Product List</span>
              </Link>

              <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 cursor-not-allowed">
                <Star className="w-4 h-4" />
                <span>Product Reviews</span>
              </div>
            </nav>
          </div>

          {/* Admin Menu */}
          <div>
            <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Admin
            </p>
            <nav className="space-y-1">
              <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 cursor-not-allowed">
                <Shield className="w-4 h-4" />
                <span>Admin role</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 cursor-not-allowed">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Control Authority</span>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Profile Footer */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-3">
        <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white border border-slate-200">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
              {user?.name?.[0] || 'D'}
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-slate-800 truncate">
                {user?.name || 'Dealport'}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {user?.email || 'Mark@thedesigner...'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Sign Out"
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="flex items-center justify-between text-xs font-bold text-slate-600 hover:text-emerald-600 px-3 py-2 rounded-xl bg-white border border-slate-200 transition"
        >
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 border-2 border-emerald-600 rounded-sm"></div>
            <span>Your Shop</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block h-screen sticky top-0">
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
          />
          <div className="relative z-10">{content}</div>
        </div>
      )}
    </>
  );
}
