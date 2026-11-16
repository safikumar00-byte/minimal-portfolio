import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable client router cache so navigations and updates compile instantly
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 30,
    },
  },
  // Ensure the browser never serves stale assets during dev, even when "Disable cache" is unchecked
  async headers() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/:path*",
          headers: [
            {
              key: "Cache-Control",
              value: "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
            },
            {
              key: "Pragma",
              value: "no-cache",
            },
            {
              key: "Expires",
              value: "0",
            },
          ],
        },
      ];
    }
    return [];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
