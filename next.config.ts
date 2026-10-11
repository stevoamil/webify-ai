import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Portfolio/service images uploaded from the admin dashboard are stored
    // in Vercel Blob and served from this domain.
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
  async headers() {
    return [
      {
        // Hero film frames never change, so browsers can keep them for a year.
        source: "/hero/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/work/:file.webp",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
      {
        // Images only - /services/<id> is a real page and must not be cached this long.
        source: "/services/:file.webp",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
