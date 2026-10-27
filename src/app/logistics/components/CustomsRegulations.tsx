import React from 'react';

interface CustomsRegulationsProps {
    analysisResult: any;
}

export default function CustomsRegulations({ analysisResult }: CustomsRegulationsProps) {
    if (!analysisResult) return null;

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel rounded-xl p-6 border-l-4 border-l-orange-500">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-orange-500 text-3xl">policy</span>
                        <div>
                            <h3 className="font-bold text-[#d7e4f1] text-lg">Export Rules</h3>
                            <p className="text-xs text-[#94a3b8]">Origin: {analysisResult.origin_country}</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    {analysisResult.regulations.export_rules_origin.length > 0 ? (
                        analysisResult.regulations.export_rules_origin.map((r: any, i: number) => (
                            <div key={i} className="flex items-start gap-3 bg-[#1f2b35] p-4 rounded-lg border border-[#1a353d]">
                                <span className="material-symbols-outlined text-[#94a3b8] mt-0.5">warning</span>
                                <div>
                                    <p className="text-sm font-semibold text-[#d7e4f1] mb-1">{r.title}</p>
                                    <p className="text-xs text-[#94a3b8]">{r.description}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-xs text-gray-400">قانون صادراتی خاصی برای این کالا ثبت نشده است.</p>
                    )}
                </div>
            </div>

            <div className="glass-panel rounded-xl p-6 border-l-4 border-l-[#51d2c2]">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#51d2c2] text-3xl">verified_user</span>
                        <div>
                            <h3 className="font-bold text-[#d7e4f1] text-lg">Import Rules</h3>
                            <p className="text-xs text-[#94a3b8]">Destination: {analysisResult.destination_country}</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    {analysisResult.regulations.import_rules_destination.length > 0 ? (
                        analysisResult.regulations.import_rules_destination.map((r: any, i: number) => (
                            <div key={i} className="flex items-start gap-3 bg-[#1f2b35] p-4 rounded-lg border border-[#1a353d]">
                                <span className="material-symbols-outlined text-[#51d2c2] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>check_box</span>
                                <div>
                                    <p className="text-sm font-semibold text-[#d7e4f1] mb-1">{r.title}</p>
                                    <p className="text-xs text-[#94a3b8]">{r.description}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-xs text-gray-400">قانون وارداتی خاصی برای این کالا ثبت نشده است.</p>
                    )}
                </div>
            </div>
        </section>
    );
}