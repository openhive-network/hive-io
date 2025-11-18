'use client';

interface Milestone {
  type: 'hardfork' | 'update' | 'future';
  version?: number | string;
  date: string;
  title: string;
  description: string;
  link?: string;
  features: string[];
  status?: 'completed' | 'planned' | 'in-progress';
}

const milestones: Milestone[] = [
  // Future planned items
  {
    type: 'future',
    date: 'Q3 2026',
    title: 'Mobile Node Infrastructure',
    description: 'Bringing Hive node technology to ARM-based mobile devices, enabling personal API nodes and greater decentralization.',
    status: 'planned',
    features: [
      'Pruned HAF API nodes on ARM-based cell phones',
      'Personal API node capabilities on mobile devices',
      'Optimized storage and performance for mobile hardware',
      'Enhanced decentralization through mobile node distribution',
    ],
  },
  {
    type: 'future',
    date: 'Q2 2026',
    title: 'Mobile Blockchain Nodes',
    description: 'Enabling full Hived blockchain nodes to run on ARM-based mobile devices, expanding node accessibility.',
    status: 'planned',
    features: [
      'Hived blockchain nodes on ARM-based cell phones',
      'Optimized resource usage for mobile devices',
      'Enhanced node distribution and accessibility',
      'Mobile-first node management tools',
    ],
  },
  {
    type: 'future',
    date: 'Q1 2026',
    title: 'Smart Contracts & API Modernization',
    description: 'Prototyping smart contract capabilities and modernizing the API stack with REST-based interfaces and enhanced community features.',
    status: 'planned',
    features: [
      'Smart contract design prototyping',
      'REST-based API prototype for Hivemind',
      'New community functionality for Hivemind',
      'Customizable Hive websites (@peakd)',
      'Updates to Denser web app',
      'Layer 2 Transaction Inspector release',
    ],
  },
  {
    type: 'future',
    date: 'Q4 2025',
    title: 'HAF Enhancements & Developer Tools',
    description: 'Major updates to Hive Application Framework, lightweight account support, and new developer libraries for building on Hive.',
    status: 'planned',
    features: [
      'Updated HAF (base layer for designing API servers)',
      'Lightweight HAF version with pruned tables',
      'Lightweight accounts with social media-based login',
      'Support for 2nd layer transactions',
      'Real-time app responses to new blocks',
      'Wax library optimization for server-side API caches',
      'Python WorkerBee library for lightweight block processing',
      'Denser: modern replacement for Condenser web app',
      'Clive: new CLI and Terminal UI wallet',
      'Coinbase Mesh API support',
    ],
  },

  // Recent updates and HF28
  {
    type: 'hardfork',
    version: 28,
    date: 'November 19, 2025',
    title: 'Enhanced Voting & Security',
    description: 'A major overhaul of the voting system and key security improvements with substantial codebase modifications.',
    link: 'https://hive.blog/hive-160391/@gtg/brace-yourself-hardfork-is-coming',
    status: 'completed',
    features: [
      'Vote power consistently remains at 100% with ~10 full-power votes daily',
      'Stricter key hierarchy enforcement preventing higher authority keys from lower-level actions',
      'Enhanced signature handling capabilities',
      '4,036 commits with 331,273 additions and 648,056 deletions',
    ],
  },
  {
    type: 'update',
    date: 'September 2023',
    title: 'HAF (Hive Application Framework) Launch',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    status: 'completed',
    features: [
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse',
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa',
    ],
  },
  {
    type: 'hardfork',
    version: 27,
    date: 'October 24, 2022',
    title: 'Witness Schedule Fix',
    description: 'Critical bug fix for backup witness block production scheduling to ensure fair reward distribution.',
    link: 'https://hive.blog/hive/@hiveio/hf27-is-coming-on-october-24th-some-slight-additional-evolution-needed',
    status: 'completed',
    features: [
      'Fixed backup witness scheduling bug causing unfair block production',
      'No replay required - minimal downtime for upgrades',
      'Improved witness participation incentives',
    ],
  },
  {
    type: 'hardfork',
    version: 26,
    date: 'October 11, 2022',
    title: 'Evolution',
    description: 'Third community-driven protocol upgrade bringing significant improvements for creators, developers, and infrastructure.',
    link: 'https://hive.blog/hive/@hiveio/the-evolution-of-hive-hardfork-26',
    status: 'completed',
    features: [
      'One Block Irreversibility (OBI) - transaction finality in milliseconds',
      'Removed voting restrictions - multiple votes per block allowed',
      'RC delegation with posting keys',
      'Compressed block logs reducing storage requirements',
      'HBD debt ratio limits shifted to 20%/30%',
      'Simdjson integration - 7x faster JSON validation',
    ],
  },
  {
    type: 'hardfork',
    version: 25,
    date: 'June 30, 2021',
    title: 'Equilibrium',
    description: 'Rebalancing the ecosystem with improved curation, HBD stability, and governance mechanisms.',
    link: 'https://hive.blog/hive/@hiveio/hive-hardfork-25-is-on-the-way-hive-to-reach-equilibrium-on-june-30th-2021',
    status: 'completed',
    features: [
      'Eliminated 5-minute curation reverse auction penalty',
      'HIVE to HBD conversion for stablecoin equilibrium',
      'HBD savings account interest - no-risk DeFi',
      'Recurring payment operations for subscriptions',
      'Governance votes expire after 1 year of inactivity',
      'Post-payout voting for appreciation without reward impact',
    ],
  },
  {
    type: 'hardfork',
    version: 24,
    date: 'October 6, 2020',
    title: 'Eclipse',
    description: 'Major upgrade after extensive community testing, bringing improved performance and exchange integration.',
    link: 'https://hive.blog/hiveblockchain/@hiveio/final-hive-hf24-date-set-october-6-2020',
    status: 'completed',
    features: [
      'Timestamp-based activation system',
      'Faster node startup and replay capabilities',
      'Extensive Hivemind API improvements',
      'Reduced exchange maintenance downtime',
      'Enhanced quality assurance and testing protocols',
    ],
  },
  {
    type: 'hardfork',
    version: 23,
    date: 'March 20, 2020',
    title: 'The Birth of Hive',
    description: 'Hive blockchain officially launched as a community-driven fork from Steem, establishing true decentralization.',
    link: 'https://hive.blog/communityfork/@hiveio/announcing-the-launch-of-hive-blockchain',
    status: 'completed',
    features: [
      '1:1 token airdrop from Steem to Hive',
      'DPOS governance with 30-day voting delay protection',
      'Excluded ninja-mined stake for true decentralization',
      'Community-driven blockchain free from corporate control',
      'Open-source codebase on GitHub',
    ],
  },
  {
    type: 'hardfork',
    version: 'HF 1 - HF 22',
    date: '2016 - 2020',
    title: 'Foundation',
    description: 'The early years of blockchain development, laying the groundwork for what would become Hive.',
    status: 'completed',
    features: [
      'Core blockchain infrastructure development',
      'DPOS consensus mechanism',
      'Smart media tokens research',
      'Community governance systems',
    ],
  },
];

