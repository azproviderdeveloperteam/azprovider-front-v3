// src/services/aiService.ts

export interface ChatHistoryItem {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export interface ChatRequest {
    prompt: string;
    history?: ChatHistoryItem[];
}

export interface ChatResponse {
    response: string;
}

// اینترفیس کالاها برای کاتالوگ (رفع خطای اول)
export interface Product {
    id: number | string;
    name?: string;
    title?: string;
    price?: string | number;
    image?: string;
    description?: string;
}

const BASE_URL = 'https://azp-django.runflare.run';

export const aiService = {
    /**
     * ارسال پیام متنی همراه با تاریخچه به بک‌اند
     */
    async sendChatMessage(data: ChatRequest, token?: string): Promise<ChatResponse> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${BASE_URL}/api/v2/ai/chat/`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('UNAUTHORIZED');
            }
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || 'FAILED');
        }

        return response.json();
    },

    /**
     * دریافت لیست محصولات برای ساخت کاتالوگ (رفع خطای دوم)
     */
    async getProducts(token?: string): Promise<Product[]> {
        const headers: Record<string, string> = {
            'accept': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${BASE_URL}/api/v2/product/`, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            throw new Error('FETCH_PRODUCTS_FAILED');
        }

        const data = await response.json();

        // مدیریت پاسخ‌های صفحه‌بندی شده استاندارد جنگو (دارای فیلد results)
        if (data && typeof data === 'object' && 'results' in data && Array.isArray(data.results)) {
            return data.results;
        }

        // مدیریت پاسخ‌های آرایه‌ای مستقیم
        if (Array.isArray(data)) {
            return data;
        }

        return [];
    },

    /**
     * دریافت مشخصات پروفایل کاربر جهت شخصی‌سازی و اعتبارسنجی کاتالوگ
     */
    async getUserProfile(token: string): Promise<any> {
        const headers: Record<string, string> = {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        const response = await fetch(`${BASE_URL}/api/v2/user/profile/`, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            throw new Error('FETCH_PROFILE_FAILED');
        }

        return response.json();
    }
};