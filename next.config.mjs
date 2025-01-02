/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

export default nextConfig;


// experimental: {
//   runtime: 'nodejs', // Use Node.js runtime
// },

// webpack: (config) => {
//   config.resolve.fallback = {
//     aws4: false,
//     socks: false,
//     "mongodb-client-encryption": false,
//   };
//   return config;
// },