// src/services/logisticsService.ts

import api from './api';
import { AxiosResponse } from 'axios';

export const logisticsService = {
    // ۱. دریافت اطلاعات هوایی (فرودگاه‌ها و ایرلاین‌ها)
    getAviationIntelligence: (): Promise<AxiosResponse> =>
        api.get('/carriers/intelligence/'),

    // ۲. وب‌هوک به‌روزرسانی کارگو
    updateCarrierCargo: (carrierName: string, data: any): Promise<AxiosResponse> =>
        api.patch(`/carriers/webhook/${carrierName}/`, data),

    // ۳. اتوکامپلیت کدهای HS
    autocompleteHSCode: (query: string): Promise<AxiosResponse> =>
        api.get('/hscodes/autocomplete/', { params: { q: query } }),

    // ۴. تحلیل مسیر و زمان ترانزیت
    analyzeTransit: (origin: string, destination: string, hsCodeId: string): Promise<AxiosResponse> =>
        api.get('/transit-analysis/', {
            params: {
                origin_code: origin,
                destination_code: destination,
                hscode_id: hsCodeId
            }
        }),
    // کدی که باید به انتهای فایل src/services/logisticsService.ts اضافه کنید:

    // استعلام داینامیک تمام دارایی‌های ترانزیتی یک کشور خاص
    getCountryIntelligence: (id: string): Promise<AxiosResponse> =>
        api.get(`/countries/${id}/intelligence/`),

    // ۵. بنادر دریایی
    getSeaPorts: (): Promise<AxiosResponse> =>
        api.get('/maritime/ports/'),

    // ۶. پایانه‌های جاده‌ای
    getRoadHubs: (): Promise<AxiosResponse> =>
        api.get('/overland/hubs/'),

    // ۷. پایانه‌های ریلی
    getRailHubs: (): Promise<AxiosResponse> =>
        api.get('/rail/hubs/'),

    // 🌟 ۸. اضافه شدن متد دریافت لیست کشورها جهت رفع ارور شما 🌟
    getCountries: (): Promise<AxiosResponse> =>
        api.get('/countries/'),
};