export default function RoadmapPage() {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed':
        return 'bg-[#e31337]';
      case 'in-progress':
        return 'bg-[#ff9800]';
      case 'planned':
        return 'bg-[#212529]';
      default:
        return 'bg-[#e31337]';
    }
  };

  const getTypeLabel = (milestone: Milestone) => {
    if (milestone.type === 'hardfork') {
      return typeof milestone.version === 'number' ? `HF ${milestone.version}` : milestone.version;
    }
    if (milestone.type === 'future' && milestone.version) {
      return typeof milestone.version === 'number' ? `HF ${milestone.version}` : milestone.version;
    }
    if (milestone.type === 'future') {
      return 'Soon';
    }
    return 'Update';
  };

  return (
    <div className="flex justify-center w-full min-h-[calc(100vh-80px)] py-20 px-5">
      <div className="flex flex-col items-center w-full max-w-[1100px]">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-20">
          <h1 className="text-[4rem] font-bold leading-tight mb-6 max-[600px]:text-[3rem]">
            Hive Roadmap<span className="text-[#e31337]">.</span>
          </h1>
          <p className="text-xl max-w-[800px] text-[#555] leading-relaxed mb-8">
            Our journey from inception to the future. Track major hardforks, updates, and planned developments in Hive's evolution as a community-driven blockchain.
          </p>
          <p className="text-lg max-w-[700px] text-[#666]">
            For the latest development updates, follow{' '}
            <a
              href="https://hive.blog/@blocktrades/posts"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-[#e31337] hover:underline font-medium"
            >
              @blocktrades
            </a>
          </p>
        </div>

        {/* Timeline */}
        <div className="relative w-full">
          {/* Vertical line */}
          <div className="absolute left-[50px] top-0 bottom-0 w-[4px] bg-gradient-to-b from-[#212529] via-[#e31337] to-[#ff6b8a] max-[768px]:left-[20px]" />

          {/* Milestone items - reverse order (newest/future first) */}
          <div className="flex flex-col gap-12">
            {milestones.map((milestone, idx) => (
              <div
                key={idx}
                className="relative pl-[100px] max-[768px]:pl-[60px]"
              >
                {/* Circle marker */}
                <div
                  className={`absolute left-[38px] top-[10px] w-[28px] h-[28px] rounded-full ${getStatusColor(milestone.status)} border-4 border-white shadow-lg max-[768px]:left-[8px] max-[768px]:w-[24px] max-[768px]:h-[24px]`}
                >
                  {milestone.status === 'in-progress' && (
                    <div className="absolute inset-0 rounded-full bg-[#ff9800] animate-ping opacity-75" />
                  )}
                </div>

                {/* Content card */}
                <div
                  className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-8 border ${milestone.status === 'planned'
                    ? 'border-[#212529] border-2'
                    : milestone.status === 'in-progress'
                      ? 'border-[#ff9800] border-2'
                      : 'border-gray-100'
                    }`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className={`inline-block px-4 py-1 ${getStatusColor(milestone.status)} text-white font-bold rounded-full text-sm`}>
                          {getTypeLabel(milestone)}
                        </span>
                        <span className="text-[#888] font-medium">{milestone.date}</span>
                      </div>
                      <h2 className="text-3xl font-bold text-[#1a1a1a] mb-2">
                        {milestone.title}
                      </h2>
                    </div>
                    {milestone.link && (
                      <a
                        href={milestone.link}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="flex items-center gap-2 text-[#e31337] hover:text-[#c12a2f] font-medium transition-colors"
                      >
                        Read More
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-[#555] text-lg mb-6 leading-relaxed">
                    {milestone.description}
                  </p>

                  {/* Features */}
                  {milestone.features.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-[#888] uppercase tracking-wide">
                        {milestone.status === 'planned' ? 'Planned Features' : milestone.status === 'in-progress' ? 'Features in Development' : 'Key Features'}
                      </h3>
                      <ul className="space-y-2">
                        {milestone.features.map((feature, featureIdx) => (
                          <li key={featureIdx} className="flex items-start gap-3">
                            <svg
                              className={`w-5 h-5 ${getStatusColor(milestone.status).replace('bg-', 'text-')} mt-0.5 flex-shrink-0`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-[#555] leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
