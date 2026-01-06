
import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { OrderSystem } from './components/OrderSystem';
import { KitchenDisplay } from './components/KitchenDisplay';
import { Inventory } from './components/Inventory';
import { MenuManagement } from './components/MenuManagement';
import { StaffManagement } from './components/StaffManagement';
import { Order, MenuItem, OrderStatus, InventoryItem, Staff } from './types';
import { INITIAL_MENU, INITIAL_INVENTORY, INITIAL_STAFF } from './constants';

const App: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [menu, setMenu] = useState<MenuItem[]>(INITIAL_MENU);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [staff, setStaff] = useState<Staff[]>(INITIAL_STAFF);

  const addOrder = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === id ? { ...order, status } : order
    ));
  };

  // Menu Management
  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem = { ...item, id: 'm' + Math.random().toString(36).substr(2, 5) };
    setMenu(prev => [...prev, newItem]);
  };
  const updateMenuItem = (item: MenuItem) => {
    setMenu(prev => prev.map(m => m.id === item.id ? item : m));
  };
  const deleteMenuItem = (id: string) => {
    setMenu(prev => prev.filter(m => m.id !== id));
  };

  // Inventory Actions
  const addInventoryItem = (item: Omit<InventoryItem, 'id'>) => {
    const newItem = { ...item, id: 'i' + Math.random().toString(36).substr(2, 5) };
    setInventory(prev => [...prev, newItem]);
  };
  const updateInventoryItem = (item: InventoryItem) => {
    setInventory(prev => prev.map(i => i.id === item.id ? item : i));
  };
  const deleteInventoryItem = (id: string) => {
    setInventory(prev => prev.filter(i => i.id !== id));
  };

  // Staff Actions
  const addStaffMember = (member: Omit<Staff, 'id'>) => {
    const newMember = { ...member, id: 's' + Math.random().toString(36).substr(2, 5) };
    setStaff(prev => [...prev, newMember]);
  };
  const updateStaffMember = (member: Staff) => {
    setStaff(prev => prev.map(s => s.id === member.id ? member : s));
  };
  const deleteStaffMember = (id: string) => {
    setStaff(prev => prev.filter(s => s.id !== id));
  };

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard orders={orders} inventory={inventory} />} />
          <Route path="/orders" element={<OrderSystem menu={menu} addOrder={addOrder} />} />
          <Route path="/kitchen" element={<KitchenDisplay orders={orders} updateStatus={updateOrderStatus} />} />
          <Route path="/inventory" element={
            <Inventory 
              inventory={inventory} 
              onAdd={addInventoryItem}
              onUpdate={updateInventoryItem}
              onDelete={deleteInventoryItem}
            />
          } />
          <Route path="/menu" element={
            <MenuManagement 
              menu={menu} 
              onAdd={addMenuItem} 
              onUpdate={updateMenuItem} 
              onDelete={deleteMenuItem} 
            />
          } />
          <Route path="/staff" element={
            <StaffManagement 
              staff={staff} 
              onAdd={addStaffMember} 
              onUpdate={updateStaffMember} 
              onDelete={deleteStaffMember} 
            />
          } />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
