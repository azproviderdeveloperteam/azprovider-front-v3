// src/app/logistics/components/TransitOptions.tsx (نسخه اصلاح‌شده با رفع مچالگی کارت‌ها)
import React from 'react';

interface TransitOptionsProps {
    analysisResult: any;
    selectedTransitOption: any;
    setSelectedTransitOption: (option: any) => void;
}

export default function TransitOptions({
    analysisResult,
    selectedTransitOption,
    setSelectedTransitOption
}: TransitOptionsProps) {
    return (
        // پنل اسکرول‌دار شیشه‌ای راست با ارتفاع ثابت ۴۰۰ پیکسل
        <div className="lg:col-span-4 flex flex-col gap-4 h-[400px] overflow-y-auto pr-1 custom-scrollbar">
            {analysisResult ? (
                analysisResult.transit_options.map((option: any) => {
                    let isSelected = selectedTransitOption?.id === option.id;

                    let borderColor = isSelected ? "border-[#51d2c2] shadow-[0_0_15px_rgba(81,210,194,0.15)]" : "border-[#1a353d]";
                    let icon = "local_shipping";
                    let iconColor = "text-[#f59e0b]";

                    if (option.transport_type === 'AIR') {
                        borderColor = isSelected ? "border-[#ec4899] shadow-[0_0_15px_rgba(236,72,153,0.15)]" : "border-pink-500/20";
                        icon = "flight";
                        iconColor = "text-[#ec4899]";
                    } else if (option.transport_type === 'SEA') {
                        borderColor = isSelected ? "border-[#3b82f6] shadow-[0_0_15px_rgba(59,130,246,0.15)]" : "border-blue-500/20";
                        icon = "sailing";
                        iconColor = "text-[#3b82f6]";
                    } else if (option.transport_type === 'COMBINED') {
                        borderColor = isSelected ? "border-[#71efde] shadow-[0_0_15px_rgba(113,239,222,0.15)]" : "border-teal-500/20";
                        icon = "alt_route";
                        iconColor = "text-[#71efde]";
                    }

                    return (
                        <div
                            key={option.id}
                            onClick={() => setSelectedTransitOption(option)}
                            // 🌟 افزودن کلاس shrink-0 مانع از فشرده شدن کارت‌ها می‌شود و اسکرول پنل فعال می‌گردد
                            className={`glass-panel rounded-xl p-4 border ${borderColor} transition-all relative overflow-hidden group cursor-pointer shrink-0`}
                        >
                            <div className="flex justify-between items-start mb-3 relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#14212a] flex items-center justify-center border border-[#1a353d]">
                                        <span className={`material-symbols-outlined ${iconColor}`}>{icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#d7e4f1] text-md">{option.transport_type_display}</h3>
                                        <p className="text-xs text-[#bbc9c6]">
                                            {isSelected ? "Active Filter on Map" : "Click to show on Map"}
                                        </p>
                                    </div>
                                </div>
                                {option.is_recommended && (
                                    <span className="px-2 py-1 bg-green-500/20 text-[#71efde] rounded text-[10px] border border-green-500/30 font-bold">Recommended</span>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4 relative z-10 border-b border-[#1a353d]/50 pb-3">
                                <div>
                                    <p className="text-xs text-[#bbc9c6] mb-1">Est. Transit</p>
                                    <p className="font-bold text-[#d7e4f1] text-lg">{option.min_days}-{option.max_days} Days</p>
                                </div>
                                <div>
                                    <p className="text-xs text-[#bbc9c6] mb-1">Cost Index</p>
                                    <div className="flex text-yellow-500">
                                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>attach_money</span>
                                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: option.cost_index !== 'LOW' ? "'FILL' 1" : "" }}>attach_money</span>
                                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: option.cost_index === 'HIGH' ? "'FILL' 1" : "" }}>attach_money</span>
                                    </div>
                                </div>
                            </div>

                            {/* متن توضیحات پویا و خوانای بنادر/پایانه‌ها با اعمال تراز متنی مناسب */}
                            <p className="text-xs text-[#94a3b8] mt-2 relative z-10 leading-relaxed text-justify">
                                {option.description}
                            </p>
                        </div>
                    );
                })
            ) : (
                <div className="glass-panel rounded-xl p-8 text-center text-[#94a3b8] flex flex-col items-center justify-center h-full border border-[#1a353d]">
                    <span className="material-symbols-outlined text-4xl mb-2">map</span>
                    <p className="text-sm">برای مشاهده‌ی زمان و هزینه مسیرها، ابتدا مبدا و مقصد را تحلیل کنید.</p>
                </div>
            )}
        </div>
    );
}