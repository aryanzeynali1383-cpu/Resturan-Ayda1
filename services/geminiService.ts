
import { GoogleGenAI, Type } from "@google/genai";
import { Order, InventoryItem } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getSmartInsights = async (orders: Order[], inventory: InventoryItem[]) => {
  try {
    const dataSummary = `
      Current Orders: ${orders.length}
      Low Stock Items: ${inventory.filter(i => i.quantity <= i.threshold).map(i => i.name).join(", ")}
      Total Revenue Today: ${orders.reduce((sum, o) => sum + o.total, 0)}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `با توجه به داده‌های زیر از سیستم مدیریت رستوران، ۳ پیشنهاد مدیریتی کوتاه و کاربردی به زبان فارسی برای بهبود عملکرد رستوران ارائه بده. 
      داده‌ها: ${dataSummary}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              type: { type: Type.STRING, enum: ["success", "warning", "info"] }
            },
            required: ["title", "description", "type"]
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return [
      { title: "خطا در اتصال", description: "امکان دریافت پیشنهادات هوشمند در حال حاضر وجود ندارد.", type: "warning" }
    ];
  }
};
