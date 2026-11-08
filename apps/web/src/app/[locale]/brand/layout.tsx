import type {ReactNode} from 'react'
import {pageMetadata} from '@/lib/page-metadata'

export const metadata = pageMetadata(
  '/brand/',
  'Hive Brand Assets: Logos and Guidelines',
  'Current Hive logos and brand assets, made by the community, with guidance on which versions to use.',
)

export default function Layout({children}: {children: ReactNode}) {
  return children
}
