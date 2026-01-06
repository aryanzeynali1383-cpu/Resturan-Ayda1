
import { MenuItem, InventoryItem, Staff } from './types';

export const INITIAL_MENU: MenuItem[] = [
  { id: 'm1', name: 'پیتزا پپرونی ویژه', price: 295000, category: 'پیتزا', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800' },
  { id: 'm2', name: 'پیتزا استیک و سیر', price: 380000, category: 'پیتزا', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=800' },
  { id: 'm3', name: 'پیتزا مارگاریتا', price: 210000, category: 'پیتزا', image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&q=80&w=800' },
  { id: 'm4', name: 'سالاد سزار مخصوص', price: 185000, category: 'سالاد', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=800' },
  { id: 'm5', name: 'سالاد یونانی', price: 140000, category: 'سالاد', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=800' },
  { id: 'm6', name: 'کوکا کولا قوطی', price: 35000, category: 'نوشیدنی', image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&q=80&w=800' },
  { id: 'm7', name: 'فانتا پرتقالی', price: 35000, category: 'نوشیدنی', image: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&q=80&w=800' },
  { id: 'm8', name: 'آب معدنی خنک', price: 15000, category: 'نوشیدنی', image: 'https://images.unsplash.com/photo-1550575110-59f9393f6f55?auto=format&fit=crop&q=80&w=800' },
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  { id: 'i1', name: 'خمیر پیتزا تازه', quantity: 100, unit: 'عدد', threshold: 20 },
  { id: 'i2', name: 'پنیر موزارلا', quantity: 15, unit: 'کیلوگرم', threshold: 5 },
  { id: 'i3', name: 'پپرونی اسلایس شده', quantity: 10, unit: 'کیلوگرم', threshold: 3 },
  { id: 'i4', name: 'کاهو رسمی', quantity: 20, unit: 'کیلوگرم', threshold: 5 },
  { id: 'i5', name: 'سس سزار مخصوص', quantity: 5, unit: 'لیتر', threshold: 1 },
];

export const INITIAL_STAFF: Staff[] = [
  { id: 's1', name: 'مازیار ابراهیمی', role: 'admin', status: 'active', salary: 25000000 },
  { id: 's2', name: 'سپیده راد', role: 'chef', status: 'active', salary: 18000000 },
  { id: 's3', name: 'آرمان شکوهی', role: 'waiter', status: 'active', salary: 12000000 },
  { id: 's4', name: 'مهتاب علوی', role: 'cashier', status: 'active', salary: 11000000 },
];
