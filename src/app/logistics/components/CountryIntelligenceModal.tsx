// src/app/logistics/components/CountryIntelligenceModal.tsx
import React, { useState } from 'react';
import { logisticsService } from '../../../services/logisticsService';

interface CountryIntelligenceModalProps {
    isOpen: boolean;
    onClose: () => void;
    countriesList: any[];
}

export default function CountryIntelligenceModal({
    isOpen,
    onClose,
    countriesList
}: CountryIntelligenceModalProps) {
    const [selectedCountry, setSelectedCountry] = useState<any>(null);
    const [intelData, setIntelData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    // 🌟 تابع تبدیل کد دورقمی کشور به ایموجی پرچم (۱۰۰٪ اتوماتیک و نیتیو بدون تداخل داکر)
    const getFlagEmoji = (countryCode: string) => {
        if (!countryCode) return '';
        const codePoints = countryCode
            .toUpperCase()
            .split('')
            .map(char => 127397 + char.charCodeAt(0));
        return String.fromCodePoint(...codePoints);
    };

    const handleCountryClick = async (country: any) => {
        setSelectedCountry(country);
        setIsLoading(true);
        setIntelData(null);
        try {
            const response = await logisticsService.getCountryIntelligence(country.id);
            setIntelData(response.data);
        } catch (error) {
            console.error("خطا در استعلام اطلاعات ترانزیت کشور:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            {/* قاب شیشه‌ای اصلی */}
            <div className="glass-panel w-full max-w-4xl h-[600px] rounded-2xl flex flex-col overflow-hidden shadow-2xl">

                {/* هدر مودال */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-[#1a353d] bg-[#101d26]">
                    <h3 className="text-lg font-bold text-[#51d2c2] flex items-center gap-2">
                        <span className="material-symbols-outlined text-md">flag</span>
                        Global Network Intelligence (شبکه ترانزیت جهانی)
                    </h3>
                    <button onClick={onClose} className="text-[#bbc9c6] hover:text-[#71efde] transition">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* بخش محتوا: سایدبار چپ (لیست کشورها) + راست (جزییات هاب‌ها) */}
                <div className="flex-1 flex overflow-hidden">

                    {/* ستون چپ: لیست کشورها با پرچم */}
                    <div className="w-1/3 border-r border-[#1a353d] overflow-y-auto custom-scrollbar bg-[#0c1922]/50 p-2">
                        {countriesList.map((country) => (
                            <div
                                key={country.id}
                                onClick={() => handleCountryClick(country)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition mb-1 ${selectedCountry?.id === country.id ? 'bg-[#51d2c2]/20 text-[#51d2c2] border border-[#51d2c2]/25' : 'hover:bg-[#1f2b35] text-on-surface'}`}
                            >
                                <span className="text-2xl">{getFlagEmoji(country.code)}</span>
                                <span className="text-sm font-semibold">{country.name}</span>
                            </div>
                        ))}
                    </div>

                    {/* ستون راست: نمایش دارایی‌های ترانزیتی کشور کلیک شده */}
                    <div className="w-2/3 p-6 overflow-y-auto custom-scrollbar bg-[#0c1922]">
                        {selectedCountry ? (
                            isLoading ? (
                                <div className="flex items-center justify-center h-full text-[#bbc9c6] text-sm">در حال استعلام شبکه...</div>
                            ) : intelData ? (
                                <div className="space-y-6">
                                    {/* هدر کشور */}
                                    <div className="border-b border-[#1a353d] pb-3">
                                        <h4 className="text-2xl font-bold text-on-surface flex items-center gap-3">
                                            <span className="text-3xl">{getFlagEmoji(intelData.country_code)}</span>
                                            {intelData.country_name}
                                        </h4>
                                        <p className="text-xs text-[#94a3b8] mt-1">ISO Code: {intelData.country_code}</p>
                                    </div>

                                    {/* فرودگاه‌ها */}
                                    <div>
                                        <h5 className="text-[#ec4899] font-bold text-sm mb-2 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">flight</span>
                                            Aviation Hubs (پایانه‌های هوایی)
                                        </h5>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {intelData.air_hubs.length > 0 ? (
                                                intelData.air_hubs.map((h: any, idx: number) => (
                                                    <div key={idx} className="bg-[#1f2b35] p-3 rounded-lg border border-[#1a353d] text-xs">
                                                        <strong className="text-[#ec4899] block">{h.code}</strong>
                                                        <span className="text-[#d7e4f1]">{h.name}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-xs text-gray-500">هیچ هاب هوایی برای این کشور ثبت نشده است.</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* بنادر دریایی */}
                                    <div>
                                        <h5 className="text-[#3b82f6] font-bold text-sm mb-2 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">sailing</span>
                                            Maritime Ports (بنادر دریایی تجاری)
                                        </h5>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {intelData.sea_hubs.length > 0 ? (
                                                intelData.sea_hubs.map((h: any, idx: number) => (
                                                    <div key={idx} className="bg-[#1f2b35] p-3 rounded-lg border border-[#1a353d] text-xs">
                                                        <strong className="text-[#3b82f6] block">{h.code}</strong>
                                                        <span className="text-[#d7e4f1]">{h.name}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-xs text-gray-500">این کشور فاقد بندر دریایی فعال در سیستم است.</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* پایانه‌های جاده‌ای و ریلی */}
                                    <div>
                                        <h5 className="text-[#f59e0b] font-bold text-sm mb-2 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">local_shipping</span>
                                            Overland &amp; Rail Terminals (پایانه‌های خشکی)
                                        </h5>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {intelData.land_hubs.map((h: any, idx: number) => (
                                                <div key={`land_${idx}`} className="bg-[#1f2b35] p-3 rounded-lg border border-[#1a353d] text-xs">
                                                    <span className="text-[#f59e0b] font-bold block">🚚 جاده‌ای</span>
                                                    <span className="text-[#d7e4f1]">{h.name}</span>
                                                </div>
                                            ))}
                                            {intelData.rail_hubs.map((h: any, idx: number) => (
                                                <div key={`rail_${idx}`} className="bg-[#1f2b35] p-3 rounded-lg border border-[#1a353d] text-xs">
                                                    <span className="text-[#71efde] font-bold block">🚂 ریلی</span>
                                                    <span className="text-[#d7e4f1]">{h.name}</span>
                                                </div>
                                            ))}
                                            {intelData.land_hubs.length === 0 && intelData.rail_hubs.length === 0 && (
                                                <p className="text-xs text-gray-500">هیچ پایانه زمینی ثبت نشده است.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-[#bbc9c6]">
                                <span className="material-symbols-outlined text-5xl mb-2">public</span>
                                <p className="text-sm">جهت مانیتورینگ دارایی‌های لجستیکی، یک کشور را انتخاب کنید.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}