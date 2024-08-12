/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    env: {MONGODB_URI: process.env.DB_URL}
};

export default nextConfig;
