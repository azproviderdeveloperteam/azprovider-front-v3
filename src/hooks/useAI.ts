// src/hooks/useAI.ts

import { useState } from 'react';
import { aiService, ChatRequest, ChatResponse } from '../services/aiService';

export const useAI = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const askChat = async (data: ChatRequest, token?: string): Promise<ChatResponse> => {
        setLoading(true);
        setError(null);
        try {
            const result = await aiService.sendChatMessage(data, token);
            return result;
        } catch (err: any) {
            setError(err.message || 'Error');
            throw err; // پرتاب خطا به بالا جهت مدیریت در کامپوننت ویجت
        } finally {
            setLoading(false);
        }
    };

    return {
        askChat,
        loading,
        error,
    };
};