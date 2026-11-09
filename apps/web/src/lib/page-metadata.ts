import type {Metadata} from 'next'

const OG_IMAGE = {url: '/opengraph.png', width: 1200, height: 630}

// Title, description and canonical for one page. Open Graph and Twitter repeat
// the same strings. A page's openGraph replaces the root layout's instead of
// merging with it, so the shared fields (site name, type, image) are restated.
export function pageMetadata(
  path: string,
  title: string,
  description: string,
): Metadata {
  return {
    title,
    description,
    alternates: {canonical: path},
    openGraph: {
      title,
      description,
      url: path,
      siteName: 'Hive',
      type: 'website',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE.url],
    },
  }
}
