// src/components/AIFloatingWidget.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAI } from '../hooks/useAI';
import { ChatHistoryItem } from '../services/aiService';

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

// ساختار ترجمه دو زبانه (انگلیسی پیش‌فرض)
const translations = {
    en: {
        title: "Smart Trade Assistant",
        subtitle: "Customs & Logistics Expert",
        welcome: "Hello! I am your AI assistant for trade, customs, and logistics. How can I help you?",
        placeholder: "Type your question...",
        unauthorized: "To use our services, please register or login first.",
        error: "An error occurred while communicating with the server.",
        langPromptHint: "\n\n(Please respond in English.)",
        loadingText: "AI is thinking..."
    },
    fa: {
        title: "دستیار هوشمند تجاری",
        subtitle: "پاسخگوی گمرک و لجستیک",
        welcome: "سلام! من دستیار هوشمند شما در حوزه بازرگانی، گمرک و لجستیک هستم. چطور می‌توانم کمکتان کنم؟",
        placeholder: "سوال خود را بنویسید...",
        unauthorized: "برای استفاده از خدمات ابتدا باید ثبت‌نام کنید یا وارد شوید.",
        error: "متأسفانه در پاسخ‌دهی سرور خطایی رخ داد.",
        langPromptHint: "\n\n(لطفاً به زبان فارسی پاسخ دهید.)",
        loadingText: "در حال پردازش پاسخ..."
    }
};

