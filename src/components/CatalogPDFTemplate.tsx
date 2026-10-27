// src/components/CatalogPDFTemplate.tsx
import React from 'react';
import { Product } from '../services/aiService';

interface CatalogPDFTemplateProps {
    products: Product[];
    profile?: any; // اضافه کردن علامت سوال برای اختیاری (Optional) شدن پروپرتی
}

export default function CatalogPDFTemplate({ products, profile }: CatalogPDFTemplateProps) {
    const chunkProducts = (arr: Product[], size: number) => {
        const chunks = [];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    };

    const productPages = chunkProducts(products, 4);

    // استخراج فیلدهای کاربری با مقادیر پیش‌فرض حمایتی
    const companyName = profile?.international_name || profile?.persian_name || "AZProvider Partner";
    const repName = profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : "Authorized Broker";
    const ceoName = profile?.ceo_name || repName;
    const location = profile ? `${profile.city || ''}, ${profile.country || ''}`.trim() : "Tehran, Iran";
    const refCode = profile?.ref_code || "------";

    return (
        <div id="catalog-pdf-template" className="font-sans text-gray-800" dir="rtl">

            {/* ----------------- صفحه اول: کاور کاتالوگ (Cover Page) ----------------- */}
            <div className="pdf-page w-[794px] h-[1123px] bg-white relative flex flex-col justify-between p-12 overflow-hidden border border-gray-100 shrink-0">

                {/* هدر سرمه‌ای مجهز به مشخصات اختصاصی صادرکننده */}
                <div className="flex justify-between items-start border-b-4 border-yellow-500 pb-6">
                    <div>
                        <div className="flex items-center gap-3">
                            {profile?.logo ? (
                                <img src={profile.logo} alt="Logo" className="w-12 h-12 rounded-full object-cover shadow" />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-800 to-indigo-950 flex items-center justify-center text-white font-black text-sm shadow-md">
                                    {companyName.slice(0, 3).toUpperCase()}
                                </div>
                            )}
                            <div>
                                <h1 className="font-black text-2xl text-blue-900 tracking-tight">{companyName}</h1>
                                <p className="text-xs text-gray-400">Official Catalog / صادرکننده کاتالوگ</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-left" dir="ltr">
                        <h2 className="text-2xl font-black text-blue-950">Global Wholesale Market</h2>
                        <p className="text-xs text-yellow-600 font-extrabold tracking-wide">In Alliance with AZProvider</p>
                    </div>
                </div>

                {/* بخش درباره ما و معرفی صادرکننده تجاری */}
                <div className="grid grid-cols-2 gap-10 my-auto items-stretch">

                    {/* ستون راست: اطلاعات صادرکننده رسمی کاتالوگ */}
                    <div className="space-y-4 border-l-2 pl-6 border-gray-100 flex flex-col justify-center bg-gray-50/50 p-6 rounded-3xl">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-yellow-500 rounded"></span>
                            <h3 className="text-lg font-black text-blue-950">مشخصات تجاری / Issued By</h3>
                        </div>
                        <ul className="text-xs space-y-3 text-gray-700 font-bold">
                            <li className="flex justify-between border-b pb-1.5">
                                <span className="text-gray-400">نام شرکت/برند:</span>
                                <span className="text-blue-900">{companyName}</span>
                            </li>
                            <li className="flex justify-between border-b pb-1.5">
                                <span className="text-gray-400">نماینده مجاز:</span>
                                <span className="text-blue-900">{repName}</span>
                            </li>
                            <li className="flex justify-between border-b pb-1.5">
                                <span className="text-gray-400">نقش تجاری:</span>
                                <span className="text-blue-900">{profile?.business_role?.[0]?.title || "Broker / کارگزار"}</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="text-gray-400">موقعیت فعالیت:</span>
                                <span className="text-blue-900">{location}</span>
                            </li>
                        </ul>
                    </div>

                    {/* ستون چپ: درباره ما و اهداف پلتفرم */}
                    <div className="space-y-4 flex flex-col justify-center">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-blue-600 rounded"></span>
                            <h3 className="text-lg font-black text-blue-950">درباره ما / About Us</h3>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed text-justify font-medium">
                            محصولات معرفی شده در این کاتالوگ تحت نظارت و قوانین تجاری پلتفرم بین‌المللی تامین‌کنندگان azprovider.com ارائه و ترخیص می‌گردند. هدف ما اتصال امن و مستقیم خریداران به تامین‌کنندگان رسمی در سراسر جهان است.
                        </p>
                        <p className="text-xs text-gray-400 leading-relaxed text-justify" dir="ltr">
                            The products listed in this catalog are supplied through the official trading channel of azprovider.com. We enable seamless connections and operational safety for global wholesalers.
                        </p>
                    </div>
                </div>

                {/* پاصفحه مجهز به کد معرف اختصاصی کاربر جهت ردیابی سفارشات کاتالوگ */}
                <div className="h-52 bg-gradient-to-r from-blue-950 to-indigo-900 rounded-3xl relative flex items-center justify-between px-10 text-white shadow-xl overflow-hidden">
                    <div className="z-10 space-y-1">
                        <h4 className="text-2xl font-black text-yellow-400">به شبکه تجارت جهانی بپیوندید</h4>
                        <p className="text-xs text-gray-300 font-medium">کد ارجاع اختصاصی صادرکننده کاتالوگ جهت بررسی و ثبت سفارش</p>
                        <div className="mt-2 inline-block bg-white/10 px-3 py-1 rounded-lg border border-white/20 text-xs font-mono font-bold tracking-widest text-yellow-400">
                            REFERRAL CODE: {refCode}
                        </div>
                    </div>
                    {/* وکتور کشتی چاپی با کیفیت فوق‌العاده بالا */}
                    <div className="w-48 h-full flex items-center justify-center opacity-20 transform translate-x-4">
                        <svg viewBox="0 0 100 100" className="w-32 h-32 fill-current">
                            <path d="M10,75 L90,75 L85,85 L15,85 Z" />
                            <rect x="25" y="55" width="50" height="20" />
                            <rect x="35" y="40" width="30" height="15" />
                            <line x1="50" y1="40" x2="50" y2="20" stroke="white" strokeWidth="4" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* ----------------- صفحات دوم به بعد: کالاها (Dynamic Product Pages) ----------------- */}
            {productPages.map((pageProducts, pageIdx) => (
                <div key={pageIdx} className="pdf-page w-[794px] h-[1123px] bg-white relative flex flex-col justify-between p-12 overflow-hidden border border-gray-100 shrink-0">

                    <div className="flex justify-between items-center border-b-2 pb-4 mb-8">
                        <span className="text-xs text-gray-400 font-bold">کاتالوگ محصولات رسمی - {companyName}</span>
                        <span className="text-xs text-blue-950 font-black bg-blue-50 px-3 py-1 rounded-full">صفحه {pageIdx + 1} از {productPages.length}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-8 flex-1 content-start">
                        {pageProducts.map((prod) => (
                            <div key={prod.id} className="border border-gray-100 rounded-3xl p-6 bg-white flex flex-col justify-between h-[390px] shadow-md hover:shadow-xl transition-shadow">
                                <div>
                                    <div className="w-full h-44 bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden mb-4 relative flex items-center justify-center">
                                        {prod.image ? (
                                            <img
                                                src={prod.image}
                                                alt={prod.name || prod.title}
                                                crossOrigin="anonymous"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-5xl text-gray-300">📦</span>
                                        )}
                                    </div>

                                    <h4 className="font-extrabold text-base text-gray-950 line-clamp-1 mb-2">
                                        {prod.name || prod.title || "کالای ثبت شده"}
                                    </h4>
                                    <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed text-justify">
                                        {prod.description || "توضیحات و جزئیات فنی این کالا ثبت نشده است."}
                                    </p>
                                </div>

                                <div className="flex justify-between items-center border-t border-gray-50 pt-4 mt-4">
                                    <span className="text-[10px] text-gray-400 bg-gray-100 px-2.5 py-1 rounded-md font-mono">شناسه: #{prod.id}</span>
                                    <span className="text-sm font-black text-blue-800 bg-blue-50 px-3 py-1.5 rounded-xl">
                                        {prod.price ? `${prod.price}` : "تماس بگیرید / Call us"}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-4 mt-8 text-center">
                        <p className="text-[10px] text-gray-400 font-medium">تولید شده توسط سیستم هوشمند کاتالوگ ساز پلتفرم بین‌المللی AZProvider.com</p>
                    </div>
                </div>
            ))}

            {/* ----------------- صفحه آخر: اطلاعات تماس و گام‌ها (Contact Page) ----------------- */}
            <div className="pdf-page w-[794px] h-[1123px] bg-white relative flex flex-col justify-between p-12 overflow-hidden border border-gray-100 shrink-0">

                <div className="my-auto space-y-12">
                    <div className="text-center space-y-2">
                        <h3 className="text-2xl font-black text-blue-950">How to Get Started? / چگونه شروع کنیم؟</h3>
                        <p className="text-xs text-gray-400">۳ گام ساده برای آغاز همکاری با {companyName}</p>

                        <div className="grid grid-cols-3 gap-6 mt-8">
                            <div className="p-6 border rounded-3xl bg-blue-50/10 border-blue-100 text-center shadow-sm">
                                <span className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mx-auto mb-3">1</span>
                                <p className="text-sm font-extrabold text-gray-800">Register</p>
                                <p className="text-[10px] text-gray-400 mt-1">ثبت نام رایگان و سریع در پلتفرم</p>
                            </div>
                            <div className="p-6 border rounded-3xl bg-blue-50/10 border-blue-100 text-center shadow-sm">
                                <span className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mx-auto mb-3">2</span>
                                <p className="text-sm font-extrabold text-gray-800">Explore</p>
                                <p className="text-[10px] text-gray-400 mt-1">بررسی کالاها و لیست‌های تامین</p>
                            </div>
                            <div className="p-6 border rounded-3xl bg-blue-50/10 border-blue-100 text-center shadow-sm">
                                <span className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mx-auto mb-3">3</span>
                                <p className="text-sm font-extrabold text-gray-800">Connect</p>
                                <p className="text-[10px] text-gray-400 mt-1">اتصال مستقیم به {repName}</p>
                            </div>
                        </div>
                    </div>

                    {/* بخش اطلاعات تماس بر اساس جزئیات پروفایل کاربر */}
                    <div className="grid grid-cols-2 gap-10 border-t border-gray-100 pt-10">
                        <div className="space-y-4">
                            <h3 className="text-lg font-black text-blue-950 border-r-4 border-blue-600 pr-2">Contact Us / اطلاعات تماس</h3>
                            <ul className="text-xs space-y-4 text-gray-600 font-medium">
                                <li className="flex items-start gap-2.5">
                                    <span className="text-blue-600 text-base">📍</span>
                                    <span className="leading-relaxed">آدرس: دفتر مرکزی {companyName}، منطقه {location}</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <span className="text-blue-600 text-base">👤</span>
                                    <span>مدیر عامل / نماینده: {ceoName}</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <span className="text-blue-600 text-base">🔑</span>
                                    <span>کد معرف ثبت سفارش: <span className="font-mono font-bold text-blue-700">{refCode}</span></span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <span className="text-blue-600 text-base">🌐</span>
                                    <span>پلتفرم ثبت سفارش مستقیم: www.azprovider.com</span>
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col items-center justify-center bg-blue-50/20 rounded-3xl p-6 border border-blue-50">
                            <div className="w-28 h-28 bg-white border-2 border-gray-100 p-2.5 flex items-center justify-center rounded-2xl mb-4 shadow-md">
                                <span className="text-4xl">📱</span>
                            </div>
                            <p className="text-xs font-black text-blue-950">Referral Sign up</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">Use Ref Code: {refCode}</p>
                        </div>
                    </div>
                </div>

                {/* فوتر پایانی سرمه‌ای */}
                <div className="bg-gradient-to-r from-blue-950 to-indigo-950 text-white p-6 rounded-3xl flex justify-between items-center shadow-lg">
                    <div>
                        <h4 className="font-black text-sm">{companyName}</h4>
                        <p className="text-[10px] text-gray-400">Global Wholesale Partner Platform</p>
                    </div>
                    <span className="text-xs text-yellow-500 font-black">www.azprovider.com</span>
                </div>
            </div>

        </div>
    );
}