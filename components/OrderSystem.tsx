
import React, { useState } from 'react';
import { MenuItem, OrderItem, Order } from '../types';

interface Props {
  menu: MenuItem[];
  addOrder: (order: Order) => void;
}

export const OrderSystem: React.FC<Props> = ({ menu, addOrder }) => {
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [table, setTable] = useState('1');
  const [filter, setFilter] = useState('همه');

  const categories = ['همه', ...Array.from(new Set(menu.map(m => m.category)))];

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const submitOrder = () => {
    if (cart.length === 0) return;
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      tableNumber: table,
      items: [...cart],
      status: 'pending',
      timestamp: new Date(),
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
    addOrder(newOrder);
    setCart([]);
  };

  const filteredMenu = filter === 'همه' ? menu : menu.filter(m => m.category === filter);

  return (
    <div className="flex flex-col lg:flex-row gap-10 h-full animate-fadeIn">
      {/* Menu Area */}
      <div className="flex-1 flex flex-col gap-8 overflow-hidden">
        <div className="flex items-center justify-between">
           <div>
             <h2 className="text-3xl font-black text-slate-800 tracking-tight">منوی سفارشات</h2>
             <p className="text-slate-500">انتخاب سریع از آیتم‌های فست فود</p>
           </div>
           <div className="flex gap-2 bg-slate-100 p-2 rounded-[2rem]">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-3xl text-xs font-black transition-all ${
                  filter === cat 
                    ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/20' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 overflow-y-auto pb-10 pr-2 custom-scrollbar">
          {filteredMenu.map(item => (
            <div 
              key={item.id} 
              onClick={() => addToCart(item)}
              className="bg-white rounded-[2.5rem] p-5 shadow-sm border border-slate-100 flex flex-col gap-4 cursor-pointer hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 group"
            >
              <div className="relative h-44 overflow-hidden rounded-3xl">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                  <span className="bg-white text-slate-900 font-black p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all scale-50 group-hover:scale-100">+</span>
                </div>
              </div>
              <div className="flex flex-col flex-1">
                <h4 className="font-black text-slate-800 text-lg truncate">{item.name}</h4>
                <p className="text-slate-400 text-xs mt-1 uppercase font-bold tracking-widest">{item.category}</p>
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <p className="text-amber-600 font-black">{item.price.toLocaleString()} <span className="text-[10px] text-slate-400">تومان</span></p>
                  <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 font-bold group-hover:bg-amber-100 group-hover:text-amber-600 transition-all">+</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Area */}
      <div className="w-full lg:w-[26rem] bg-white rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100 flex flex-col overflow-hidden sticky top-0">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <h3 className="text-2xl font-black text-slate-800">میز {table}</h3>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">انتخاب میز:</span>
            <input 
              type="number" 
              value={table} 
              onChange={e => setTable(e.target.value)}
              className="w-12 text-center bg-white border border-slate-200 rounded-2xl p-2 font-black text-amber-600 outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-200 py-10">
              <span className="text-7xl mb-6">🥡</span>
              <p className="font-black text-slate-300">لیست سفارشات خالی است</p>
            </div>
          ) : cart.map(item => (
            <div key={item.id} className="flex items-center gap-4 animate-slideIn">
              <img src={item.image} className="w-16 h-16 rounded-2xl object-cover shadow-sm" />
              <div className="flex-1 min-w-0">
                <h5 className="text-sm font-black text-slate-800 truncate">{item.name}</h5>
                <p className="text-amber-500 text-xs font-bold mt-1">{(item.price * item.quantity).toLocaleString()} تومان</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 flex items-center justify-center bg-slate-100 rounded-lg hover:bg-amber-100 hover:text-amber-600 transition-all text-xs font-bold">+</button>
                <span className="text-xs font-black w-6 text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 flex items-center justify-center bg-slate-100 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all text-xs font-bold">-</button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-100 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-slate-400 text-xs font-bold">
              <span>تعداد کل آیتم‌ها:</span>
              <span className="text-slate-700">{cart.reduce((s, i) => s + i.quantity, 0)}</span>
            </div>
            <div className="flex justify-between items-center text-slate-800 text-2xl font-black">
              <span>مجموع:</span>
              <div className="flex items-baseline gap-1">
                <span>{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}</span>
                <span className="text-[10px] font-bold text-slate-400">تومان</span>
              </div>
            </div>
          </div>
          <button 
            disabled={cart.length === 0}
            onClick={submitOrder}
            className={`w-full py-6 rounded-[2rem] font-black text-lg shadow-2xl transition-all ${
              cart.length === 0 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                : 'bg-amber-500 text-slate-900 shadow-amber-500/30 hover:bg-amber-600 hover:scale-[1.02] active:scale-95'
            }`}
          >
            تایید و چاپ فیش
          </button>
        </div>
      </div>
    </div>
  );
};
