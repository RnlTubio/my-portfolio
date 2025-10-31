import type { NextConfig } from "next";

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/my-portfolio",
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
