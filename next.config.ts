import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://code.s3.yandex.net/**")],
  },
  eslint: { ignoreDuringBuilds: true },
  reactStrictMode: true,
  async rewrites() {
    const BASE_API_URL = process.env.BASE_API_URL || "http://localhost:3000";
    return [
      {
        source: "/api/:path*",
        destination: `${BASE_API_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
