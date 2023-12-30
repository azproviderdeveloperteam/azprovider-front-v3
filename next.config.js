/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [' ' ,' '],
    },
    env:{
        BACKEND_URL:'api.azprovider.com/api/'
    },
}

module.exports = nextConfig
