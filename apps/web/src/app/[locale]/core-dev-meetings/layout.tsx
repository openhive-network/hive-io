import type {ReactNode} from 'react'
import {pageMetadata} from '@/lib/page-metadata'

export const metadata = pageMetadata(
  '/core-dev-meetings/',
  'Hive Core Dev Meetings: Recordings',
  'Watch recordings of Hive core developer meetings: protocol changes, hardfork planning and technical discussion.',
)

export default function Layout({children}: {children: ReactNode}) {
  return children
}
