/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    runtime: 'nodejs', // Use Node.js runtime
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fpumazhsgidivspzvxrw.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
        search: "",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      aws4: false,
      socks: false,
      "mongodb-client-encryption": false,
    };
    return config;
  },
};

export default nextConfig;
