'use client'

import {createHiveChain, IHiveChainInterface} from '@hiveio/wax'
export let hive: IHiveChainInterface = null as any

const initHiveChain = async () => {
  if (!hive) {
    hive = await createHiveChain()
  }
  return hive
}

export const getHiveChain = async (): Promise<IHiveChainInterface> => {
  return initHiveChain()
}

// Re-export activity utilities
export * from './activity'
