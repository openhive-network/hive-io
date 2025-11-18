import type { IEcoItem } from '@/types'
import { EcoType } from '@/types'

/**
 * Hive Blockchain Explorers
 */
export const BLOCKEXPLORERS: IEcoItem[] = [
  {
    id: 'hiveblocks',
    name: 'HiveBlocks',
    website: 'https://hiveblocks.com',
    description: 'Block explorer for Hive.',
    image: 'redhive.png',
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
    image: 'redhive.png',
    types: [EcoType.tools],
  },
  {
    id: 'hiveblockexplorer',
    name: 'Hive Blockexplorer',
    website: 'https://hiveblockexplorer.com',
    description: 'Block explorer for Hive.',
    image: 'blackhive.png',
    types: [EcoType.tools],
  },
    {
    id: 'hiveausbitdev',
    name: 'Hive at Ausbit',
    website: 'https://hive.ausbit.dev',
    description: 'Block explorer for Hive.',
    image: 'redhive.png',
    types: [EcoType.tools],
  },
]
