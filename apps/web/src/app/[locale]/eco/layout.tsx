import type {ReactNode} from 'react'
import {pageMetadata} from '@/lib/page-metadata'
import {ECOSYSTEM} from '@/lib/data/ecosystem'

const PAGE_URL = 'https://hive.io/eco/'
const TITLE = 'Hive Apps: Decentralized Social Media, Games and Tools'

export const metadata = pageMetadata(
  '/eco/',
  TITLE,
  'Browse apps built on the Hive blockchain: decentralized social media apps, games, NFTs, finance and developer tools, all used with one Hive account.',
)

const ecoJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${PAGE_URL}#webpage`,
  url: PAGE_URL,
  name: TITLE,
  isPartOf: {'@id': 'https://hive.io/#website'},
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: ECOSYSTEM.length,
    itemListElement: ECOSYSTEM.map((app, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: app.name,
      url: app.website,
      description: app.description,
    })),
  },
}).replace(/</g, '\\u003c')

export default function Layout({children}: {children: ReactNode}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: ecoJsonLd}}
      />
      {children}
    </>
  )
}
