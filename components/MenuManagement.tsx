
import React, { useState } from 'react';
import { MenuItem } from '../types';

interface Props {
  menu: MenuItem[];
  onAdd: (item: Omit<MenuItem, 'id'>) => void;
  onUpdate: (item: MenuItem) => void;
  onDelete: (id: string) => void;
}

export const MenuManagement: React.FC<Props> = ({ menu, onAdd, onUpdate, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    category: 'پیتزا',
    image: ''
  });

  const categories = ['پیتزا', 'سالاد', 'پیش‌غذا', 'نوشیدنی'];

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ name: '', price: 0, category: 'پیتزا', image: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({ name: item.name, price: item.price, category: item.category, image: item.image });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      onUpdate({ ...editingItem, ...formData });
    } else {
      onAdd(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">طراحی منوی دیجیتال</h2>
          <p className="text-slate-500 mt-1">مدیریت محصولات، قیمت‌گذاری و تصاویر ویترینی</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="px-10 py-5 bg-amber-500 text-slate-900 rounded-[2rem] font-black shadow-2xl shadow-amber-500/30 hover:bg-amber-600 transition-all transform hover:-translate-y-1 flex items-center gap-3"
        >
          <span className="text-2xl">+</span> افزودن آیتم به منو
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {menu.map(item => (
          <div key={item.id} className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group relative">
            <div className="relative h-64 overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-2xl text-[10px] font-black text-slate-800 shadow-sm uppercase tracking-widest border border-white/20">
                {item.category}
              </div>
            </div>
            <div className="p-8">
              <h4 className="text-xl font-black text-slate-800 truncate leading-tight">{item.name}</h4>
              <div className="flex items-baseline gap-1 mt-3">
                <p className="text-2xl font-black text-amber-600 tracking-tight">{item.price.toLocaleString()}</p>
                <span className="text-[10px] font-bold text-slate-400">تومان</span>
              </div>
              
              <div className="flex gap-3 mt-8">
                <button 
                  onClick={() => handleOpenEdit(item)}
                  className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                >
                  ✏️ ویرایش
                </button>
                <button 
                  onClick={() => confirm(`آیا مایل به حذف "${item.name}" هستید؟`) && onDelete(item.id)}
                  className="w-14 h-14 bg-rose-50 text-rose-500 rounded-2xl font-bold hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center shadow-inner"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-white rounded-[3.5rem] w-full max-w-2xl shadow-2xl overflow-hidden border border-white/20">
            <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h4 className="text-2xl font-black text-slate-800">جزئیات آیتم منو</h4>
                <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest">Digital Menu Specification</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white shadow-sm text-slate-300 hover:text-slate-800 transition-all text-3xl">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pr-2">نام غذا یا نوشیدنی</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-8 py-5 rounded-[1.5rem] bg-slate-50 border-2 border-transparent focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 outline-none transition-all font-bold text-slate-800 text-lg"
                    placeholder="نام کامل را وارد کنید"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pr-2">قیمت فروش (تومان)</label>
                  <input 
                    type="number" 
                    required
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                    className="w-full px-8 py-5 rounded-[1.5rem] bg-slate-50 border-2 border-transparent focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 outline-none transition-all font-bold text-slate-800 text-lg"
                    placeholder="مثلا: 250000"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pr-2">دسته‌بندی منو</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full px-8 py-5 rounded-[1.5rem] bg-slate-50 border-2 border-transparent focus:bg-white focus:border-amber-500 outline-none transition-all font-bold text-slate-800 text-lg appearance-none cursor-pointer"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pr-2">آدرس تصویر (Unsplash Link)</label>
                  <input 
                    type="text" 
                    value={formData.image}
                    onChange={e => setFormData({...formData, image: e.target.value})}
                    className="w-full px-8 py-5 rounded-[1.5rem] bg-slate-50 border-2 border-transparent focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 outline-none transition-all font-bold text-slate-800 text-lg"
                    placeholder="لینک مستقیم تصویر"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button 
                  type="submit"
                  className="flex-1 py-6 bg-amber-500 text-slate-900 rounded-[2rem] font-black text-lg shadow-2xl shadow-amber-500/30 hover:bg-amber-600 transition-all transform hover:scale-[1.02]"
                >
                  ذخیره در منو
                </button>
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-6 bg-slate-100 text-slate-500 rounded-[2rem] font-black text-lg hover:bg-slate-200 transition-all"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
