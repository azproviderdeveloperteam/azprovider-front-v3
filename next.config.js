/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // اضافه کردن دامنه‌های دات‌کام و رانفلر به لیست مجاز
        domains: [
            'azprovider.ir',
            'api.azprovider.ir',
            'azprovider.com',
            'api.azprovider.com',
            'azp-django.runflare.run',
            'mpsgroup.ir' // تایید دامنه تصاویر سرور رانفلر
        ],
    },
    env: {
        BACKEND_URL: 'https://mpsgroup.ir/api/',
        MEDIA_URL: 'https://api.azprovider.com'
    },
    typescript: {
        ignoreBuildErrors: true,
    },
}

module.exports = nextConfig