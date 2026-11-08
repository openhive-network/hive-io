import type {ReactNode} from 'react'
import {pageMetadata} from '@/lib/page-metadata'

export const metadata = pageMetadata(
  '/contributors/',
  'Hive Contributors: Core Developers and Builders',
  'Meet people who build and maintain Hive, a community-owned blockchain: core developers, app builders and community contributors.',
)

export default function Layout({children}: {children: ReactNode}) {
  return children
}
