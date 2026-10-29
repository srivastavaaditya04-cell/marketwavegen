import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Offline fallback data for lib/wordpress-backup.ts
  outputFileTracingIncludes: {
    "/**/*": ["./cms-backup/posts.json", "./cms-backup/categories.json"],
  },
  // Keep the archived images, PDFs and unused exports out of the serverless functions (250 MB limit)
  outputFileTracingExcludes: {
    "/**/*": [
      "./cms-backup/images/**",
      "./cms-backup/pdfs/**",
      "./cms-backup/media.json",
      "./cms-backup/pages.json",
      "./cms-backup/tags.json",
      "./marketwavegen-cms-backup-2026-10-29/**",
    ],
  },
};

export default nextConfig;
