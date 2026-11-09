import type {ReactNode} from 'react'
import {pageMetadata} from '@/lib/page-metadata'

export const metadata = pageMetadata(
  '/eco/',
  'Hive Apps: Decentralized Social Media, Games and Tools',
  'Browse apps built on the Hive blockchain: decentralized social media apps, games, NFTs, finance and developer tools, all used with one Hive account.',
)

export default function Layout({children}: {children: ReactNode}) {
  return children
}
