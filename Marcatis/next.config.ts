import type { NextConfig } from "next";
import { resolvedStaticBasePath } from "./src/lib/staticExportBasePath";

const basePath = resolvedStaticBasePath();

const nextConfig: NextConfig = {
  output: "export",
  ...(basePath ? { basePath, assetPrefix: `${basePath}/` } : {}),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
