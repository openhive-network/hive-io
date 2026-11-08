import type {ReactNode} from 'react'
import {pageMetadata} from '@/lib/page-metadata'

export const metadata = pageMetadata(
  '/join/',
  'Create a Hive Account: Join the Hive Blockchain',
  'Sign up for a Hive blockchain account through a community provider or a sponsor, then use one account in every Hive app. Keys and options explained.',
)

export default function Layout({children}: {children: ReactNode}) {
  return children
}
