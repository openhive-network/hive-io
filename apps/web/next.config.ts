import type {NextConfig} from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  // Static export configuration
  output: 'export',

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Add trailing slashes for better static hosting
  trailingSlash: true,

  turbopack: {
    rules: {
      // @hiveio/wax's web entry has a Vite-only `import('….wasm?url')` (dead
      // under Next) that Turbopack would otherwise compile as a wasm module;
      // give it Vite's `?url` meaning: emit the file and return its URL
      '*.wasm': {
        condition: {query: '?url'},
        type: 'asset',
      },
    },
  },
}

export default withNextIntl(nextConfig)
