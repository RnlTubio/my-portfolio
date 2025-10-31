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
  images: {
    qualities: [75, 90],
  },
};

export default nextConfig;
