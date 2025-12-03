import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/my-portfolio",
        destination: "/",
        permanent: true, // 301 Redirect - tells Google the page has moved permanently
      },
    ];
  },
  images: {
    qualities: [75, 90],
  },
};

export default nextConfig;
