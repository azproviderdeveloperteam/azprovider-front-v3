// src/app/logistics/page.tsx (نسخه نهایی مجهز به سایدبار دکمه و مودال هوشمند شبکه کشورها)

"use client";

import React, { useState, useEffect } from 'react';
import { logisticsService } from '../../services/logisticsService';

// ایمپورت ساب‌کامپوننت‌های تفکیک‌شده جدید
import TransitRouter from './components/TransitRouter';
import LogisticsMap from './components/LogisticsMap';
import TransitOptions from './components/TransitOptions';
import CustomsRegulations from './components/CustomsRegulations';
import HubNavigatorTable from './components/HubNavigatorTable';
import CountryIntelligenceModal from './components/CountryIntelligenceModal'; // 🌟 ایمپورت مودال جدید کشورها

export default function LogisticsPage() {
    // ۱. مدیریت تب‌ها و لودینگ‌های پایانه‌ها در پایین صفحه
    const [activeTab, setActiveTab] = useState<'aviation' | 'maritime' | 'overland' | 'railway'>('aviation');
    const [hubsList, setHubsList] = useState<any[]>([]);
    const [isTabLoading, setIsTabLoading] = useState(false);

    // پارامترهای پیج‌بندی (Pagination)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    // پارامترهای ارتباطی نقشه تعاملی لایو با ارکستر اصلی
    const [mapInstance, setMapInstance] = useState<any>(null);
    const [markersGroup, setMarkersGroup] = useState<any>(null);
    const [routesGroup, setRoutesGroup] = useState<any>(null);

    // ۲. مدیریت فرم و تحلیل ترانزیت
    const [countriesList, setCountriesList] = useState<any[]>([]);
    const [isCountriesLoading, setIsCountriesLoading] = useState(false);
    const [originCode, setOriginCode] = useState('CN');
    const [destinationCode, setDestinationCode] = useState('IR');
    const [hsCodeQuery, setHsCodeQuery] = useState('');
    const [hsCodeResults, setHsCodeResults] = useState<any[]>([]);
    const [selectedHS, setSelectedHS] = useState<any>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // ۳. نتایج ترانزیت فعال روی نقشه و مدیریت فیلترهای نقشه (تک‌مسیر یا گروهی)
    const [analysisResult, setAnalysisResult] = useState<any>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [selectedTransitOption, setSelectedTransitOption] = useState<any>(null);
    const [mapFilter, setMapFilter] = useState<'single' | 'AIR' | 'SEA' | 'ROAD'>('single'); // متغیر کنترل فیلترهای نقشه
    const [isCountryModalOpen, setIsCountryModalOpen] = useState(false); // 🌟 متغیر مدیریت باز/بسته بودن مودال کشورها

    // دریافت خودکار لیست کشورها در لود اول صفحه
    useEffect(() => {
        const fetchCountries = async () => {
            setIsCountriesLoading(true);
            try {
                const response = await logisticsService.getCountries();
                setCountriesList(response.data);

                if (response.data.length > 0) {
                    const hasCN = response.data.find((c: any) => c.code === 'CN');
                    const hasIR = response.data.find((c: any) => c.code === 'IR');
                    setOriginCode(hasCN ? 'CN' : response.data[0].code);
                    setDestinationCode(hasIR ? 'IR' : response.data[0].code);
                }
            } catch (error) {
                console.error("خطا در دریافت لیست کشورها:", error);
            } finally {
                setIsCountriesLoading(false);
            }
        };
        fetchCountries();
    }, []);

    // ۴. آنالیز اتوماتیک ترانزیت به محض تغییر مبدا یا مقصد (کد گمرکی اختیاری شد)
    useEffect(() => {
        if (originCode && destinationCode) {
            handleAnalyzeTransit();
        }
    }, [originCode, destinationCode, selectedHS]);

    // ریست کردن فیلتر نقشه به حالت کارت فعال به محض دریافت نتایج یا انتخاب کشورهای جدید
    useEffect(() => {
        setMapFilter('single');
    }, [analysisResult]);

    const handleAnalyzeTransit = async () => {
        setIsAnalyzing(true);
        try {
            // ارسال آیدی کد گمرکی فقط در صورت انتخاب شدن
            const hsId = selectedHS ? selectedHS.id : '';
            const response = await logisticsService.analyzeTransit(originCode, destinationCode, hsId);
            setAnalysisResult(response.data);

            if (response.data.transit_options && response.data.transit_options.length > 0) {
                setSelectedTransitOption(response.data.transit_options[0]);
            } else {
                setSelectedTransitOption(null);
            }
        } catch (error) {
            console.error("خطا در محاسبه مسیر ترانزیت:", error);
            setAnalysisResult(null);
            setSelectedTransitOption(null);
        } finally {
            setIsAnalyzing(false);
        }
    };

    // لود خودکار اطلاعات تب‌های پایانی
    useEffect(() => {
        fetchHubData(activeTab);
        setCurrentPage(1);
        setSelectedTransitOption(null);
    }, [activeTab]);

    const fetchHubData = async (tab: typeof activeTab) => {
        setIsTabLoading(true);
        try {
            let response;
            if (tab === 'aviation') {
                response = await logisticsService.getAviationIntelligence();
                setHubsList(response.data.hubs || []);
            } else if (tab === 'maritime') {
                response = await logisticsService.getSeaPorts();
                setHubsList(response.data || []);
            } else if (tab === 'overland') {
                response = await logisticsService.getRoadHubs();
                setHubsList(response.data || []);
            } else if (tab === 'railway') {
                response = await logisticsService.getRailHubs();
                setHubsList(response.data || []);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsTabLoading(false);
        }
    };

    // سرچ خودکار کدهای HS گمرکی
    const handleHSCodeSearch = async (val: string) => {
        setHsCodeQuery(val);
        setSelectedHS(null);

        if (val.trim().length > 1) {
            setIsSearching(true);
            setIsDropdownOpen(true);
            try {
                const response = await logisticsService.autocompleteHSCode(val);
                setHsCodeResults(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsSearching(false);
            }
        } else {
            setHsCodeResults([]);
            setIsDropdownOpen(false);
        }
    };

    // زوم نقشه به محض کلیک کاربر روی هر ردیف جدول
    const handleRowClick = (hub: any) => {
        if (mapInstance && !selectedTransitOption) {
            const lat = hub.coords ? hub.coords[0] : hub.latitude;
            const lng = hub.coords ? hub.coords[1] : hub.longitude;
            if (lat !== undefined && lng !== undefined) {
                mapInstance.setView([lat, lng], 7, { animate: true });
            }
        }
    };

    // محاسبات ریاضی بخش پیج‌بندی کلاینت (فقط ۵ آیتم فعال)
    const totalPages = Math.ceil(hubsList.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentHubs = hubsList.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="font-sans antialiased overflow-x-hidden min-h-screen flex flex-col bg-[#08151e] text-[#d7e4f1] pt-20">

            <style jsx global>{`
                .glass-panel {
                  background: rgba(26, 53, 61, 0.4);
                  backdrop-filter: blur(24px);
                  -webkit-backdrop-filter: blur(24px);
                  border: 1px solid #1a353d;
                }
                .glow-button {
                  box-shadow: 0 0 15px rgba(81, 210, 194, 0.3);
                  transition: all 0.3s ease;
                }
                .glow-button:hover {
                  box-shadow: 0 0 25px rgba(81, 210, 194, 0.5);
                  transform: translateY(-1px);
                }
                .dot-indicator {
                  height: 8px;
                  width: 8px;
                  border-radius: 50%;
                  display: inline-block;
                  box-shadow: 0 0 8px currentColor;
                }
                .hide-scrollbar::-webkit-scrollbar {
                  display: none;
                }
                .hide-scrollbar {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
                .leaflet-popup-content-wrapper {
                  background: #101d26 !important;
                  color: #d7e4f1 !important;
                  border: 1px solid #1a353d;
                }
                .leaflet-popup-tip {
                  background: #101d26 !important;
                }

                /* کاستومایز فوق‌العاده شیک و نئونی اسکرول‌بار پنل سمت راست */
                .custom-scrollbar::-webkit-scrollbar {
                  width: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                  background: rgba(26, 53, 61, 0.1);
                  border-radius: 9999px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background: #1a353d;
                  border-radius: 9999px;
                  transition: all 0.3s ease;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                  background: #51d2c2; /* رنگ روشن نئونی در زمان هاور ماوس */
                }
            `}</style>

            {/* TopNavBar */}
            <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-8 h-16 bg-surface-glass backdrop-blur-md border-b border-[#1a353d] shadow-sm" style={{ backgroundColor: 'rgba(26, 53, 61, 0.4)' }}>
                <div className="flex items-center gap-4">
                    <span className="font-bold text-xl text-[#71efde] tracking-tight">LogiGlass B2B</span>
                </div>
                <div className="hidden md:flex items-center gap-8 h-full">
                    <div className="h-full flex items-center border-b-2 border-[#71efde]">
                        <a className="text-[#71efde] font-bold" href="#">Dashboard</a>
                    </div>
                    <div className="h-full flex items-center border-b-2 border-transparent">
                        <a className="text-[#bbc9c6] hover:bg-[#1f2b35] transition-colors px-4 py-2 rounded-md" href="#">Shipments</a>
                    </div>
                    <div className="h-full flex items-center border-b-2 border-transparent">
                        <a className="text-[#bbc9c6] hover:bg-[#1f2b35] transition-colors px-4 py-2 rounded-md" href="#">Routes</a>
                    </div>
                </div>
                {/* <div className="flex items-center gap-4">
                    <div className="relative hidden sm:block">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#869490]">search</span>
                        <input
                            className="bg-[#2a3640] border-[#1a353d] text-[#d7e4f1] rounded-full pl-10 pr-4 py-1.5 focus:ring-1 focus:ring-[#71efde] focus:border-[#71efde] outline-none text-sm placeholder-[#869490] w-48 focus:w-64 transition-all"
                            placeholder="Search..."
                            type="text"
                        />
                    </div>
                    <button className="text-[#bbc9c6] hover:text-[#71efde] transition-colors">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>
                    <button className="text-[#bbc9c6] hover:text-[#71efde] transition-colors">
                        <span className="material-symbols-outlined">settings</span>
                    </button>
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-[#1a353d]">
                        <img
                            alt="User profile"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbsTRnSqL3yluzBEgA4cZtcjiVaeRKU0oY-uR_rw_8N_BeLOXBgNcaC2Xtyqe_qlFduJ8qGqPxIqWKfgNC1TPdlpv7sxppdnKgWy81O0Rz6PK0A7I2e2GjA8dv7oPhnABiCqF2y13v6R1yWi45H-wTaPrElAs3IfJbdvKFxUyOTfJGPmxGxTNKICaz5vuyUjV7DwofirWrGh4KSKYbm4REFLIJiTzB48gkXqv6tILmDlYjGGHC9i2iYPTKl3oDkGq1znE8VmX__R6g"
                        />
                    </div>
                </div> */}
            </nav>

            {/* SideNavBar */}
            <aside className="hidden lg:flex flex-col py-8 gap-4 fixed left-0 top-0 h-full w-64 bg-[#0c1922] border-r border-[#1a353d] shadow-lg z-40 pt-24">
                <div className="px-6 mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#1a353d]">
                        <img
                            alt="Organization Logo"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7gSJUm8pKd9t5b3D_o1bfkv2SdAQlYSv5iOh9gnflmIVYCrLdQ_joGBC3ZRZ9oKD-82n97I3ZiTvyFsKLIBt7Cah9kXfRFHobN9LSB9YtQAoML_QJJI3FKjhjrMpZ_U3npMlyWo-xC7M2zQCkZwbQKWCLfgrpE1E4bVuvu6i630Xw99ZMbhtEG_hfB56jlV7dNLowlN54kyj7XI3EWpKJgrVEMGrL5VEErngZ4WDcUle4yEho_N3tEbIc786mG6CoAWM2S8dCUyVU"
                        />
                    </div>
                    <div>
                        <h2 className="font-bold text-[#71efde] text-md">Global Logistics</h2>
                        <p className="text-xs text-[#94a3b8]">Enterprise Tier</p>
                    </div>
                </div>
                <div className="px-4 mb-4">
                    <button className="w-full bg-[#51d2c2] text-[#00201c] font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 glow-button">
                        <span className="material-symbols-outlined text-sm">add</span>
                        New Shipment
                    </button>
                </div>

                <nav className="flex-1 px-4 flex flex-col gap-2">
                    {/* <a className="flex items-center gap-3 px-4 py-3 bg-[#0566d9] text-[#e6ecff] rounded-full shadow-[0_4px_10px_rgba(34,233,241,0.15)]" href="#">
                        <span className="material-symbols-outlined">dashboard</span>
                        <span>Dashboard</span>
                    </a> */}

                    {/* 🌟 دکمه‌ی نئونی و زیبای شبکه کشورها با آیکون پرچم */}
                    <button
                        onClick={() => setIsCountryModalOpen(true)}
                        className="flex items-center gap-3 w-full px-4 py-3 text-[#bbc9c6] hover:text-[#71efde] hover:bg-[#1f2b35] transition-all rounded-full"
                    >
                        <span className="material-symbols-outlined">flag</span>
                        <span className="font-label-sm text-label-sm font-semibold">Countries Network</span>
                    </button>
                </nav>
            </aside>

            {/* Main Content Canvas */}
            <main className="flex-1 lg:ml-64 pt-6 px-4 lg:px-8 pb-24 lg:pb-8 flex flex-col gap-8 max-w-[1600px] mx-auto w-full">

                {/* ۱. ماژول فیلتر و روتر ترانزیت بالا */}
                <TransitRouter
                    originCode={originCode}
                    setOriginCode={setOriginCode}
                    destinationCode={destinationCode}
                    setDestinationCode={setDestinationCode}
                    hsCodeQuery={hsCodeQuery}
                    handleHSCodeSearch={handleHSCodeSearch}
                    isSearching={isSearching}
                    isDropdownOpen={isDropdownOpen}
                    setIsDropdownOpen={setIsDropdownOpen}
                    hsCodeResults={hsCodeResults}
                    setSelectedHS={setSelectedHS}
                    setHsCodeQuery={setHsCodeQuery}
                    handleAnalyzeTransit={handleAnalyzeTransit}
                    isAnalyzing={isAnalyzing}
                    countriesList={countriesList}
                    isCountriesLoading={isCountriesLoading}
                />


                {/* HERO Map & Comparison */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* ۲. ماژول نقشه تعاملی لایو مجهز به کنترل فیلترهای اختصاصی */}
                    <LogisticsMap
                        currentHubs={currentHubs}
                        analysisResult={analysisResult}
                        selectedTransitOption={selectedTransitOption}
                        mapFilter={mapFilter}  // اتصال متغیر فیلتر فعال به نقشه
                        setMapFilter={setMapFilter}  // اتصال متد تغییردهنده فیلتر به نقشه
                        onMapReady={(map: any, mGroup: any, rGroup: any) => {
                            setMapInstance(map);
                            setMarkersGroup(mGroup);
                            setRoutesGroup(rGroup);
                        }}
                    />

                    {/* فیلترهای پویا با کلیک روی کارت‌ها */}
                    <TransitOptions
                        analysisResult={analysisResult}
                        selectedTransitOption={selectedTransitOption}
                        setSelectedTransitOption={setSelectedTransitOption}
                    />
                </section>
                {/* ۴. ماژول مقایسه قوانین گمرکی صادرات و واردات */}
                <CustomsRegulations analysisResult={analysisResult} />

                {/* ۵. ماژول جدول تب‌بندی و پیج‌بندی پایانه‌ها */}
                <HubNavigatorTable
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    isTabLoading={isTabLoading}
                    currentHubs={currentHubs}
                    hubsList={hubsList}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                    indexOfFirstItem={indexOfFirstItem}
                    indexOfLastItem={indexOfLastItem}
                    handleRowClick={handleRowClick}
                />
            </main>

            {/* Footer */}
            <footer className="w-full py-4 flex justify-between items-center px-8 bg-[#030f18] border-t border-[#1a353d] mt-auto lg:ml-64 lg:w-[calc(100%-256px)] z-20 relative">
                <div className="text-xs text-[#d7e4f1]">
                    © 2026 LogiGlass Global. All rights reserved.
                </div>
                <div className="flex gap-6 text-xs">
                    <a className="text-[#94a3b8] hover:text-[#71efde] transition-colors" href="#">Privacy Policy</a>
                    <a className="text-[#94a3b8] hover:text-[#71efde] transition-colors" href="#">Terms of Service</a>
                    <a className="text-[#94a3b8] hover:text-[#71efde] transition-colors" href="#">Compliance</a>
                    <a className="text-[#94a3b8] hover:text-[#71efde] transition-colors" href="#">API Docs</a>
                </div>
            </footer>

            {/* 🌟 فراخوانی مودال هوشمند شبکه کشورها */}
            <CountryIntelligenceModal
                isOpen={isCountryModalOpen}
                onClose={() => setIsCountryModalOpen(false)}
                countriesList={countriesList}
            />
        </div>
    );
}