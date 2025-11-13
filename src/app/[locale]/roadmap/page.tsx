'use client';

import React from 'react';

export default function RoadmapPage() {
  return (
    <div className="flex justify-center w-full min-h-[calc(100vh-80px)] py-20 px-5">
      <div className="flex flex-col items-center w-full max-w-[900px]">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="text-[4rem] font-bold leading-tight mb-6 max-[600px]:text-[3rem]">
            Roadmap<span className="text-[#e31337]">.</span>
          </h1>
          <p className="text-xl max-w-[700px] text-[#555] leading-relaxed">
            Just about all our core development updates are shared on Hive{' '}
            <a
              href="https://hive.blog/@blocktrades/posts"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-[#e31337] hover:underline"
            >
              @blocktrades
            </a>
          </p>
        </div>

        {/* Roadmap Timeline */}
        <div className="flex flex-col gap-16 w-full">
          {/* Q3 2025 */}
          <div className="w-full">
            <h2 className="text-[3rem] font-bold leading-tight mb-8 relative inline-block w-fit">
              2025 Q3<span className="text-[#e31337]">.</span>
              <div className="absolute bottom-0 left-0 h-[6px] w-[80px] bg-[#e31337]"></div>
            </h2>

            <div className="flex flex-col gap-8 text-left">
              <div>
                <h3 className="text-[1.5rem] font-semibold text-[#e31337] mb-3">Updated HAF API stack</h3>
              </div>

              <div>
                <h3 className="text-[1.5rem] font-semibold text-[#e31337] mb-3">Hived Node software</h3>
                <ul className="list-none pl-0 text-[1.1rem] text-[#555] space-y-2">
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Lightweight hived only requires 4GB memory (next step to running on smart phones)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Interactive API documentation web sites (swagger-based)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-[1.5rem] font-semibold text-[#e31337] mb-3">Social media API server</h3>
                <ul className="list-none pl-0 text-[1.1rem] text-[#555] space-y-2">
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Improved mute handling in Hivemind</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Keyword-based search added to Hivemind API</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Semantic text search and related post search with new HiveSense API</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-[1.5rem] font-semibold text-[#e31337] mb-3">
                  Wallet balance tracking and account history API servers
                </h3>
                <ul className="list-none pl-0 text-[1.1rem] text-[#555] space-y-2">
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Savings balances</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Pending coin conversions (@actifit)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Open market orders (@actifit)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Average transfer statistics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Recurrent transfers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Recent trades and trade history APIs for accounts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Rich list (@actifit)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-[1.5rem] font-semibold text-[#e31337] mb-3">Block explorer API</h3>
                <ul className="list-none pl-0 text-[1.1rem] text-[#555] space-y-2">
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Speedup witness vote calculations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Speedup permlink searching</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>More types of data available</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-[1.5rem] font-semibold text-[#e31337] mb-3">Hive libraries</h3>
                <ul className="list-none pl-0 text-[1.1rem] text-[#555] space-y-2">
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Wax: Typescript & Python library for Hive Dapp development</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Typescript WorkerBee: library for lightweight block processing (e.g. bot creation) (add-on to Wax)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-[1.5rem] font-semibold text-[#e31337] mb-3">Embeddable HTML Web page Components</h3>
                <ul className="list-none pl-0 text-[1.1rem] text-[#555] space-y-2">
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Binary Transaction viewer</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Display account</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Display witness</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Display post headers/footers and/or content</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Display post comments</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Display filter post lists (e.g. by tag)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-[1.5rem] font-semibold text-[#e31337] mb-3">Embeddable Wax UI components</h3>
                <ul className="list-none pl-0 text-[1.1rem] text-[#555] space-y-2">
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Embeddable API health checker component for Hive dapps</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-[1.5rem] font-semibold text-[#e31337] mb-3">Web Dapps</h3>
                <ul className="list-none pl-0 text-[1.1rem] text-[#555] space-y-2">
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Transaction Inspector (layer 1 release)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Updated Block Explorer UI</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-[1.5rem] font-semibold text-[#e31337] mb-3">Key management and security apps</h3>
                <ul className="list-none pl-0 text-[1.1rem] text-[#555] space-y-2">
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Beekeeper: lightweight process for managing private keys (Wax bindings available)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Metamask wallet snap for Hive accounts</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Q4 2025 */}
          <div className="w-full">
            <h2 className="text-[3rem] font-bold leading-tight mb-8 relative inline-block w-fit">
              2025 Q4<span className="text-[#e31337]">.</span>
              <div className="absolute bottom-0 left-0 h-[6px] w-[80px] bg-[#e31337]"></div>
            </h2>

            <div className="flex flex-col gap-8 text-left">
              <div>
                <h3 className="text-[1.5rem] font-semibold text-[#e31337] mb-3">
                  Updated HAF (base layer for designing API servers)
                </h3>
                <ul className="list-none pl-0 text-[1.1rem] text-[#555] space-y-2">
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Lightweight version of HAF (pruned tables)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Support for lightweight accounts (including social media-based login)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Support for 2nd layer transactions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Apps respond immediately to new blocks</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-[1.5rem] font-semibold text-[#e31337] mb-3">Hive Libraries</h3>
                <ul className="list-none pl-0 text-[1.1rem] text-[#555] space-y-2">
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Begin updating Wax to optimize server-side API caches</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Python WorkerBee: library for lightweight block processing (e.g. bot creation)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-[1.5rem] font-semibold text-[#e31337] mb-3">Web Dapps</h3>
                <ul className="list-none pl-0 text-[1.1rem] text-[#555] space-y-2">
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Denser: modern replacement for Condenser social media web app</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-[1.5rem] font-semibold text-[#e31337] mb-3">Key management and security apps</h3>
                <ul className="list-none pl-0 text-[1.1rem] text-[#555] space-y-2">
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Clive: new command-line and Terminal UI wallet</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-[1.5rem] font-semibold text-[#e31337] mb-3">Coinbase Mesh API support for Hive</h3>
              </div>
            </div>
          </div>

          {/* Q1 2026 */}
          <div className="w-full">
            <h2 className="text-[3rem] font-bold leading-tight mb-8 relative inline-block w-fit">
              2026 Q1<span className="text-[#e31337]">.</span>
              <div className="absolute bottom-0 left-0 h-[6px] w-[80px] bg-[#e31337]"></div>
            </h2>

            <div className="flex flex-col gap-8 text-left">
              <div>
                <h3 className="text-[1.5rem] font-semibold text-[#e31337] mb-3">Prototyping for smart contracts designing</h3>
              </div>

              <div>
                <h3 className="text-[1.5rem] font-semibold text-[#e31337] mb-3">Updates to API stack</h3>
                <ul className="list-none pl-0 text-[1.1rem] text-[#555] space-y-2">
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Prototype REST-based API for hivemind (social media API)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>New community functionality for hivemind (@howo)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-[1.5rem] font-semibold text-[#e31337] mb-3">Web Dapps</h3>
                <ul className="list-none pl-0 text-[1.1rem] text-[#555] space-y-2">
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Customizable Hive web sites (@peakd)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Updates to Denser (TBD)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" disabled className="mt-1 flex-shrink-0" />
                    <span>Transaction Inspector (layer 2 release)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Q2 2026 */}
          <div className="w-full">
            <h2 className="text-[3rem] font-bold leading-tight mb-8 relative inline-block w-fit">
              2026 Q2<span className="text-[#e31337]">.</span>
              <div className="absolute bottom-0 left-0 h-[6px] w-[80px] bg-[#e31337]"></div>
            </h2>

            <div className="flex flex-col gap-8 text-left">
              <div>
                <h3 className="text-[1.5rem] font-semibold text-[#e31337] mb-3">
                  Hived Blockchain nodes on ARM-based cell phones
                </h3>
              </div>
            </div>
          </div>

          {/* Q3 2026 */}
          <div className="w-full">
            <h2 className="text-[3rem] font-bold leading-tight mb-8 relative inline-block w-fit">
              2026 Q3<span className="text-[#e31337]">.</span>
              <div className="absolute bottom-0 left-0 h-[6px] w-[80px] bg-[#e31337]"></div>
            </h2>

            <div className="flex flex-col gap-8 text-left">
              <div>
                <h3 className="text-[1.5rem] font-semibold text-[#e31337] mb-3">
                  Pruned HAF API nodes on ARM-based cell phones (for personal API nodes)
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
