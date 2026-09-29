import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Portfolio/service images uploaded from the admin dashboard are stored
    // in Vercel Blob and served from this domain.
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
};

export default nextConfig;
