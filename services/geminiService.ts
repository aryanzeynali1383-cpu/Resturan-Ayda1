
import { Order, InventoryItem, Insight } from "../types";

// این تابع قبلاً به Gemini متصل بود، اما الان به صورت لوکال تحلیل می‌کند
export const getSmartInsights = async (orders: Order[], inventory: InventoryItem[]): Promise<Insight[]> => {
  // شبیه‌سازی تاخیر شبکه برای تجربه کاربری بهتر
  await new Promise(resolve => setTimeout(resolve, 1500));

  const insights: Insight[] = [];
  
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const lowStockItems = inventory.filter(i => i.quantity <= i.threshold);

  // تحلیل فروش
  if (totalSales > 5000000) {
    insights.push({
      title: "عملکرد عالی فروش",
      description: "فروش امروز از میانگین هفته گذشته بالاتر است. عملکرد تیم فروش عالی بوده است.",
      type: "success"
    });
  } else {
    insights.push({
      title: "نیاز به افزایش فروش",
      description: "فروش امروز پایین‌تر از حد انتظار است. پیشنهاد می‌شود یک کمپین تبلیغاتی پیامکی اجرا کنید.",
      type: "info"
    });
  }

  // تحلیل انبار
  if (lowStockItems.length > 0) {
    insights.push({
      title: "هشدار موجودی انبار",
      description: `${lowStockItems.length} قلم کالا (${lowStockItems.map(i => i.name).slice(0, 2).join('، ')}...) به نقطه سفارش مجدد رسیده‌اند.`,
      type: "warning"
    });
  } else {
    insights.push({
      title: "وضعیت پایدار انبار",
      description: "تمامی اقلام موجودی کافی دارند و نیازی به خرید فوری نیست.",
      type: "success"
    });
  }

  // پیشنهاد عمومی
  insights.push({
    title: "مدیریت بهینه",
    description: "با توجه به سفارشات اخیر، پیشنهاد می‌شود شیفت عصر را با یک نیروی کمکی تقویت کنید.",
    type: "info"
  });

  return insights;
};
