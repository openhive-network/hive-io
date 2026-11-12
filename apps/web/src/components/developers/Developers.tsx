'use client'

import {useEffect, useRef, useState, type ReactNode} from 'react'
import {useLocale, useTranslations} from 'next-intl'
import {useTransactionStats} from '@/hooks/useTransactionStats'
import {BlockHexes, HEX_COLORS, type HexType} from './BlockHexes'
import {Link} from '@/i18n/routing'
import type {DevActivity, DeveloperFacts} from '@/lib/developer-facts'
import {
  LEAD_TOOLS,
  TOOL_GROUPS,
  headBlock,
  toolUrl,
} from '@/lib/developer-facts-fetch.mjs'
import {TRACKER_URL, fetchDevActivity} from '@/lib/dev-activity-fetch.mjs'

const DOCS_URL = 'https://developers.hive.io/'
const SOURCE_URL = 'https://gitlab.syncad.com/hive'
const CORE_URL = 'https://gitlab.syncad.com/hive/hive'
const BLOCK_URL = 'https://hivehub.dev/b/'
const SUMMARY_URL = '/llms.txt'
const TOOL_NAMES: Record<string, string> = {
  keychain: 'Hive Keychain',
  hivesigner: 'HiveSigner',
}
const PAGE_URL = 'https://hive.io/developers/'
const LIVE_APIS_URL = 'https://api.hive.blog/'
const WORKERBEE_URL = 'https://gitlab.syncad.com/hive/workerbee'
const BLOCK_MS = 3_000
// Committers to hived, HAF, wax and workerbee since 2020-03-20 (facts.md)
const CORE_CONTRIBUTORS = 65
const GENESIS = Date.parse('2016-03-24T16:00:00Z')
const DAY_MS = 86_400_000
const RELEASE_POST = {
  series: '1.28.',
  url: 'https://new.hive.blog/hive/@hiveio/nine-awesome-updates-you-re-already-using-meet-hive-1-28-release-roundup',
}
// Inline links stay underlined: red on grey text is under 3:1 without it
const LINK_CLASS =
  'text-[#e31337] underline underline-offset-2 hover:no-underline'

function External({
  href,
  className = LINK_CLASS,
  rel = 'noopener noreferrer',
  children,
}: {
  href: string
  className?: string
  rel?: string
  children: ReactNode
}) {
  return (
    <a href={href} target="_blank" rel={rel} className={className}>
      {children}
    </a>
  )
}

function LiveDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
    </span>
  )
}

const ICONS = {
  people:
    'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  tag: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z',
  clock: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
}

function Stat({
  icon,
  label,
  children,
  note,
}: {
  icon: keyof typeof ICONS
  label: string
  children: ReactNode
  note?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-2">
        <svg
          className="w-5 h-5 max-[600px]:hidden"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={ICONS[icon]}
          />
        </svg>
        <span className="font-medium">{label}</span>
      </div>
      <div className="text-4xl max-[600px]:text-2xl font-bold text-gray-900 tabular-nums">
        {children}
      </div>
      {note && <div className="text-sm text-gray-500 mt-1">{note}</div>}
    </div>
  )
}

const NO_FACTS: DeveloperFacts = {asOf: ''}

interface Tool {
  name: string
  url: string
}

function useHeadBlock(enabled: boolean) {
  const [block, setBlock] = useState<number>()
  useEffect(() => {
    if (!enabled) return
    let active = true
    const tick = () => {
      if (document.visibilityState !== 'visible') return
      headBlock()
        .then((head) => {
          if (active && typeof head === 'number') setBlock(head)
        })
        .catch(() => {})
    }
    tick()
    const timer = setInterval(tick, BLOCK_MS)
    return () => {
      active = false
      clearInterval(timer)
    }
  }, [enabled])
  return block
}

function useSeen<T extends Element>() {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          observer.disconnect()
        }
      },
      {rootMargin: '200px'},
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  return [ref, seen] as const
}

function useAccountCount(enabled: boolean) {
  const [count, setCount] = useState<number>()
  useEffect(() => {
    if (!enabled) return
    let active = true
    const tick = () => {
      if (document.visibilityState !== 'visible') return
      fetch(LIVE_APIS_URL, {
        method: 'POST',
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'condenser_api.get_account_count',
          params: [],
          id: 1,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (active && typeof data?.result === 'number') setCount(data.result)
        })
        .catch(() => {})
    }
    tick()
    const timer = setInterval(tick, 60_000)
    return () => {
      active = false
      clearInterval(timer)
    }
  }, [enabled])
  return count
}