export default function AIFloatingWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [lang, setLang] = useState<'en' | 'fa'>('en'); // پیش‌فرض انگلیسی
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    const { askChat, loading } = useAI();
    const chatEndRef = useRef<HTMLDivElement>(null);
    const t = translations[lang];

    // هماهنگ‌سازی پیام خوش‌آمدگویی هنگام تغییر زبان یا باز شدن پنجره
    useEffect(() => {
        setMessages([
            {
                sender: 'ai',
                text: t.welcome,
            },
        ]);
    }, [lang]);

    // اسکرول خودکار به انتهای چت
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    // افکت دیباگ برای بررسی وضعیت توکن‌ها در کنسول مرورگر هنگام باز کردن پنجره چت
    useEffect(() => {
        if (isOpen && typeof window !== 'undefined') {
            console.log("🔑 [AI Widget Debug] Scanning for Auth Tokens...");
            console.log("All Client Cookies:", document.cookie);
            console.log("LocalStorage Keys:", Object.keys(localStorage));
            console.log("Detected Token Status:", getAuthToken() ? "Successfully Found! ✅" : "Not Found ❌");
        }
    }, [isOpen]);

    // متد کمکی هوشمند برای اسکن و خواندن توکن از کوکی‌ها، لوکال‌استوریج یا سشن‌استوریج
    const getAuthToken = (): string | null => {
        if (typeof window === 'undefined') return null;

        const jwtRegex = /^eyJ[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;

        // ۱. بررسی کوکی‌ها برای الگوهای JWT (شروع با eyJ)
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

        // ۲. بررسی LocalStorage برای الگوهای JWT
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
                const val = localStorage.getItem(key);
                if (val && (val.startsWith('eyJ') || jwtRegex.test(val))) {
                    return val;
                }
            }
        }

        // ۳. بررسی SessionStorage برای الگوهای JWT
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if (key) {
                const val = sessionStorage.getItem(key);
                if (val && (val.startsWith('eyJ') || jwtRegex.test(val))) {
                    return val;
                }
            }
        }

        // ۴. در صورتی که ساختار JWT یافت نشد، بررسی کلیدهای متداول متنی
        const commonKeys = [
            'token', 'access', 'accessToken', 'access_token', 'jwt',
            'session', 'sessionId', 'session_id', 'auth_token', 'authToken',
            'key', 'authorization', 'next-auth.session-token'
        ];

        // اسکن مجدد کوکی‌ها با کلیدهای متداول متنی
        for (const cookie of cookies) {
            const eqIndex = cookie.indexOf('=');
            if (eqIndex === -1) continue;
            const key = cookie.substring(0, eqIndex).trim();
            const val = cookie.substring(eqIndex + 1).trim();

            if (key && commonKeys.some(k => k.toLowerCase() === key.toLowerCase()) && val) {
                if (val !== 'undefined' && val !== 'null' && val.length > 5) {
                    return val;
                }
            }
        }

        // اسکن LocalStorage با کلیدهای متداول متنی
        for (const key of commonKeys) {
            const val = localStorage.getItem(key);
            if (val && val !== 'undefined' && val !== 'null' && val.length > 5) {
                return val;
            }
        }

        // اسکن SessionStorage با کلیدهای متداول متنی
        for (const key of commonKeys) {
            const val = sessionStorage.getItem(key);
            if (val && val !== 'undefined' && val !== 'null' && val.length > 5) {
                return val;
            }
        }

        return null;
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const currentPrompt = input;
        setInput('');

        // اضافه کردن پیام کاربر به چت‌لاگ
        setMessages((prev) => [...prev, { sender: 'user', text: currentPrompt }]);

        // بررسی اولیه و پیش از ارسال توکن (Pre-flight check)
        const token = getAuthToken();
        if (!token) {
            setMessages((prev) => [
                ...prev,
                { sender: 'ai', text: t.unauthorized },
            ]);
            return;
        }

        // ساخت تاریخچه پیام‌ها بر اساس گفتگوهای قبلی
        const chatHistory: ChatHistoryItem[] = messages.map((msg) => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text,
        }));

        // تزریق هینت زبانی در انتهای پرومپت برای تضمین زبان پاسخ هوش مصنوعی
        const localizedPrompt = currentPrompt + t.langPromptHint;

        try {
            const res = await askChat({
                prompt: localizedPrompt,
                history: chatHistory,
            }, token);

            if (res && res.response) {
                setMessages((prev) => [...prev, { sender: 'ai', text: res.response }]);
            } else {
                setMessages((prev) => [...prev, { sender: 'ai', text: t.error }]);
            }
        } catch (err: any) {
            // در صورت برگشت خطای عدم دسترسی ۴۰۱ از سمت سرور
            if (err.message === 'UNAUTHORIZED') {
                setMessages((prev) => [...prev, { sender: 'ai', text: t.unauthorized }]);
            } else {
                setMessages((prev) => [...prev, { sender: 'ai', text: t.error }]);
            }
        }
    };

    return (
        <div className="fixed bottom-6 left-6 z-50 font-sans" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
            {/* پنجره گفتگو */}
            {isOpen && (
                <div className="mb-4 w-80 sm:w-96 h-[480px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden transition-all duration-300 transform scale-100 origin-bottom-left">

                    {/* هدر مجهز به انتخاب زبان چرخشی */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 flex justify-between items-center shadow-md">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                            <div>
                                <h3 className="font-bold text-sm">{t.title}</h3>
                                <p className="text-[11px] text-blue-100">{t.subtitle}</p>
                            </div>
                        </div>

                        {/* کنترل‌های هدر (انتخاب زبان + دکمه خروج) */}
                        <div className="flex items-center gap-3" dir="ltr">
                            <div className="flex bg-white/10 rounded-lg p-0.5 text-[10px] font-bold">
                                <button
                                    onClick={() => setLang('en')}
                                    className={`px-2 py-1 rounded-md transition-all ${lang === 'en' ? 'bg-white text-blue-600' : 'text-white/80 hover:text-white'
                                        }`}
                                >
                                    EN
                                </button>
                                <button
                                    onClick={() => setLang('fa')}
                                    className={`px-2 py-1 rounded-md transition-all ${lang === 'fa' ? 'bg-white text-blue-600' : 'text-white/80 hover:text-white'
                                        }`}
                                >
                                    FA
                                </button>
                            </div>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* لیست پیام‌ها */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-sm ${msg.sender === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-none'
                                        : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
                                        }`}
                                >
                                    <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                                </div>
                            </div>
                        ))}

                        {/* لودینگ پاسخ */}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white text-gray-800 rounded-2xl rounded-bl-none p-3 border border-gray-100 shadow-sm flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                    <span className="text-xs text-gray-400 ml-1">{t.loadingText}</span>
                                </div>
                            </div>
                        )}

                        <div ref={chatEndRef} />
                    </div>

                    {/* فرم ارسال */}
                    <form onSubmit={handleSend} className="p-3 border-t border-gray-100 bg-white flex gap-2 items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={t.placeholder}
                            className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            disabled={loading || !input.trim()}
                            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl disabled:bg-gray-200 disabled:text-gray-400 transition-colors shrink-0"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-5 w-5 transform ${lang === 'fa' ? 'rotate-180' : ''}`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        </button>
                    </form>
                </div>
            )}

            {/* دکمه دایره‌ای شناور */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 relative group"
                aria-label="Open AI Assistant"
            >
                <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-20 animate-ping"></span>
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        <span className="text-[9px] font-bold tracking-wider -mt-0.5">AI</span>
                    </div>
                )}
            </button>
        </div>
    );
}