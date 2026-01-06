
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Order, InventoryItem, Insight } from '../types';
import { getSmartInsights } from '../services/geminiService';

const data = [
  { name: 'ش', sales: 4200 },
  { name: 'ی', sales: 3800 },
  { name: 'د', sales: 2900 },
  { name: 'س', sales: 3400 },
  { name: 'چ', sales: 2100 },
  { name: 'پ', sales: 5800 },
  { name: 'ج', sales: 6900 },
];

interface Props {
  orders: Order[];
  inventory: InventoryItem[];
}

export const Dashboard: React.FC<Props> = ({ orders, inventory }) => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loadingInsights, setLoadingInsights] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoadingInsights(true);
      const res = await getSmartInsights(orders, inventory);
      setInsights(res);
      setLoadingInsights(false);
    };
    fetchInsights();
  }, []);

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const activeOrders = orders.filter(o => o.status === 'preparing' || o.status === 'pending').length;

  return (
    <div className="space-y-12 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="فروش امروز" value={`${totalSales.toLocaleString()}`} unit="تومان" icon="💰" color="amber" />
        <StatCard title="سفارشات در صف" value={activeOrders.toString()} unit="مورد" icon="⏳" color="blue" />
        <StatCard title="رضایت مشتریان" value="۹۸.۵" unit="درصد" icon="🌟" color="purple" />
        <StatCard title="موجودی بحرانی" value={inventory.filter(i => i.quantity <= i.threshold).length.toString()} unit="کالا" icon="📉" color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">گزارش فروش هفتگی</h3>
              <p className="text-slate-400 text-sm mt-1">نمودار مقایسه‌ای فروش در ۷ روز گذشته</p>
            </div>
            <select className="bg-slate-50 border-none outline-none px-4 py-2 rounded-xl text-xs font-bold text-slate-500">
              <option>۷ روز اخیر</option>
              <option>۳۰ روز اخیر</option>
            </select>
          </div>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 'bold'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', fontWeight: 'bold' }}
                />
                <Bar dataKey="sales" fill="#f59e0b" radius={[12, 12, 12, 12]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl text-white relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/20 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <h3 className="text-xl font-black flex items-center gap-3">
                <span className="text-3xl">✨</span>
                دستیار هوشمند
              </h3>
              {loadingInsights && <div className="animate-spin rounded-full h-5 w-5 border-2 border-amber-500 border-t-transparent"></div>}
            </div>
            
            <div className="space-y-6 relative z-10">
              {insights.map((insight, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-all cursor-default">
                  <h4 className="font-black text-amber-400 text-sm mb-2">{insight.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">{insight.description}</p>
                </div>
              ))}
              {insights.length === 0 && !loadingInsights && (
                <p className="text-center text-slate-500 text-sm py-10 font-bold italic">درحال تحلیل داده‌ها...</p>
              )}
            </div>
          </div>
          
          <div className="bg-amber-100 p-8 rounded-[3rem] flex items-center justify-between border border-amber-200">
            <div>
              <p className="text-[10px] font-black uppercase text-amber-600 tracking-widest">موجودی صندوق</p>
              <p className="text-2xl font-black text-slate-900 mt-1">۱۲,۴۵۰,۰۰۰ <span className="text-xs">تومان</span></p>
            </div>
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm">💳</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, unit, icon, color }: { title: string, value: string, unit: string, icon: string, color: string }) => {
  const colors: any = {
    amber: 'bg-amber-50 text-amber-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600'
  };
  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center text-center group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center text-3xl mb-4 transition-transform group-hover:scale-110 ${colors[color]}`}>
        {icon}
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
      <div className="flex items-baseline gap-1">
        <p className="text-3xl font-black text-slate-800">{value}</p>
        <span className="text-[10px] font-bold text-slate-400">{unit}</span>
      </div>
    </div>
  );
};
