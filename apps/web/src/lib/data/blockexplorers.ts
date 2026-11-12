import type { IEcoItem } from '@/types'
import { EcoType } from '@/types'

/**
 * Hive Blockchain Explorers
 */
export const BLOCKEXPLORERS: IEcoItem[] = [
  {
    id: 'openhiveexplorer',
    name: 'OpenHive Explorer',
    website: 'https://explore.openhive.network/',
    description:
      'Block explorer for Hive: blocks, accounts, witnesses and chain parameters.',
    image: 'openhive.svg',
    types: [EcoType.tools],
  },
  {
    id: 'hivescan',
    name: 'HiveScan',
    website: 'https://hivescan.info',
    description: 'Block explorer for Hive.',
    image: 'hivescan.svg',
    types: [EcoType.tools],
  },
  {
    id: 'hivehub',
    name: 'HiveHub',
    website: 'https://hivehub.dev/blocks',
    description: 'Explore the Hive ecosystem',
    image: 'hivehub.svg',
    types: [EcoType.tools],
  },
  {
    id: 'hivexplorer',
    name: 'Hivexplorer',
    website: 'https://hivexplorer.com',
    description: 'Explorer for Hive',
    image: 'hivexplorer.svg',
    types: [EcoType.tools],
  },
  {
    id: 'hiveblockexplorer',
    name: 'Hive Blockexplorer',
    website: 'https://hiveblockexplorer.com',
    description: 'Block explorer for Hive.',
    image: 'hiveblockexplorer.svg',
    types: [EcoType.tools],
  },
    {
    id: 'hiveausbitdev',
    name: 'Hive at Ausbit',
    website: 'https://hive.ausbit.dev',
    description: 'Block explorer for Hive.',
    image: 'ausbit.svg',
    types: [EcoType.tools],
  },
]
