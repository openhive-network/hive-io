import type {ReactNode} from 'react'
import {pageMetadata} from '@/lib/page-metadata'

export const metadata = pageMetadata(
  '/wallets/',
  'Hive Wallet: Wallets for HIVE and HBD',
  'Choose a Hive wallet for Windows, macOS, Linux, iOS, Android or the web, including Hive Keychain. Hold, send and stake HIVE and HBD.',
)

export default function Layout({children}: {children: ReactNode}) {
  return children
}
