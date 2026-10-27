// src/components/dashboard/products/DownloadCatalogButton.tsx
'use client';

import React, { useState } from 'react';
import { toast } from 'react-hot-toast'; // ایمپورت پیام‌های تست برای هماهنگی با Toaster پروژه شما
import CatalogPDFTemplate from './../CatalogPDFTemplate';
import { exportCatalogToPDF } from './../../utils/pdfGenerator';
import { Product, aiService } from './../../services/aiService';

interface DownloadCatalogButtonProps {
    products: Product[];
}

export default function DownloadCatalogButton({ products }: DownloadCatalogButtonProps) {
    const [generatingPDF, setGeneratingPDF] = useState(false);
    const [profile, setProfile] = useState<any>(null); // ذخیره اطلاعات لایو پروفایل کاربر

    // متد کمکی برای خواندن توکن از کوکی‌ها یا حافظه مرورگر
    const getAuthToken = (): string | null => {
        if (typeof window === 'undefined') return null;
        const jwtRegex = /^eyJ[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
        const cookies = document.cookie.split('; ');

        for (const cookie of cookies) {
            const eqIndex = cookie.indexOf('=');
            if (eqIndex === -1) continue;
            const key = cookie.substring(0, eqIndex).trim();
            const val = cookie.substring(eqIndex + 1).trim();

            if (val && (val.startsWith('eyJ') || jwtRegex.test(val))) {
                return val;
            }
        }

        const token = localStorage.getItem('token') || localStorage.getItem('access_token');
        return token;
    };

    const handleDownloadCatalog = async () => {
        if (!products || products.length === 0) return;
        setGeneratingPDF(true);

        const token = getAuthToken();
        if (!token) {
            toast.error('لطفاً ابتدا وارد حساب کاربری خود شوید.');
            setGeneratingPDF(false);
            return;
        }

        try {
            // ۱. دریافت لایو اطلاعات پروفایل از وب‌سرویس v2/user/profile/
            const profileData = await aiService.getUserProfile(token);
            setProfile(profileData);

            // ۲. فیلدهای الزامی تجاری برای تایید ساخت کاتالوگ
            const requiredFields = [
                { key: 'first_name', labelFa: 'نام' },
                { key: 'last_name', labelFa: 'نام خانوادگی' },
                { key: 'international_name', labelFa: 'نام بین‌المللی شرکت' },
                { key: 'country', labelFa: 'کشور' },
                { key: 'city', labelFa: 'شهر' }
            ];

            // فیلتر کردن موارد ثبت‌نشده (مقادیر خالی یا null)
            const missingFields = requiredFields.filter(
                (field) => !profileData[field.key] || profileData[field.key].toString().trim() === ''
            );

            // ۳. بررسی گیت اعتبارسنجی
            if (missingFields.length > 0) {
                const missingLabels = missingFields.map((f) => f.labelFa).join('، ');
                toast.error(
                    `جهت صدور کاتالوگ، ابتدا باید اطلاعات پروفایل خود را تکمیل کنید. موارد ناقص: [ ${missingLabels} ]`,
                    { duration: 6000, position: 'top-center' }
                );
                setGeneratingPDF(false);
                return;
            }

            // ۴. در صورت تایید و کامل بودن پروفایل، شروع رندر و دانلود PDF
            setTimeout(async () => {
                const success = await exportCatalogToPDF(products.length);
                if (success) {
                    toast.success('کاتالوگ هوشمند اختصاصی شما با موفقیت صادر و دانلود شد.');
                } else {
                    toast.error('مشکلی در زمان کامپایل فایل کاتالوگ رخ داد.');
                }
                setGeneratingPDF(false);
            }, 500);

        } catch (err: any) {
            console.error(err);
            toast.error('خطایی در ارتباط با سرور جهت تایید احراز هویت پروفایل رخ داد.');
            setGeneratingPDF(false);
        }
    };

    return (
        <div className="inline-block">
            <button
                onClick={handleDownloadCatalog}
                disabled={generatingPDF || !products || products.length === 0}
                className="bg-[#002B49] hover:bg-blue-900 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center gap-2 transition-all disabled:bg-gray-200 disabled:text-gray-400 shadow-md"
            >
                {generatingPDF ? (
                    <>
                        <span className="w-4 h-4 border-2 border-gray-400 border-t-blue-600 rounded-full animate-spin"></span>
                        در حال تایید پروفایل و صدور کاتالوگ...
                    </>
                ) : (
                    <>
                        <span>📄</span>
                        دریافت کاتالوگ PDF هوشمند
                    </>
                )}
            </button>

            {/* 
        رندر قالب چاپی در سایز واقعی A4 با دیتای دریافتی پروفایل کاربر
        خارج از صفحه مرورگر (left-[-9999px]) جهت جلوگیری از دفرمه شدن کاتالوگ
      */}
            {profile && (
                <div className="fixed left-[-9999px] top-0 w-[794px] h-auto pointer-events-none opacity-0 select-none z-[-9999]">
                    <CatalogPDFTemplate products={products} profile={profile} />
                </div>
            )}
        </div>
    );
}