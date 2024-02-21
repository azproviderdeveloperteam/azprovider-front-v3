/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['azprovider.com' ,'api.azprovider.com'],
    },
    env:{
        BACKEND_URL:'api.azprovider.com/api/',
        MEDIA_URL:'https://api.azprovider.com'
    },
}

module.exports = nextConfig
