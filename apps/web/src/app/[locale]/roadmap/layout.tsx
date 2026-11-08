import type {ReactNode} from 'react'
import {pageMetadata} from '@/lib/page-metadata'

export const metadata = pageMetadata(
  '/roadmap/',
  'Hive Roadmap: Hardforks and Planned Work',
  'Past Hive hardforks and planned core work, from mobile nodes to HAF and API updates, on a community-run blockchain.',
)

export default function Layout({children}: {children: ReactNode}) {
  return children
}
