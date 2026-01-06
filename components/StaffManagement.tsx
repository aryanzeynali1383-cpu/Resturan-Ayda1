
import React, { useState } from 'react';
import { Staff } from '../types';

interface Props {
  staff: Staff[];
  onAdd: (member: Omit<Staff, 'id'>) => void;
  onUpdate: (member: Staff) => void;
  onDelete: (id: string) => void;
}

export const StaffManagement: React.FC<Props> = ({ staff, onAdd, onUpdate, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Staff | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: 'waiter' as Staff['role'],
    status: 'active' as Staff['status'],
    salary: 0
  });

  const roles = [
    { id: 'admin', label: 'مدیر شعبه', icon: '👑' },
    { id: 'chef', label: 'سرآشپز', icon: '👨‍🍳' },
    { id: 'waiter', label: 'گارسون', icon: '🤵' },
    { id: 'cashier', label: 'صندوقدار', icon: '💵' }
  ];

  const handleOpenAdd = () => {
    setEditingMember(null);
    setFormData({ name: '', role: 'waiter', status: 'active', salary: 0 });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (member: Staff) => {
    setEditingMember(member);
    setFormData({ name: member.name, role: member.role, status: member.status, salary: member.salary });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      onUpdate({ ...editingMember, ...formData });
    } else {
      onAdd(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">مدیریت سرمایه انسانی و حقوق</h2>
          <p className="text-slate-500 mt-1">کنترل دسترسی‌ها، نقش‌ها، وضعیت فعالیت و دستمزد تیم</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black shadow-2xl shadow-slate-900/20 hover:bg-black transition-all transform hover:-translate-y-1"
        >
          + استخدام عضو جدید
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {staff.map(member => (
          <div key={member.id} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/5 -mr-12 -mt-12 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-28 h-28 bg-gradient-to-tr from-slate-50 to-slate-100 rounded-[2.5rem] flex items-center justify-center text-5xl mb-6 shadow-inner ring-8 ring-white group-hover:rotate-6 transition-transform">
                {roles.find(r => r.id === member.role)?.icon || '👤'}
              </div>
              <h4 className="text-2xl font-black text-slate-800 leading-tight">{member.name}</h4>
              <p className="px-5 py-2 bg-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-3 border border-slate-200/50">
                {roles.find(r => r.id === member.role)?.label}
              </p>

              <div className="flex items-center gap-3 mt-4">
                <span className={`w-3 h-3 rounded-full ${member.status === 'active' ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)] animate-pulse' : 'bg-slate-300'}`}></span>
                <span className="text-xs font-black text-slate-400 tracking-widest uppercase">
                  {member.status === 'active' ? 'در حال خدمت' : member.status === 'on-break' ? 'در حال استراحت' : 'خارج از نوبت'}
                </span>
              </div>

              <div className="mt-6 p-4 bg-slate-50 rounded-3xl w-full border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">دستمزد ماهیانه</p>
                <p className="text-lg font-black text-amber-600">
                  {member.salary?.toLocaleString() || 0} <span className="text-[10px] text-slate-400">تومان</span>
                </p>
              </div>

              <div className="flex gap-3 mt-8 w-full">
                <button 
                  onClick={() => handleOpenEdit(member)}
                  className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-2xl font-black hover:bg-slate-100 transition-all text-sm"
                >
                  ویرایش
                </button>
                <button 
                  onClick={() => confirm(`آیا مایل به حذف اطلاعات "${member.name}" هستید؟`) && onDelete(member.id)}
                  className="w-14 h-14 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-inner"
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
          <div className="bg-white rounded-[3.5rem] w-full max-w-lg shadow-2xl overflow-hidden border border-white/20">
            <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h4 className="text-2xl font-black text-slate-800">مشخصات پرسنلی</h4>
              <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white shadow-sm text-slate-300 hover:text-slate-800 transition-all text-3xl">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-10 space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pr-2">نام و نام خانوادگی</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-8 py-5 rounded-[1.5rem] bg-slate-50 border-2 border-transparent focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 outline-none transition-all font-bold text-slate-800 text-lg"
                  placeholder="مثلا: رضا احمدی"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pr-2">سمت شغلی</label>
                  <select 
                    value={formData.role}
                    onChange={e => setFormData({...formData, role: e.target.value as any})}
                    className="w-full px-8 py-5 rounded-[1.5rem] bg-slate-50 border-2 border-transparent focus:bg-white focus:border-amber-500 outline-none transition-all font-bold text-slate-800 text-lg appearance-none cursor-pointer"
                  >
                    {roles.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pr-2">وضعیت حضور</label>
                  <select 
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value as any})}
                    className="w-full px-8 py-5 rounded-[1.5rem] bg-slate-50 border-2 border-transparent focus:bg-white focus:border-amber-500 outline-none transition-all font-bold text-slate-800 text-lg appearance-none cursor-pointer"
                  >
                    <option value="active">در حال خدمت</option>
                    <option value="on-break">استراحت کوتاه</option>
                    <option value="off">پایان شیفت کاری</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pr-2">دستمزد ماهیانه (تومان)</label>
                <input 
                  type="number" 
                  required
                  value={formData.salary}
                  onChange={e => setFormData({...formData, salary: Number(e.target.value)})}
                  className="w-full px-8 py-5 rounded-[1.5rem] bg-slate-50 border-2 border-transparent focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 outline-none transition-all font-bold text-slate-800 text-lg"
                  placeholder="مثلا: 15000000"
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button 
                  type="submit"
                  className="flex-1 py-6 bg-slate-900 text-white rounded-[2rem] font-black text-lg shadow-2xl shadow-slate-900/30 hover:bg-black transition-all transform hover:scale-[1.02]"
                >
                  ثبت مشخصات
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
