/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['azprovider.ir' ,'api.azprovider.ir' , 'azprovider.com' , 'api.azprovider.com'],
    },
    env:{
        BACKEND_URL:'api.azprovider.ir/api/',
        MEDIA_URL:'https://api.azprovider.ir'
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
