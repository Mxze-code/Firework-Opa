import type { NextConfig } from "next";

const nextPublicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const shouldUseGithubPagesBasePath =
  process.env.NODE_ENV === "production" &&
  nextPublicBasePath.length > 0;

const resolvedBasePath = shouldUseGithubPagesBasePath ? nextPublicBasePath : "";
const resolvedAssetPrefix = resolvedBasePath
  ? resolvedBasePath.endsWith("/")
    ? resolvedBasePath
    : `${resolvedBasePath}/`
  : "";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  ...(resolvedBasePath
    ? {
        output: "export",
        basePath: resolvedBasePath,
        assetPrefix: resolvedAssetPrefix,
      }
    : {}),
};

export default nextConfig;
