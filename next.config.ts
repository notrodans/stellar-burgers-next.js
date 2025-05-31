import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [new URL("https://code.s3.yandex.net/**")],
  },
  typescript: { ignoreBuildErrors: true },
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
