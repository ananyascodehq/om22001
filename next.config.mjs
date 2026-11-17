/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ["pdf-parse", "@prisma/client"],
};

export default nextConfig;

