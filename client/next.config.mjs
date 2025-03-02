/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["img.icons8.com"], // ✅ Allow external image domains
    },
    generateBuildId: async () => {
      return "build-id"; // ✅ Prevents unnecessary pre-rendering issues
    },
  };
  
  export default nextConfig;
  