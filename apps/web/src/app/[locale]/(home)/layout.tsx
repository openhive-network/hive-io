import type {ReactNode} from 'react'
import {pageMetadata} from '@/lib/page-metadata'

export const metadata = pageMetadata(
  '/',
  'Hive Blockchain: Feeless Social and Identity Layer',
  'Hive is a feeless, community-owned blockchain and a public social and identity layer for the open web.',
)

export default function Layout({children}: {children: ReactNode}) {
  return children
}
