/**
 * Single source of truth for `basePath` / client nav prefixes in `output: "export"` builds.
 *
 * - GitHub Pages project sites need `/<repo>/` only when building in GitHub Actions.
 * - `NEXT_PUBLIC_BASE_PATH` wird im Client-Bundle zuverlässig eingebettet — für öffentliche
 *   Asset-Strings (z. B. `/photos/...`) immer setzen, wenn CI unter einem Repo-Pfad deployed.
 * - Cloudflare Pages (`CF_PAGES`) serves from origin root; dort kein GitHub-BasePath.
 */

function normalizeBasePath(raw: string | undefined): string {
  if (!raw?.trim()) return "";
  const p = raw.trim();
  const withSlash = p.startsWith("/") ? p : `/${p}`;
  return withSlash.replace(/\/+$/, "");
}

function isCloudflarePagesBuild(): boolean {
  const v = process.env.CF_PAGES;
  if (v === "1" || v === "true") return true;
  const pagesUrl = process.env.CF_PAGES_URL ?? "";
  if (pagesUrl.includes(".pages.dev")) return true;
  return false;
}

export function resolvedStaticBasePath(): string {
  if (
    process.env.FORCE_STATIC_ROOT === "1" ||
    process.env.FORCE_STATIC_ROOT === "true"
  ) {
    return "";
  }

  if (isCloudflarePagesBuild()) {
    return "";
  }

  const fromPublic = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);
  if (fromPublic) return fromPublic;

  if (
    process.env.GITHUB_ACTIONS === "true" &&
    process.env.GITHUB_PAGES_EXPORT === "true"
  ) {
    const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
    if (repo) return `/${repo}`;
  }

  return "";
}
