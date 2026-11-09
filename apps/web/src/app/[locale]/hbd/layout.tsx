import type {ReactNode} from 'react'
import {pageMetadata} from '@/lib/page-metadata'

export const metadata = pageMetadata(
  '/hbd/',
  "HBD: Hive Backed Dollar, Hive's Decentralized Stablecoin",
  'HBD is a decentralized stablecoin on Hive with no issuer or freeze mechanism. Designed to track one US dollar, it converts with HIVE and earns interest.',
)

export default function Layout({children}: {children: ReactNode}) {
  return children
}