export function LiveFigures({
  headLabel,
  accountsLabel,
  transactionsLabel,
  number,
}: {
  headLabel: string
  accountsLabel?: string
  transactionsLabel: string
  number: (n: number) => string
}) {
  const [ref, seen] = useSeen<HTMLDivElement>()
  const head = useHeadBlock(seen && !accountsLabel)
  const accounts = useAccountCount(seen && !!accountsLabel)
  const {displayedTransactions: transactions} = useTransactionStats({
    updateInterval: BLOCK_MS,
    enabled: seen,
  })
  return (
    <>
      <div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full max-w-[720px] min-h-[96px] mb-12"
      >
        <div className="flex flex-col items-center">
          {accountsLabel && accounts !== undefined && (
            <>
              <span className="flex items-center gap-2 mb-3">
                <LiveDot />
                <span className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                  {accountsLabel}
                </span>
              </span>
              <span className="text-[2.75rem] max-[600px]:text-[2.25rem] font-bold font-mono tabular-nums leading-none">
                {number(accounts)}
              </span>
            </>
          )}
          {!accountsLabel && head !== undefined && (
            <>
              <span className="flex items-center gap-2 mb-3">
                <LiveDot />
                <span className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                  {headLabel}
                </span>
              </span>
              <External
                href={`${BLOCK_URL}${head}`}
                className="text-[2.75rem] max-[600px]:text-[2.25rem] font-bold font-mono tabular-nums leading-none text-white hover:text-[#e31337] transition-colors"
              >
                {number(head)}
              </External>
            </>
          )}
        </div>
        <div className="flex flex-col items-center">
          {transactions > 0 && (
            <>
              <span className="flex items-center gap-2 mb-3">
                <LiveDot />
                <span className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                  {transactionsLabel}
                </span>
              </span>
              <span className="text-[2.75rem] max-[600px]:text-[2.25rem] font-bold font-mono tabular-nums leading-none">
                {number(transactions)}
              </span>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export function Developers({
  facts: built = NO_FACTS,
  activity: builtActivity,
}: {
  facts?: DeveloperFacts
  activity?: DevActivity[]
}) {
  const facts = built
  const [activity, setActivity] = useState(builtActivity)
  const [activityLive, setActivityLive] = useState(false)
  const [now, setNow] = useState(() => Date.parse(built.asOf) || GENESIS)

  useEffect(() => {
    let active = true
    const tick = setTimeout(() => setNow(Date.now()))
    const refresh = () =>
      fetchDevActivity()
        .then((live) => {
          if (active && live?.length) {
            setActivity(live)
            setActivityLive(true)
          }
        })
        .catch(() => {})
    const idle = 'requestIdleCallback' in window
    const handle = idle
      ? requestIdleCallback(refresh, {timeout: 5_000})
      : window.setTimeout(refresh, 2_500)
    return () => {
      active = false
      clearTimeout(tick)
      if (idle) cancelIdleCallback(handle)
      else clearTimeout(handle)
    }
  }, [])

  const t = useTranslations('developers')
  const locale = useLocale()
  // UTC, so the build and the browser print the same day
  const date = (iso: string) =>
    new Intl.DateTimeFormat(locale, {
      dateStyle: 'medium',
      timeZone: 'UTC',
    }).format(new Date(iso))
  const number = (n: number) => new Intl.NumberFormat(locale).format(n)
  const bandTypes = Object.fromEntries(
    (Object.keys(HEX_COLORS) as HexType[]).map((type) => [
      type,
      (chunks: ReactNode) => (
        <strong className="font-semibold" style={{color: HEX_COLORS[type]}}>
          {chunks}
        </strong>
      ),
    ]),
  )
  const uptimeDays = Math.floor((now - GENESIS) / DAY_MS)
  const release = facts.release

  const toolItem = (tool: Tool) => (
    <li key={tool.name} className="flex flex-col gap-1">
      <External
        href={tool.url}
        className="w-fit text-lg font-bold hover:text-[#e31337] hover:underline"
      >
        {TOOL_NAMES[tool.name] ?? tool.name}
      </External>
      <span className="text-base text-[#555] leading-snug">
        {t(`tools.${tool.name}`)}
      </span>
    </li>
  )
  const tool = (name: string): Tool => ({name, url: toolUrl(name)})
  const leads = LEAD_TOOLS.map(tool)
  const leadTitle: Record<string, string> = {
    hive: t('hivedTitle'),
    haf: t('hafTitle'),
  }
  const groups = (
    Object.entries(TOOL_GROUPS) as [keyof typeof TOOL_GROUPS, string[]][]
  ).map(([group, names]) => ({
    group,
    items: names.map(tool),
  }))
  const groupTitle = {
    hafApis: t('groupHafApis'),
    libraries: t('groupLibraries'),
    wallets: t('groupWallets'),
  }

  const toolsJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: t('title'),
    isPartOf: {'@id': 'https://hive.io/#website'},
    about: {'@id': 'https://hive.io/#organization'},
    ...(facts.asOf && {dateModified: facts.asOf}),
    mainEntity: {
      '@type': 'ItemList',
      name: t('toolsTitle'),
      itemListElement: [...leads, ...groups.flatMap(({items}) => items)].map(
        (tool, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'SoftwareSourceCode',
            name: leadTitle[tool.name] ?? TOOL_NAMES[tool.name] ?? tool.name,
            codeRepository: tool.url,
            description: t(`tools.${tool.name}`),
          },
        }),
      ),
    },
  }).replace(/</g, '\\u003c')

  return (
    <div className="w-full" data-track-placement="developers">
      <section className="w-full max-w-screen-2xl mx-auto px-10 max-[600px]:px-5 pt-20 pb-20">
        <div
          className={`flex flex-col items-center gap-12 ${
            activity ? 'xl:flex-row xl:items-stretch xl:justify-center' : ''
          }`}
        >
          <div
            className={`flex flex-col items-center text-center max-w-[700px] ${
              activity ? 'xl:items-start xl:text-left xl:-mt-3' : ''
            }`}
          >
            <h1 className="text-[4rem] font-bold leading-tight mb-6 max-[600px]:text-[3rem]">
              {t('title')}
              <span className="text-[#e31337]">.</span>
            </h1>
            <p className="text-xl text-[#555] leading-relaxed">{t('intro')}</p>
            <div className="flex flex-wrap justify-center xl:justify-start gap-4 my-8">
              <External
                href={DOCS_URL}
                className="group relative inline-flex items-center justify-center gap-3 w-[220px] max-[600px]:w-[180px] py-4 max-[600px]:py-3 bg-gray-800 text-white font-semibold rounded-full overflow-hidden text-lg max-[600px]:text-base"
              >
                <span className="absolute inset-0 bg-[#e31337] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                <span className="relative">{t('docsButton')}</span>
                <span className="relative text-2xl transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </External>
              <External
                href={SOURCE_URL}
                className="w-[220px] max-[600px]:w-[180px] py-4 max-[600px]:py-3 bg-white border-2 border-gray-200 text-gray-900 font-semibold rounded-full hover:border-gray-300 hover:bg-gray-50 transition-colors duration-200 text-lg max-[600px]:text-base text-center"
              >
                {t('sourceButton')}
              </External>
            </div>
            <p className="text-xl text-[#555] leading-relaxed">
              {t.rich('buildTypes', {
                eco: (chunks) => (
                  <Link href="/eco" className={LINK_CLASS}>
                    {chunks}
                  </Link>
                ),
              })}
            </p>

            <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-6 lg:gap-10 text-left pt-10 mt-auto max-xl:mt-12">
              <Stat icon="people" label={t('statContributors')}>
                <Link
                  href="/contributors"
                  className="hover:text-[#e31337] transition-colors"
                >
                  {number(CORE_CONTRIBUTORS)}+
                </Link>
              </Stat>
              {release && (
                <Stat
                  icon="tag"
                  label={t('statRelease')}
                  note={
                    release.tag.startsWith(RELEASE_POST.series) ? (
                      <External href={RELEASE_POST.url}>
                        {t('releaseNotes')}
                      </External>
                    ) : (
                      <span className="tabular-nums">{date(release.date)}</span>
                    )
                  }
                >
                  <External
                    href={`${CORE_URL}/-/tags/${release.tag}`}
                    className="hover:text-[#e31337] transition-colors"
                  >
                    {release.tag}
                  </External>
                </Stat>
              )}
              <Stat icon="clock" label={t('statUptime')}>
                {number(uptimeDays)}
              </Stat>
            </div>
          </div>

          {activity && (
            <aside className="w-full max-w-[700px] xl:w-[450px] xl:shrink-0 bg-white border border-gray-300 rounded-3xl p-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">{t('activityTitle')}</h2>
                {activityLive && (
                  <span className="flex items-center gap-2">
                    <LiveDot />
                    <span className="text-sm font-semibold text-[#15803d] uppercase tracking-wide">
                      {t('liveLabel')}
                    </span>
                  </span>
                )}
              </div>
              <ul className="flex flex-col">
                {activity.map((event) => (
                  <li
                    key={event.id}
                    className="border-t border-gray-200 first:border-t-0"
                  >
                    <External
                      href={event.url}
                      rel="noopener noreferrer nofollow"
                      className="group flex flex-col gap-0.5 py-3"
                    >
                      <span className="flex items-center justify-between gap-4">
                        <span className="flex items-center gap-2 min-w-0">
                          {event.avatar && (
                            // eslint-disable-next-line @next/next/no-img-element -- 20px remote avatar, no optimizer in a static export
                            <img
                              src={event.avatar}
                              alt=""
                              title={event.actor}
                              width={20}
                              height={20}
                              loading="lazy"
                              decoding="async"
                              className="w-5 h-5 rounded-full shrink-0 bg-gray-200"
                            />
                          )}
                          <span className="text-sm font-bold truncate group-hover:text-[#e31337]">
                            {event.repo}
                          </span>
                        </span>
                        <span className="text-xs text-[#555] tabular-nums shrink-0">
                          {date(event.at)}
                        </span>
                      </span>
                      <span className="text-sm text-[#555] line-clamp-2">
                        {event.title}
                      </span>
                    </External>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-[#555] mt-4">
                {t.rich('activitySource', {
                  tracker: (chunks) => (
                    <External href={TRACKER_URL}>{chunks}</External>
                  ),
                })}
              </p>
            </aside>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden w-full pt-24 pb-28 px-6 sm:px-10 bg-gradient-to-b from-gray-900 to-black text-white">
        <BlockHexes />
        <div className="relative max-w-[1000px] mx-auto flex flex-col items-center text-center">
          <h2 className="text-5xl max-[600px]:text-4xl font-bold mb-4">
            {t('bandTitle')}
            <span className="text-[#e31337]">.</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mb-12">
            {t.rich('bandText', bandTypes)}
          </p>
          <LiveFigures
            headLabel={t('headBlockLabel')}
            transactionsLabel={t('transactionsLabel')}
            number={number}
          />
          <div className="flex flex-wrap justify-center gap-4">
            <External
              href={WORKERBEE_URL}
              className="group relative inline-flex items-center justify-center gap-3 w-[330px] max-[400px]:w-full py-4 bg-white whitespace-nowrap text-black font-semibold rounded-full overflow-hidden text-lg"
            >
              <span className="absolute inset-0 bg-[#e31337] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              <span className="relative group-hover:text-white transition-colors">
                {t('bandStream')}
              </span>
              <span className="relative text-2xl group-hover:text-white transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </External>
            <a
              href={SUMMARY_URL}
              className="w-[330px] max-[400px]:w-full py-4 border-2 border-gray-600 text-white font-semibold rounded-full hover:border-gray-400 transition-colors text-lg text-center"
            >
              {t('bandSummary')}
            </a>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto px-5 py-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: toolsJsonLd}}
        />
        <h2 className="text-[2.2rem] max-[600px]:text-[1.8rem] font-bold leading-tight mb-10 relative inline-block w-fit">
          {t('toolsTitle')}
          <span className="text-[#e31337]">.</span>
          <span className="absolute -bottom-1 left-0 h-[5px] w-[60px] bg-[#e31337]"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {leads.map((lead) => (
            <div
              key={lead.name}
              className="flex flex-col gap-2 p-6 sm:p-8 rounded-2xl bg-gray-200"
            >
              <External
                href={lead.url}
                className="w-fit text-2xl font-bold hover:text-[#e31337] hover:underline"
              >
                {leadTitle[lead.name]}
              </External>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t(`tools.${lead.name}`)}{' '}
                <External
                  href={lead.url}
                  className="text-[#e31337] font-semibold no-underline hover:translate-x-1 inline-block transition-transform"
                >
                  <span aria-hidden="true">→</span>
                  <span className="sr-only">{leadTitle[lead.name]}</span>
                </External>
              </p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {groups.map(({group, items}) => (
            <div key={group}>
              <h3 className="text-2xl font-medium text-gray-500 mb-5">
                {groupTitle[group]}
              </h3>
              <ul className="flex flex-col gap-6">{items.map(toolItem)}</ul>
              {group === 'hafApis' && (
                <External
                  href={LIVE_APIS_URL}
                  className="inline-block mt-6 font-semibold text-[#e31337] underline underline-offset-2 hover:no-underline"
                >
                  {t('browseApis')} →
                </External>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
