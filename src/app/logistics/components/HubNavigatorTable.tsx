import React from 'react';

interface HubNavigatorTableProps {
    activeTab: 'aviation' | 'maritime' | 'overland' | 'railway';
    setActiveTab: (tab: any) => void;
    isTabLoading: boolean;
    currentHubs: any[];
    hubsList: any[];
    currentPage: number;
    setCurrentPage: (page: any) => void;
    totalPages: number;
    indexOfFirstItem: number;
    indexOfLastItem: number;
    handleRowClick: (hub: any) => void;
}

export default function HubNavigatorTable({
    activeTab, setActiveTab,
    isTabLoading, currentHubs, hubsList,
    currentPage, setCurrentPage, totalPages,
    indexOfFirstItem, indexOfLastItem,
    handleRowClick
}: HubNavigatorTableProps) {
    return (
        <section className="flex flex-col gap-4">
            <div className="flex overflow-x-auto pb-2 gap-3 hide-scrollbar">
                {(['aviation', 'maritime', 'overland', 'railway'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition ${activeTab === tab ? 'bg-[#51d2c2]/20 text-[#51d2c2] border border-[#51d2c2]/50 shadow-[0_0_15px_rgba(81,210,194,0.15)]' : 'bg-[#1f2b35] text-[#bbc9c6] border border-[#1a353d] hover:bg-[#2a3640]'}`}
                    >
                        {tab === 'aviation' && 'Aviation Hubs'}
                        {tab === 'maritime' && 'Sea Port Hubs'}
                        {tab === 'overland' && 'Overland dry ports'}
                        {tab === 'railway' && 'Rail Terminals'}
                    </button>
                ))}
            </div>

            <div className="glass-panel rounded-xl border border-[#1a353d] overflow-hidden">
                <div className="overflow-x-auto">
                    {isTabLoading ? (
                        <div className="p-12 text-center text-gray-400">در حال بارگذاری اطلاعات پایانه‌ها...</div>
                    ) : (
                        <>
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#1f2b35] border-b border-[#1a353d] text-xs text-[#bbc9c6]">
                                        <th className="p-4 font-normal">Hub Code</th>
                                        <th className="p-4 font-normal">Location (Fa)</th>
                                        <th className="p-4 font-normal">Coordinates</th>
                                        <th className="p-4 font-normal">Active Carriers</th>
                                        <th className="p-4 font-normal text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm text-[#d7e4f1] divide-y divide-[#1a353d]/50">
                                    {currentHubs.length > 0 ? (
                                        currentHubs.map((hub: any, idx: number) => {
                                            const code = hub.name;
                                            const location = hub.name_fa || hub.fa;
                                            const coordsStr = hub.coords
                                                ? `${hub.coords[0]}° N, ${hub.coords[1]}° E`
                                                : `${hub.latitude}° N, ${hub.longitude}° E`;

                                            const carriers = hub.active_carriers_details
                                                ? hub.active_carriers_details.map((c: any) => c.name)
                                                : (hub.airlines || []);

                                            return (
                                                <tr
                                                    key={idx}
                                                    onClick={() => handleRowClick(hub)}
                                                    className="hover:bg-[#14212a]/50 transition-colors cursor-pointer"
                                                >
                                                    <td className="p-4 font-mono text-xs font-bold text-[#51d2c2]">{code}</td>
                                                    <td className="p-4">{location}</td>
                                                    <td className="p-4 text-[#94a3b8] font-mono text-xs">{coordsStr}</td>
                                                    <td className="p-4">
                                                        <div className="flex gap-1 flex-wrap">
                                                            {carriers.length > 0 ? (
                                                                carriers.map((car: string, cIdx: number) => (
                                                                    <div key={cIdx} className="px-1.5 py-0.5 rounded bg-[#1f2b35] border border-[#1a353d] text-[10px] flex items-center justify-center font-mono">
                                                                        {car}
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <span className="text-xs text-gray-500">-</span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-right">
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#71efde]/10 text-[#71efde] border border-[#71efde]/20 text-xs">
                                                            <span className="dot-indicator" style={{ backgroundColor: '#71efde' }}></span> Optimal
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="p-12 text-center text-gray-500">هیچ پایانه‌ی فعالی در این ترانزیت پیدا نشد.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            {totalPages > 1 && (
                                <div className="flex justify-between items-center px-6 py-3 bg-[#1f2b35]/50 border-t border-[#1a353d]">
                                    <span className="text-xs text-[#bbc9c6]">
                                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, hubsList.length)} of {hubsList.length} Hubs
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setCurrentPage((prev: number) => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="px-3 py-1.5 rounded-lg bg-[#1f2b35] text-xs text-[#bbc9c6] border border-[#1a353d] hover:bg-[#2a3640] disabled:opacity-50 disabled:pointer-events-none transition"
                                        >
                                            Previous
                                        </button>
                                        <span className="px-3 py-1.5 text-xs text-[#d7e4f1] font-mono">
                                            Page {currentPage} of {totalPages}
                                        </span>
                                        <button
                                            onClick={() => setCurrentPage((prev: number) => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            className="px-3 py-1.5 rounded-lg bg-[#1f2b35] text-xs text-[#bbc9c6] border border-[#1a353d] hover:bg-[#2a3640] disabled:opacity-50 disabled:pointer-events-none transition"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}