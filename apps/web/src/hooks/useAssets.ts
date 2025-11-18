/**
 * useAssets hook for Next.js
 * Provides helper functions to get asset paths from the public directory
 */
export const useAssets = () => {
  const getImage = (path: string): string => {
    // Normalize path to remove leading slashes
    const normalizedPath = path.replace(/^\/+/, '');
    return `/images/${normalizedPath}`;
  };

  const getVideo = (path: string): string => {
    // Normalize path to remove leading slashes
    const normalizedPath = path.replace(/^\/+/, '');
    return `/videos/${normalizedPath}`;
  };

  return {
    getImage,
    getVideo,
  };
};
