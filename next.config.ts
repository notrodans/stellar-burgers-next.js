import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/board",
  //       permanent: true,
  //     },
  //   ];
  // },
  async rewrites() {
    const BASE_API_URL = process.env.BASE_API_URL || "http://localhost:3000";
    console.log(BASE_API_URL, "api url");
    return [
      {
        source: "/api/:path*",
        destination: `${BASE_API_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
