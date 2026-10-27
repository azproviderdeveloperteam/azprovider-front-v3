// src/components/dashboard/products/DownloadCatalogButton.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import CatalogPDFTemplate from '../../../components/CatalogPDFTemplate';
import { exportCatalogToPDF } from '../../../utils/pdfGenerator';
import { Product, aiService } from '../../../services/aiService';

interface DownloadCatalogButtonProps {
    products: Product[];
}

export default function DownloadCatalogButton({ products }: DownloadCatalogButtonProps) {
    const [generatingPDF, setGeneratingPDF] = useState(false);
    const [profile, setProfile] = useState<any>(null);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [missingFields, setMissingFields] = useState<{ key: string; labelFa: string }[]>([]);

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

    // دریافت پیش‌دستانه (Pre-fetch) پروفایل در پس‌زمینه به محض لود شدن صفحه
    useEffect(() => {
        const preFetchProfile = async () => {
            const token = getAuthToken();
            if (!token) return;
            try {
                const profileData = await aiService.getUserProfile(token);
                setProfile(profileData);
            } catch (err) {
                console.error("Failed to pre-fetch user profile:", err);
            }
        };
        preFetchProfile();
    }, []);

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
            // اگر دیتای پروفایل به هر دلیلی هنوز در استیت لود نشده بود، مجدداً آن را دریافت کن
            let currentProfile = profile;
            if (!currentProfile) {
                currentProfile = await aiService.getUserProfile(token);
                setProfile(currentProfile);
            }

            // فیلدهای الزامی برای ارزیابی سریع و آنی
            const requiredFields = [
                { key: 'first_name', labelFa: 'نام نماینده' },
                { key: 'last_name', labelFa: 'نام خانوادگی نماینده' },
                { key: 'international_name', labelFa: 'نام بین‌المللی شرکت' },
                { key: 'country', labelFa: 'کشور فعالیت' },
                { key: 'city', labelFa: 'شهر فعالیت' }
            ];

            const missing = requiredFields.filter(
                (field) => !currentProfile[field.key] || currentProfile[field.key].toString().trim() === ''
            );

            // گیت کنترل: اگر پروفایل ناقص بود، فوراً لودینگ را متوقف کرده و پنجره پیش‌نمایش گرافیکی را باز کن
            if (missing.length > 0) {
                setMissingFields(missing);
                setShowPreviewModal(true);
                setGeneratingPDF(false);
                return;
            }

            // در صورت کامل بودن اطلاعات، شروع فوری صدور بدون معطلی و تاخیر ناهمگام
            const success = await exportCatalogToPDF(products.length);
            if (success) {
                toast.success('کاتالوگ اختصاصی شما با موفقیت دانلود شد.');
            } else {
                toast.error('مشکلی در زمان تولید کاتالوگ رخ داد.');
            }

        } catch (err: any) {
            console.error(err);
            toast.error('خطایی در برقراری ارتباط با سرور رخ داد.');
        } finally {
            // تضمین ۱۰۰٪ برای بازگشت دکمه از حالت لودینگ تحت هر شرایطی
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

            {/* مودال پیش‌نمایش گرافیکی کاتالوگ در صورت ناقص بودن اطلاعات */}
            {showPreviewModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99999] flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row transition-all duration-300" dir="rtl">

                        {/* سمت چپ: موکاپ زنده کاتالوگ برای ترغیب کاربر */}
                        <div className="md:w-1/2 bg-gradient-to-br from-blue-950 to-indigo-900 p-6 text-white flex flex-col justify-between relative overflow-hidden shrink-0">
                            <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none select-none">
                                <span className="text-[120px]">🚢</span>
                            </div>

                            <div className="z-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-white text-blue-900 flex items-center justify-center font-black text-xs">MPS</div>
                                    <span className="text-xs font-bold opacity-80">AZProvider.com</span>
                                </div>
                                <h4 className="text-lg font-black text-yellow-400 leading-tight">Global Wholesale Market</h4>
                                <p className="text-[10px] text-gray-300 mt-1">Smart Custom Catalog Generator</p>
                            </div>

                            <div className="border border-white/10 bg-white/5 rounded-2xl p-4 mt-4 z-10 space-y-3 shadow-inner">
                                <div className="flex gap-3 items-center">
                                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-xl shrink-0">📦</div>
                                    <div className="flex-1 space-y-1.5">
                                        <div className="h-3 bg-white/20 rounded w-3/4 animate-pulse"></div>
                                        <div className="h-2 bg-white/10 rounded w-1/2 animate-pulse"></div>
                                    </div>
                                </div>
                                <div className="h-[1px] bg-white/10 rounded w-full"></div>
                                <div className="flex justify-between items-center text-[10px] text-gray-300 font-bold font-mono">
                                    <span>ID: #0101</span>
                                    <span className="text-yellow-400">$13,000</span>
                                </div>
                            </div>

                            <div className="mt-6 text-[9px] text-gray-400 z-10 border-t border-white/10 pt-4 flex justify-between items-center">
                                <span className="truncate max-w-[120px]">Issued for: {profile?.international_name || "Your Company"}</span>
                                <span>Ref: {profile?.ref_code || "9QS7S5"}</span>
                            </div>
                        </div>

                        {/* سمت راست: هشدار فیلدهای ناقص و دکمه تکمیل پروفایل */}
                        <div className="md:w-1/2 p-6 flex flex-col justify-between bg-white text-right">
                            <div>
                                <h3 className="text-lg font-black text-blue-950">کاتالوگ تجاری شما آماده صدور است!</h3>
                                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                                    پیش‌نمایش کاتالوگ رسمی و هوشمند شما با موفقیت طراحی شده است. برای فعال‌سازی و دانلود نسخه نهایی PDF با نام و برند اختصاصی شرکت خودتان، کافی است اطلاعات ناقص زیر را در پروفایل کاربری خود تکمیل کنید:
                                </p>

                                {/* لیست نواقص تجاری */}
                                <ul className="mt-4 space-y-2">
                                    {missingFields.map((field) => (
                                        <li key={field.key} className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-2 rounded-xl border border-red-100/50 font-bold">
                                            <span className="text-red-500">✕</span>
                                            <span>{field.labelFa} (هنوز ثبت نشده)</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-6 flex gap-2">
                                <button
                                    onClick={() => {
                                        setShowPreviewModal(false);
                                        window.location.href = '/dashboard/profile';
                                    }}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs text-center transition-colors shadow-md flex items-center justify-center gap-1.5"
                                >
                                    تکمیل پروفایل تجاری ⚙️
                                </button>
                                <button
                                    onClick={() => setShowPreviewModal(false)}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-2.5 px-4 rounded-xl text-xs text-center transition-colors"
                                >
                                    بستن
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {/* رندر پنهان قالب چاپی کاتالوگ در پس‌زمینه با مشخصات واقعی پروفایل */}
            {profile && (
                <div className="fixed left-[-9999px] top-0 w-[794px] h-auto pointer-events-none opacity-0 select-none z-[-9999]">
                    <CatalogPDFTemplate products={products} profile={profile} />
                </div>
            )}
        </div>
    );
}