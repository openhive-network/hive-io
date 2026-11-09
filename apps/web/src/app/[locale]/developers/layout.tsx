import type {ReactNode} from 'react'
import {pageMetadata} from '@/lib/page-metadata'

export const metadata = pageMetadata(
  '/developers/',
  'Build on the Hive Blockchain: Developer Resources',
  'Build social apps, games and payments on the Hive blockchain, with no transaction fees, open-source node software, APIs and libraries.',
)

export default function Layout({children}: {children: ReactNode}) {
  return children
}
