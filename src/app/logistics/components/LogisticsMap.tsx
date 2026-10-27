// src/app/logistics/components/LogisticsMap.tsx (مجهز به کنترل فیلترهای گروهی بالا سمت راست نقشه)

import React, { useEffect, useRef } from 'react';

interface LogisticsMapProps {
    currentHubs: any[];
    analysisResult: any;
    selectedTransitOption: any;
    mapFilter: 'single' | 'AIR' | 'SEA' | 'ROAD';
    setMapFilter: (filter: 'single' | 'AIR' | 'SEA' | 'ROAD') => void;
    onMapReady: (map: any, markersGroup: any, routesGroup: any) => void;
}

export default function LogisticsMap({
    currentHubs,
    analysisResult,
    selectedTransitOption,
    mapFilter,
    setMapFilter,
    onMapReady
}: LogisticsMapProps) {
    const mapRef = useRef<any>(null);
    const mGroupRef = useRef<any>(null);
    const rGroupRef = useRef<any>(null);

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);

        let map: any;
        let mGroup: any;
        let rGroup: any;
        let isDestroyed = false;

        import('leaflet').then((L) => {
            if (isDestroyed) return;

            const container = L.DomUtil.get('map-container');
            if (container !== null) {
                (container as any)._leaflet_id = null;
            }

            map = L.map('map-container').setView([20, 0], 2);

            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; CartoDB'
            }).addTo(map);

            mGroup = L.featureGroup().addTo(map);
            rGroup = L.featureGroup().addTo(map);

            mapRef.current = map;
            mGroupRef.current = mGroup;
            rGroupRef.current = rGroup;

            onMapReady(map, mGroup, rGroup);
        });

        return () => {
            isDestroyed = true;
            document.head.removeChild(link);
            if (map) {
                map.remove();
            }
        };
    }, []);

    // رسم پین‌های ۵ تایی جدول پایین
    useEffect(() => {
        if (mapRef.current && mGroupRef.current && currentHubs.length > 0) {
            import('leaflet').then((L) => {
                mGroupRef.current.clearLayers();

                if (!analysisResult) {
                    currentHubs.forEach((hub: any) => {
                        const lat = hub.coords ? hub.coords[0] : hub.latitude;
                        const lng = hub.coords ? hub.coords[1] : hub.longitude;
                        const name = hub.name_fa || hub.fa || hub.name;

                        if (lat !== undefined && lng !== undefined) {
                            L.marker([lat, lng])
                                .bindPopup(`<div style="color: #d7e4f1; font-size:12px;"><b>${name}</b><br/>Code: ${hub.name}</div>`)
                                .addTo(mGroupRef.current);
                        }
                    });

                    try {
                        const bounds = mGroupRef.current.getBounds();
                        if (bounds.isValid()) {
                            mapRef.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 6 });
                        }
                    } catch (e) {
                        console.error(e);
                    }
                }
            });
        }
    }, [currentHubs, analysisResult]);

    // 🌟 رسم هوشمند مسیرهای تکی یا گروهی بر اساس فیلترهای بالا سمت راست نقشه
    useEffect(() => {
        if (mapRef.current && rGroupRef.current && analysisResult) {
            import('leaflet').then((L) => {
                rGroupRef.current.clearLayers();
                if (mGroupRef.current) mGroupRef.current.clearLayers();

                const options = analysisResult.transit_options || [];

                // تشخیص روت‌هایی که باید همزمان روی نقشه کشیده شوند بر اساس دکمه فعال
                let routesToDraw: any[] = [];
                if (mapFilter === 'single') {
                    const activeOption = selectedTransitOption || options[0];
                    if (activeOption) routesToDraw = [activeOption];
                } else {
                    // فیلتر کردن و کشیدن تمام مسیرهای متعلق به متد ترانزیت کلیک شده (مثلا تمام پروازهای هوایی)
                    routesToDraw = options.filter((opt: any) => opt.transport_type === mapFilter);
                }

                if (routesToDraw.length > 0) {
                    routesToDraw.forEach((option: any, index: number) => {
                        const coords = option.map_coordinates;
                        if (!coords || coords.length < 2) return;

                        let routeColor = '#f59e0b';
                        let isDashed = false;

                        // انحراف جغرافیایی موازی (Offset) فقط در صورتی که چند لاین را همزمان رسم می‌کنیم
                        const offset = routesToDraw.length > 1 ? (index - Math.floor(routesToDraw.length / 2)) * 1.5 : 0;
                        const offsetCoords = coords.map((c: any) => [c[0] + offset, c[1] + offset]);

                        if (option.transport_type === 'AIR') {
                            routeColor = '#ec4899';
                            isDashed = true;
                        } else if (option.transport_type === 'SEA') {
                            routeColor = '#3b82f6';
                        } else if (option.transport_type === 'COMBINED') {
                            routeColor = '#71efde';
                        }

                        const polyline = L.polyline(offsetCoords, {
                            color: routeColor,
                            weight: 5,
                            opacity: 0.9,
                            dashArray: isDashed ? '8, 8' : '0',
                        })
                            .bindPopup(`
              <div style="color: #d7e4f1; font-size:11px; font-family: sans-serif;">
                <b>${option.transport_type_display}</b><br/>
                مدت ترانزیت: ${option.min_days} تا ${option.max_days} روز کاری<br/>
                شاخص هزینه: ${option.cost_index_display}
              </div>
            `)
                            .addTo(rGroupRef.current);

                        // پین مبدا
                        L.marker(coords[0])
                            .bindPopup(`
                <div style="color:#d7e4f1; font-size:12px; font-family: sans-serif; line-height: 1.4;">
                  <b>مبدا ترانزیت:</b><br/>
                  <span style="color: #51d2c2; font-weight: bold;">${option.origin_hub_name || analysisResult.origin_country}</span>
                </div>
              `)
                            .addTo(rGroupRef.current);

                        // پین مقصد
                        L.marker(coords[coords.length - 1])
                            .bindPopup(`
                <div style="color:#d7e4f1; font-size:12px; font-family: sans-serif; line-height: 1.4;">
                  <b>مقصد ترانزیت نهایی:</b><br/>
                  <span style="color: #51d2c2; font-weight: bold;">${option.destination_hub_name || analysisResult.destination_country}</span>
                </div>
              `)
                            .addTo(rGroupRef.current);
                    });

                    // باز کردن اتوماتیک پاپ‌آپ پین مبدا برای اولین مسیر رسم شده
                    const firstDrawCoords = routesToDraw[0].map_coordinates;
                    if (firstDrawCoords && firstDrawCoords.length >= 2) {
                        const firstActiveName = routesToDraw[0].origin_hub_name || analysisResult.origin_country;
                        L.marker(firstDrawCoords[0])
                            .bindPopup(`
                <div style="color:#d7e4f1; font-size:12px; font-family: sans-serif; line-height: 1.4;">
                  <b>مبدا ترانزیت:</b><br/>
                  <span style="color: #51d2c2; font-weight: bold;">${firstActiveName}</span>
                </div>
              `)
                            .addTo(rGroupRef.current)
                            .openPopup();
                    }

                    // زوم دوربین نقشه بر روی کل خطوط رسم شده
                    try {
                        const bounds = rGroupRef.current.getBounds();
                        if (bounds.isValid()) {
                            mapRef.current.fitBounds(bounds, { padding: [80, 80] });
                        }
                    } catch (e) {
                        console.error(e);
                    }
                }
            });
        }
    }, [analysisResult, selectedTransitOption, mapFilter]);

    return (
        <div className="lg:col-span-8 glass-panel rounded-xl overflow-hidden relative border border-[#1a353d] flex flex-col h-[400px] z-10">
            <div id="map-container" className="w-full h-full min-h-[400px]" style={{ zIndex: 1 }}></div>

            {/* 🌟 دکمه‌های فیلتر نئونی و مدرن بالا سمت راست نقشه */}
            {analysisResult && (
                <div className="absolute top-4 right-4 z-20 glass-panel p-1 rounded-lg flex items-center gap-1">
                    <button
                        onClick={() => setMapFilter('single')}
                        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${mapFilter === 'single' ? 'bg-[#51d2c2]/20 text-[#51d2c2] border border-[#51d2c2]/30 shadow-[0_0_10px_rgba(81,210,194,0.15)]' : 'text-[#bbc9c6] hover:text-[#d7e4f1]'}`}
                    >
                        کارت فعال
                    </button>
                    <button
                        onClick={() => setMapFilter('AIR')}
                        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${mapFilter === 'AIR' ? 'bg-[#ec4899]/20 text-[#ec4899] border border-[#ec4899]/30 shadow-[0_0_10px_rgba(236,72,153,0.15)]' : 'text-[#bbc9c6] hover:text-[#d7e4f1]'}`}
                    >
                        ✈️ همه هوایی
                    </button>
                    <button
                        onClick={() => setMapFilter('SEA')}
                        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${mapFilter === 'SEA' ? 'bg-[#3b82f6]/20 text-[#3b82f6] border border-[#3b82f6]/30 shadow-[0_0_10px_rgba(59,130,246,0.15)]' : 'text-[#bbc9c6] hover:text-[#d7e4f1]'}`}
                    >
                        🚢 همه دریایی
                    </button>
                    <button
                        onClick={() => setMapFilter('ROAD')}
                        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${mapFilter === 'ROAD' ? 'bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/30 shadow-[0_0_10px_rgba(245,158,11,0.15)]' : 'text-[#bbc9c6] hover:text-[#d7e4f1]'}`}
                    >
                        🚚 همه جاده‌ای
                    </button>
                </div>
            )}
        </div>
    );
}