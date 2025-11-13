import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Static export configuration
  output: 'export',

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Add trailing slashes for better static hosting
  trailingSlash: true,
};

export default withNextIntl(nextConfig);
