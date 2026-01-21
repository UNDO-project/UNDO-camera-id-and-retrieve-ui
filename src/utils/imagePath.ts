/**
 * Transforms a local file system path into a proxy URL served by the Next.js API.
 * This is primarily for local development where images might be stored outside the public directory.
 */
export function transformLocalImagePath(url?: string): string | undefined {
  if (!url) return undefined;

  // Check for HTTP(S) URLs - return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Check for existing API proxy URLs - return as is
  if (url.startsWith('/api/')) {
    return url;
  }

  // Check for local file system paths (Unix/macOS and Windows)
  // We look for typical system roots or absolute paths
  if (
    url.startsWith('/Users') ||
    url.startsWith('/home') ||
    url.startsWith('/tmp') ||
    url.startsWith('/var') ||
    url.startsWith('/private') ||
    /^[a-zA-Z]:\\/.test(url) // Windows drive letter
  ) {
    return `/api/images?path=${encodeURIComponent(url)}`;
  }

  // Assume other paths are relative to public/ or valid web paths
  return url;
}

/**
 * Transforms an array of local image paths.
 */
export function transformLocalImagePaths(urls: string[]): string[] {
  return urls.map((url) => transformLocalImagePath(url)).filter((url): url is string => !!url);
}
