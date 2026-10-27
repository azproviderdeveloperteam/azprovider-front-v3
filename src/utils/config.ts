// ۱. دریافت آدرس خام از متغیر محیطی (اگر خالی بود مقدار پیش‌فرض قرار می‌گیرد)
const rawBackendUrl = process.env.BACKEND_URL || 'api.azprovider.ir';

// ۲. پاکسازی اشتباهات تایپی و پروتکل‌های تکراری
let cleanUrl = rawBackendUrl
    .replace(/^https?:\/\//i, '') // حذف https:// یا http:// در صورت وجود
    .replace(/^https?\/\//i, '')  // حذف اشتباه تایپی مانند https// در صورت وجود
    .replace(/\/+$/, '');         // حذف اسلش (/) اضافی از انتهای آدرس

// ۳. اطمینان از اینکه آدرس به /api ختم می‌شود
if (!cleanUrl.endsWith('/api') && !cleanUrl.endsWith('/api/')) {
    cleanUrl = `${cleanUrl}/api`;
}

// ۴. خروجی نهایی استاندارد و تمیز برای کل پروژه
export const baseUrl = `https://${cleanUrl}/`;