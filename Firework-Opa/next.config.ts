import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Firework-Opa",
  assetPrefix: "/Firework-Opa/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
