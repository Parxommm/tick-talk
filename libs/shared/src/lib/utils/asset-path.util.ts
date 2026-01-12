/**
 * Utility function to get asset paths that work with baseHref
 * Use this instead of hardcoded '/assets/...' paths
 */
export function getAssetPath(path: string): string {
  // Remove leading slash if present to make it relative
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Return relative path - Angular will automatically prepend baseHref
  return cleanPath.startsWith('assets/') ? cleanPath : `assets/${cleanPath}`;
}
