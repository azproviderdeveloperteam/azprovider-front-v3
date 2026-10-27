import React from 'react';

interface TransitRouterProps {
    originCode: string;
    setOriginCode: (code: string) => void;
    destinationCode: string;
    setDestinationCode: (code: string) => void;
    hsCodeQuery: string;
    handleHSCodeSearch: (val: string) => void;
    isSearching: boolean;
    isDropdownOpen: boolean;
    setIsDropdownOpen: (open: boolean) => void;
    hsCodeResults: any[];
    setSelectedHS: (hs: any) => void;
    setHsCodeQuery: (query: string) => void;
    handleAnalyzeTransit: () => void;
    isAnalyzing: boolean;
    countriesList: any[];
    isCountriesLoading: boolean;
}

export default function TransitRouter({
    originCode, setOriginCode,
    destinationCode, setDestinationCode,
    hsCodeQuery, handleHSCodeSearch,
    isSearching, isDropdownOpen, setIsDropdownOpen,
    hsCodeResults, setSelectedHS, setHsCodeQuery,
    handleAnalyzeTransit, isAnalyzing,
    countriesList, isCountriesLoading
}: TransitRouterProps) {
    return (
        <section className="flex flex-col gap-4 relative z-10">
            <header>
                <h1 className="text-3xl font-bold text-[#d7e4f1] mb-2">Transit Intelligence</h1>
                <p className="text-[#94a3b8] text-sm max-w-2xl">Global routing optimization and customs compliance forecasting.</p>
            </header>

            <div className="glass-panel rounded-xl p-4 md:p-6 flex flex-col md:flex-row gap-4 items-end relative overflow-visible">
                <div className="w-full md:w-1/4">
                    <label className="block text-xs text-[#bbc9c6] mb-2">Origin Hub (Country)</label>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#869490]">flight_takeoff</span>
                        <select
                            value={originCode}
                            onChange={(e) => setOriginCode(e.target.value)}
                            className="w-full bg-[#2a3640] border border-[#1a353d] rounded-lg pl-10 pr-10 py-2.5 text-[#d7e4f1] appearance-none outline-none focus:ring-1 focus:ring-[#71efde]"
                        >
                            {isCountriesLoading ? (
                                <option>Loading...</option>
                            ) : (
                                countriesList.map((c: any) => (
                                    <option key={c.id} value={c.code}>{c.name} ({c.code})</option>
                                ))
                            )}
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#869490] pointer-events-none">expand_more</span>
                    </div>
                </div>

                <div className="hidden md:flex items-center justify-center w-8 h-10 mt-6 shrink-0">
                    <span className="material-symbols-outlined text-[#1a353d]">arrow_right_alt</span>
                </div>

                <div className="w-full md:w-1/4">
                    <label className="block text-xs text-[#bbc9c6] mb-2">Destination Hub (Country)</label>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#869490]">flight_land</span>
                        <select
                            value={destinationCode}
                            onChange={(e) => setDestinationCode(e.target.value)}
                            className="w-full bg-[#2a3640] border border-[#1a353d] rounded-lg pl-10 pr-10 py-2.5 text-[#d7e4f1] appearance-none outline-none focus:ring-1 focus:ring-[#71efde]"
                        >
                            {isCountriesLoading ? (
                                <option>Loading...</option>
                            ) : (
                                countriesList.map((c: any) => (
                                    <option key={c.id} value={c.code}>{c.name} ({c.code})</option>
                                ))
                            )}
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#869490] pointer-events-none">expand_more</span>
                    </div>
                </div>

                <div className="w-full md:w-1/3 relative z-30">
                    <label className="block text-xs text-[#bbc9c6] mb-2">HS Code Autocomplete</label>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#869490]">category</span>
                        <input
                            className="w-full bg-[#2a3640] border border-[#1a353d] rounded-lg pl-10 pr-4 py-2.5 text-[#d7e4f1] outline-none"
                            placeholder="Type Code or Name (e.g. 8517.12)"
                            type="text"
                            value={hsCodeQuery}
                            onChange={(e) => handleHSCodeSearch(e.target.value)}
                            onFocus={() => setIsDropdownOpen(true)}
                        />
                        {isSearching && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">...</span>}
                    </div>

                    {isDropdownOpen && hsCodeResults.length > 0 && (
                        <ul className="absolute left-0 w-full mt-1 bg-[#101d26] border border-[#1a353d] rounded-lg shadow-xl max-h-60 overflow-y-auto z-50">
                            {hsCodeResults.map((item) => (
                                <li
                                    key={item.id}
                                    onClick={() => {
                                        setSelectedHS(item);
                                        setHsCodeQuery(`${item.code} - ${item.title.substring(0, 30)}...`);
                                        setIsDropdownOpen(false);
                                    }}
                                    className="px-4 py-3 hover:bg-[#1f2b35] cursor-pointer text-xs text-on-surface border-b border-[#1a353d]/50 last:border-none"
                                >
                                    <strong className="text-[#51d2c2]">{item.code}</strong> - {item.title}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <button
                    onClick={handleAnalyzeTransit}
                    disabled={isAnalyzing}
                    className="w-full md:w-auto bg-[#51d2c2] text-[#00201c] font-semibold py-2.5 px-6 rounded-lg glow-button flex-shrink-0"
                >
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Transit & Customs'}
                </button>
            </div>
        </section>
    );
}