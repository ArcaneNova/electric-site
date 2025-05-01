/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {},
    reactStrictMode: true,
    images: {
      domains: ['lh3.googleusercontent.com'], // Allow Google profile images
      unoptimized: true, // Disable image optimization to avoid external requests during build
    },
    output: 'standalone', // Optimized for Docker deployments
};

// Set this in the environment instead, not through next.config
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default nextConfig;
