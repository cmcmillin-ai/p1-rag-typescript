import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["pg", "pgvector"],
  },
};

export default nextConfig;
