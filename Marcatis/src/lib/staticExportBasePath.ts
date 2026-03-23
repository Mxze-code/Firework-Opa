/**
 * Single source of truth for `basePath` / client nav prefixes in `output: "export"` builds.
 *
 * - GitHub Pages project sites need `/<repo>/` only when building in GitHub Actions.
 * - Cloudflare Pages (`CF_PAGES`) serves from the origin root; stray `NEXT_PUBLIC_BASE_PATH`
 *   from a GitHub workflow must not apply or all `/_next` assets 404 → blank page.
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
  // Manche Builds setzen nur die Pages-URL (ohne CF_PAGES=1) — dann würde ein kopiertes
  // NEXT_PUBLIC_BASE_PATH aus GitHub Actions weiterhin /Repo/_next erzeugen → weiße Seite.
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

  if (
    process.env.GITHUB_ACTIONS === "true" &&
    process.env.GITHUB_PAGES_EXPORT === "true"
  ) {
    const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
    if (repo) return `/${repo}`;
  }

  if (isCloudflarePagesBuild()) {
    return "";
  }

  return normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);
}
