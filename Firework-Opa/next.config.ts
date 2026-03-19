import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

const nextPublicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const isProdBuildPhase = process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD;
const shouldUseGithubPagesBasePath =
  process.env.NODE_ENV === "production" &&
  isProdBuildPhase &&
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
