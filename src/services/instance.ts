import axios from "axios";
import { baseUrl } from "@/utils/config";
import Cookies from "js-cookie";
import { getCookie } from "cookies-next";

axios.defaults.withCredentials = true;
const isServer = typeof window === "undefined";

export const app = axios.create({
    withCredentials: true,
    baseURL: baseUrl,
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
});

app.interceptors.request.use(
    (config) => {
        let token = null;

        if (isServer) {
            try {
                token = getCookie("cookieToken");
            } catch (e) {
                token = null;
            }
        } else {
            token = Cookies.get('cookieToken');
        }

        if (token && token !== "undefined" && token !== "null") {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// 🔍 رهگیر پاسخ با قابلیت لاگ‌گیری دقیق خطاها در ترمینال
app.interceptors.response.use(
    (res) => res,
    async (error) => {
        console.error("\n================= ❌ AXIOS ERROR DETECTED ❌ =================");
        if (error.response) {
            console.error("🔹 Status Code:", error.response.status);
            console.error("🔹 Failed URL:", error.config?.url);
            console.error("🔹 Base URL Used:", error.config?.baseURL);
            console.error("🔹 Server Error Data (علت خطا از سمت سرور شما):", JSON.stringify(error.response.data, null, 2));
        } else {
            console.error("🔹 Network/Other Error Message:", error.message);
            console.error("🔹 Config:", error.config);
        }
        console.error("=============================================================\n");

        return Promise.reject(error);
    }
);

export default app;