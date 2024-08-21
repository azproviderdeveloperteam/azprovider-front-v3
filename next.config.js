/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['azprovider.com' ,'api.azprovider.com'],
    },
    env:{
        BACKEND_URL:'api.azprovider.com/api/',
        MEDIA_URL:'https://api.azprovider.com'
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
}

module.exports = nextConfig
