import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Offline fallback data for lib/wordpress-backup.ts
  outputFileTracingIncludes: {
    "/**/*": ["./cms-backup/posts.json", "./cms-backup/categories.json"],
  },
};

export default nextConfig;
