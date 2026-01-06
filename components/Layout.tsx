
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'پیشخوان', icon: '🏠' },
  { path: '/orders', label: 'سفارش‌گیر', icon: '🛒' },
  { path: '/kitchen', label: 'آشپزخانه', icon: '👨‍🍳' },
  { path: '/inventory', label: 'انبارداری', icon: '📦' },
  { path: '/menu', label: 'مدیریت منو', icon: '🍕' },
  { path: '/staff', label: 'مدیریت تیم', icon: '👥' },
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-slate-50 overflow-hidden font-['Vazirmatn']">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 flex-shrink-0 hidden lg:flex flex-col text-slate-300">
        <div className="p-8 flex items-center gap-3">
          <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-amber-500/20">🍕</div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">سرای پیتزا</h1>
            <p className="text-[10px] uppercase tracking-widest text-amber-500 font-bold">Fast Food Management</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                location.pathname === item.path
                  ? 'bg-amber-500 text-slate-900 font-bold shadow-xl shadow-amber-500/20 translate-x-1'
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className={`text-xl transition-transform duration-300 ${location.pathname === item.path ? 'scale-110' : 'group-hover:scale-110'}`}>
                {item.icon}
              </span>
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-6 mt-auto">
          <div className="bg-slate-800/50 p-4 rounded-3xl border border-slate-700/50 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">م</div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">مازیار ابراهیمی</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold">مدیر ارشد</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-40">
          <div className="lg:hidden flex items-center gap-3">
             <button className="text-2xl p-2 bg-slate-100 rounded-xl">☰</button>
             <h1 className="font-bold text-slate-800">سرای پیتزا</h1>
          </div>
          
          <div className="hidden md:flex items-center bg-slate-100 rounded-2xl px-4 py-2 border border-slate-200">
            <span className="text-slate-400 ml-2">🔍</span>
            <input type="text" placeholder="جستجو در سیستم..." className="bg-transparent border-none outline-none text-sm w-64" />
          </div>

          <div className="flex items-center gap-6">
            <div className="text-left hidden sm:block">
              <p className="text-[10px] font-bold text-slate-400 uppercase text-right">امروز</p>
              <p className="text-sm font-bold text-slate-800">{new Date().toLocaleDateString('fa-IR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
            </div>
            <div className="h-10 w-[1px] bg-slate-200 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <button className="relative p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 transition-all">
                🔔
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 lg:p-12 bg-[#fcfcfd]">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
