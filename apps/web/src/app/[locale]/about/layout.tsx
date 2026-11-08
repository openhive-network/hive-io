import type {ReactNode} from 'react'
import {pageMetadata} from '@/lib/page-metadata'

export const metadata = pageMetadata(
  '/about/',
  'About the Hive Blockchain: How Hive Works',
  'Hive has 3-second blocks, one-block irreversibility and no transaction fees, and its nodes run on modest hardware. Overview and intro videos.',
)

export default function Layout({children}: {children: ReactNode}) {
  return children
}
