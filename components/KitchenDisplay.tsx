
import React from 'react';
import { Order, OrderStatus } from '../types';

interface Props {
  orders: Order[];
  updateStatus: (id: string, status: OrderStatus) => void;
}

export const KitchenDisplay: React.FC<Props> = ({ orders, updateStatus }) => {
  const activeOrders = orders.filter(o => ['pending', 'preparing', 'ready'].includes(o.status));

  return (
    <div className="space-y-10 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 flex items-center gap-4">
            <span className="text-4xl">🔥</span> مانیتورینگ زنده پخت
          </h2>
          <p className="text-slate-500 mt-1">مدیریت زمان پخت و خروجی آشپزخانه</p>
        </div>
        <div className="flex gap-4 bg-slate-100 p-2 rounded-3xl">
          <StatusIndicator label="در انتظار" color="bg-rose-500" />
          <StatusIndicator label="در حال آماده‌سازی" color="bg-amber-500" />
          <StatusIndicator label="آماده تحویل" color="bg-emerald-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {activeOrders.length === 0 ? (
          <div className="col-span-full py-32 bg-white rounded-[3rem] border border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300">
             <span className="text-8xl mb-6 grayscale opacity-20">🍕</span>
             <p className="text-xl font-black">آشپزخانه آرام است...</p>
          </div>
        ) : activeOrders.map(order => (
          <div key={order.id} className={`bg-white rounded-[2.5rem] shadow-sm border-t-[10px] overflow-hidden flex flex-col transition-all hover:shadow-2xl ${
            order.status === 'pending' ? 'border-rose-500' : 
            order.status === 'preparing' ? 'border-amber-500' : 'border-emerald-500'
          }`}>
            <div className="p-8 pb-4 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">شماره میز</span>
                <span className="font-black text-3xl text-slate-800">{order.tableNumber}</span>
              </div>
              <span className="px-4 py-2 bg-slate-50 rounded-2xl text-[10px] font-black text-slate-500">
                {order.timestamp.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            
            <div className="p-8 pt-4 flex-1 space-y-4">
              <div className="h-[1px] bg-slate-100 w-full mb-6"></div>
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center group">
                  <span className="font-bold text-slate-700">{item.name}</span>
                  <span className="bg-slate-50 px-3 py-1.5 rounded-xl text-xs font-black text-slate-500 ring-1 ring-slate-100">×{item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="p-8 bg-slate-50/50 mt-auto">
              {order.status === 'pending' && (
                <button 
                  onClick={() => updateStatus(order.id, 'preparing')}
                  className="w-full py-5 bg-rose-500 text-white rounded-[2rem] font-black shadow-xl shadow-rose-500/20 hover:bg-rose-600 transition-all flex items-center justify-center gap-2"
                >
                  👩‍🍳 شروع پخت
                </button>
              )}
              {order.status === 'preparing' && (
                <button 
                  onClick={() => updateStatus(order.id, 'ready')}
                  className="w-full py-5 bg-amber-500 text-slate-900 rounded-[2rem] font-black shadow-xl shadow-amber-500/20 hover:bg-amber-600 transition-all flex items-center justify-center gap-2"
                >
                  🔔 آماده است!
                </button>
              )}
              {order.status === 'ready' && (
                <button 
                  onClick={() => updateStatus(order.id, 'served')}
                  className="w-full py-5 bg-emerald-500 text-white rounded-[2rem] font-black shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
                >
                  🚀 تحویل گارسون
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatusIndicator = ({ label, color }: { label: string, color: string }) => (
  <div className="flex items-center gap-3 px-4 py-2">
    <span className={`w-3 h-3 rounded-full ${color} shadow-sm ring-2 ring-white`}></span>
    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
  </div>
);
