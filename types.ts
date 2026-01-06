
export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'served' | 'cancelled';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

export interface OrderItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  tableNumber: string;
  items: OrderItem[];
  status: OrderStatus;
  timestamp: Date;
  total: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  threshold: number;
}

export interface Staff {
  id: string;
  name: string;
  role: 'admin' | 'waiter' | 'chef' | 'cashier';
  status: 'active' | 'on-break' | 'off';
  salary: number;
}

export interface Insight {
  title: string;
  description: string;
  type: 'success' | 'warning' | 'info';
}
