import type {ReactNode} from 'react'
import {pageMetadata} from '@/lib/page-metadata'

export const metadata = pageMetadata(
  '/about/',
  'What Is Hive? How the Hive Blockchain Works',
  'Hive is a blockchain with 3-second blocks, one-block irreversibility and no transaction fees, and its nodes run on modest hardware.',
)

export default function Layout({children}: {children: ReactNode}) {
  return children
}
