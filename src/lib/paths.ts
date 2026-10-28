const base = import.meta.env.BASE_URL || "/";
const basePath = base === "/" ? "" : `/${base.replace(/^\/+|\/+$/g, "")}`;

/**
 * Prefixes root-relative URLs with Astro's configured base path.
 * External URLs, mailto/tel links, hashes and relative paths are unchanged.
 */
export function withBase(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//") || !basePath) return path;
  if (path === basePath || path.startsWith(`${basePath}/`) || path.startsWith(`${basePath}#`)) return path;
  return `${basePath}${path}`;
}

/** Applies withBase() recursively to strings in JSON-like content data. */
export function withBasePaths<T>(value: T): T {
  if (typeof value === "string") return withBase(value) as T;
  if (Array.isArray(value)) return value.map(withBasePaths) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, withBasePaths(item)]),
    ) as T;
  }
  return value;
}
