// tailwind.config.js

const withMT = require("@material-tailwind/react/utils/withMT");

// 🌟 اصلاح تابع برای مشخص کردن نوع دقیق پارامتر ورودی در تایپ‌اسکریپت
function withOpacity(variableName: string) {
  return ({ opacityValue }: { opacityValue?: number | string }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`
    } else {
      return `rgba(var(${variableName}))`
    }
  }
}

module.exports = withMT({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ۱. حفظ کامل پالت رنگی داینامیک قبلی پروژه شما
        primary: {
          green: {
            lg100: withOpacity("--color-az-lime-green-100"),
            lg400: withOpacity("--color-az-lime-green-400"),
            sg900: withOpacity("--color-az-sea-green-900"),
            wgd: withOpacity("--color-az-winter-green-dream"),
            mg: withOpacity("--color-az-myrtle-green"),
            cb: withOpacity("--color-az-com-blue"),
            shg: withOpacity("--color-az-sheen-green"),
            tb: withOpacity("--color-az-teal-blue"),
          },
          purple: {
            300: withOpacity('--color-az-purple-300'),
            600: withOpacity('--color-az-purple-600'),
            800: withOpacity('--color-az-purple-800'),
          },
          gray: {
            100: withOpacity('--color-az-gray-100'),
            400: withOpacity('--color-az-gray-400')
          },
          dark: {
            g: withOpacity('--color-az-dark-green'),
            b: withOpacity('--color-az-dark-blue'),
            p: withOpacity('--color-az-dark-purple'),
          }
        },
        secondary: {
          red: withOpacity('--color-az-red'),
          yellow: withOpacity('--color-az-yellow'),
          peach: withOpacity('--color-az-peach')
        },

        // ۲. ادغام رنگ‌های اختصاصی قالب لجستیک شیشه‌ای
        "surface-midnight": "#0c1922",
        "surface-glass": "rgba(26, 53, 61, 0.4)",
        "border-teal": "#1a353d",
        "primary-container": "#51d2c2",
        "text-muted": "#94a3b8",

        // کانتینرها و پنل‌های عمق‌دار تیره
        "surface-container-lowest": "#030f18",
        "surface-container-low": "#101d26",
        "surface-container": "#14212a",
        "surface-container-high": "#1f2b35",
        "surface-container-highest": "#2a3640",
        "surface-variant": "#2a3640",
        "surface-bright": "#2e3b45",

        // مسیرهای رنگی نئونی نقشه
        "route-magenta": "#ec4899",
        "route-blue": "#3b82f6",
        "route-orange": "#f59e0b",
      },
    },
    screens: {
      '2xl': '1536px'
    },
  },
  plugins: [],
});