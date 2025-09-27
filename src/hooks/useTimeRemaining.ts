import { useState, useEffect } from "react";

const useTimeRemaining = (targetTime : any) => {
    const [remainingTime, setRemainingTime] = useState("");

    useEffect(() => {
        const calculateTimeRemaining = () => {
            const now = new Date().getTime(); // زمان فعلی
            const target = new Date(targetTime).getTime(); // زمان هدف
            const diff = target - now; // اختلاف زمان

            if (diff > 0) {
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                setRemainingTime(`${hours}:${minutes}:${seconds< 10 ? `0${seconds}` : seconds}`);
            } else {
                setRemainingTime("Timeout");
            }
        };

        calculateTimeRemaining(); // محاسبه اولیه
        const interval = setInterval(calculateTimeRemaining, 1000); // به‌روزرسانی هر ثانیه

        return () => clearInterval(interval); // پاک‌سازی تایمر در خروج
    }, [targetTime]);

    return remainingTime;
};

export default useTimeRemaining;