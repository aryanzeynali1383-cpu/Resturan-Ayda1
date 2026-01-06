
import React, { useState } from 'react';
import { InventoryItem } from '../types';

interface Props {
  inventory: InventoryItem[];
  onAdd: (item: Omit<InventoryItem, 'id'>) => void;
  onUpdate: (item: InventoryItem) => void;
  onDelete: (id: string) => void;
}

export const Inventory: React.FC<Props> = ({ inventory, onAdd, onUpdate, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    quantity: 0,
    unit: 'کیلوگرم',
    threshold: 5
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ name: '', quantity: 0, unit: 'کیلوگرم', threshold: 5 });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setFormData({ name: item.name, quantity: item.quantity, unit: item.unit, threshold: item.threshold });
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
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">مدیریت انبار مرکزی</h2>
          <p className="text-slate-500 mt-1">کنترل موجودی مواد اولیه و هشدارهای تامین کالا</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="px-8 py-4 bg-slate-900 text-white rounded-[2rem] font-black shadow-xl shadow-slate-900/20 hover:bg-black transition-all transform hover:-translate-y-1"
        >
          + افزودن کالا به انبار
        </button>
      </div>

      <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-10 py-6">نام کالا</th>
                <th className="px-10 py-6">موجودی فعلی</th>
                <th className="px-10 py-6">واحد اندازه‌گیری</th>
                <th className="px-10 py-6">حد آستانه</th>
                <th className="px-10 py-6">وضعیت</th>
                <th className="px-10 py-6 text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {inventory.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-10 py-20 text-center text-slate-300">
                    <div className="flex flex-col items-center gap-4">
                      <span className="text-6xl grayscale opacity-20">📦</span>
                      <p className="font-bold">انبار در حال حاضر خالی است</p>
                    </div>
                  </td>
                </tr>
              ) : inventory.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-10 py-6 font-black text-slate-800">{item.name}</td>
                  <td className="px-10 py-6 font-mono text-lg">{item.quantity}</td>
                  <td className="px-10 py-6 text-slate-500 font-bold">{item.unit}</td>
                  <td className="px-10 py-6 text-slate-400 font-mono">{item.threshold}</td>
                  <td className="px-10 py-6">
                    {item.quantity <= item.threshold ? (
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-50 text-rose-600 rounded-full text-[10px] font-black uppercase ring-1 ring-rose-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                        نیاز به تامین
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase ring-1 ring-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        موجود
                      </span>
                    )}
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex justify-center gap-3">
                      <button 
                        onClick={() => handleOpenEdit(item)}
                        className="w-10 h-10 flex items-center justify-center bg-slate-100 text-slate-500 rounded-2xl hover:bg-amber-100 hover:text-amber-600 transition-all"
                        title="ویرایش"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => confirm(`آیا از حذف "${item.name}" اطمینان دارید؟`) && onDelete(item.id)}
                        className="w-10 h-10 flex items-center justify-center bg-slate-100 text-slate-500 rounded-2xl hover:bg-rose-100 hover:text-rose-600 transition-all"
                        title="حذف"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-white rounded-[3rem] w-full max-w-xl shadow-2xl overflow-hidden border border-white/20">
            <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h4 className="text-2xl font-black text-slate-800">
                {editingItem ? 'ویرایش موجودی' : 'ثبت کالای جدید'}
              </h4>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white shadow-sm text-slate-400 hover:text-slate-800 transition-all text-2xl">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pr-2">نام کالا یا ماده اولیه</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-8 py-5 rounded-[1.5rem] bg-slate-50 border-2 border-transparent focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 outline-none transition-all font-bold text-slate-800 text-lg"
                  placeholder="مثلا: پنیر موزارلا درجه یک"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pr-2">مقدار موجودی</label>
                  <input 
                    type="number" 
                    required
                    value={formData.quantity}
                    onChange={e => setFormData({...formData, quantity: Number(e.target.value)})}
                    className="w-full px-8 py-5 rounded-[1.5rem] bg-slate-50 border-2 border-transparent focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 outline-none transition-all font-bold text-slate-800 text-lg"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pr-2">واحد سنجش</label>
                  <select 
                    value={formData.unit}
                    onChange={e => setFormData({...formData, unit: e.target.value})}
                    className="w-full px-8 py-5 rounded-[1.5rem] bg-slate-50 border-2 border-transparent focus:bg-white focus:border-amber-500 outline-none transition-all font-bold text-slate-800 text-lg appearance-none cursor-pointer"
                  >
                    <option value="کیلوگرم">کیلوگرم (kg)</option>
                    <option value="لیتر">لیتر (L)</option>
                    <option value="عدد">عدد (pcs)</option>
                    <option value="بسته">بسته (pkg)</option>
                    <option value="گرم">گرم (gr)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pr-2">حد آستانه هشدار (کمترین مقدار مجاز)</label>
                <input 
                  type="number" 
                  required
                  value={formData.threshold}
                  onChange={e => setFormData({...formData, threshold: Number(e.target.value)})}
                  className="w-full px-8 py-5 rounded-[1.5rem] bg-slate-50 border-2 border-transparent focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 outline-none transition-all font-bold text-slate-800 text-lg"
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button 
                  type="submit"
                  className="flex-1 py-6 bg-amber-500 text-slate-900 rounded-[2rem] font-black text-lg shadow-xl shadow-amber-500/30 hover:bg-amber-600 transition-all transform hover:scale-[1.02]"
                >
                  ذخیره در انبار
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
