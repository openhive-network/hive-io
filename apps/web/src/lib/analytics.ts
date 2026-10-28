// Typed GA4 helper. Every call is a no-op during SSR, without a measurement
// ID, or on a host outside ALLOWED_HOSTS, so clones that copy the build and
// local or staging builds never report into the hive.io property.
// Never pass usernames, keys, transaction ids or free-text error messages.

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

const ALLOWED_HOSTS = ['hive.io', 'www.hive.io']

// Bump when the site layout changes enough to compare before/after in GA4.
const UI_VERSION = 'v2'

// Visiting any page with ?internal=1 marks this browser as internal until
// ?internal=0. GA4's Internal Traffic data filter drops traffic_type=internal.
const INTERNAL_KEY = 'hive_internal'

// Visiting any page with ?debug=1 turns on debug_mode for this tab until
// ?debug=0 (sessionStorage). Events then show in GA4 DebugView and stay out
// of standard reports. Debug traffic is also marked internal. It does not
// bypass ALLOWED_HOSTS.
const DEBUG_KEY = 'hive_debug'

export type PageType =
  | 'home'
  | 'about'
  | 'brand'
  | 'contributors'
  | 'core_dev_meetings'
  | 'developers'
  | 'eco'
  | 'hbd'
  | 'join'
  | 'roadmap'
  | 'wallets'
  | 'other'

export interface AnalyticsEvents {
  outbound_click: {
    link_domain: string
    link_url: string
    app_name?: string
    app_category?: string
    placement?: string
  }
  sign_up_start: {provider: string; placement: string}
  sign_up: {method: 'sponsored'; auth_method?: string}
  sign_up_error: {
    method: 'sponsored'
    error_type: 'missing_info' | 'no_token' | 'create_failed' | 'exception'
  }
  nav_click: {link_url: string; link_domain?: string; placement: string}
  eco_filter: {filter_name: string; toggle_state: 'on' | 'off'}
  stat_interact: {stat: string; action: string}
  data_fallback: {fallback_source: string}
  language_switch: {from_lang: string; to_lang: string}
  read_depth: {percent: 25 | 50 | 75 | 100}
  page_not_found: {page_path: string}
  // Per Google's web-vitals guidance: value is the delta since the last
  // report for this metric_id, so summing value per metric_id in BigQuery
  // gives the final figure; metric_value is the current total.
  web_vitals: {
    metric_name: string
    metric_rating: string
    metric_id: string
    metric_value: number
    value: number
  }
}

export type AnalyticsEvent = keyof AnalyticsEvents

type Gtag = (...args: unknown[]) => void

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
  }
}

let ready: boolean | null = null
let debug = false

function readInternalFlag(): boolean {
  try {
    const param = new URLSearchParams(window.location.search).get('internal')
    if (param === '1') localStorage.setItem(INTERNAL_KEY, '1')
    if (param === '0') localStorage.removeItem(INTERNAL_KEY)
    return localStorage.getItem(INTERNAL_KEY) === '1'
  } catch {
    return false
  }
}

function readDebugFlag(): boolean {
  try {
    const param = new URLSearchParams(window.location.search).get('debug')
    if (param === '1') sessionStorage.setItem(DEBUG_KEY, '1')
    if (param === '0') sessionStorage.removeItem(DEBUG_KEY)
    return sessionStorage.getItem(DEBUG_KEY) === '1'
  } catch {
    return false
  }
}

// Loads gtag once, on the first call from the client. Returns whether events
// may be sent from this page.
function init(): boolean {
  if (ready !== null) return ready
  if (typeof window === 'undefined') return false
  ready = Boolean(GA_ID) && ALLOWED_HOSTS.includes(window.location.hostname)
  if (!ready) return false

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // gtag.js reads the arguments object, not an array
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  debug = readDebugFlag()
  window.gtag('js', new Date())
  window.gtag('set', {
    site_lang: document.documentElement.lang || 'en',
    ui_version: UI_VERSION,
    ...((readInternalFlag() || debug) && {traffic_type: 'internal'}),
  })
  // Page views are sent by trackPageView on every route change, including
  // the first, so the automatic one is off.
  window.gtag('config', GA_ID, {
    send_page_view: false,
    ...(debug && {debug_mode: true}),
  })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)
  return true
}

const PAGE_TYPES: PageType[] = [
  'about',
  'brand',
  'contributors',
  'core_dev_meetings',
  'developers',
  'eco',
  'hbd',
  'join',
  'roadmap',
  'wallets',
]

export function pageType(pathname: string): PageType {
  const segments = pathname
    .split('/')
    .filter(Boolean)
    .map((segment) => segment.replace(/-/g, '_'))
  // Skip a locale prefix such as /de/ (any short segment that is not a page)
  if (
    segments[0] &&
    !PAGE_TYPES.includes(segments[0] as PageType) &&
    /^[a-z]{2,3}$/.test(segments[0])
  ) {
    segments.shift()
  }
  if (!segments[0]) return 'home'
  return PAGE_TYPES.includes(segments[0] as PageType)
    ? (segments[0] as PageType)
    : 'other'
}

export function track<E extends AnalyticsEvent>(
  event: E,
  params: AnalyticsEvents[E],
) {
  if (!init()) return
  window.gtag!('event', event, {
    page_type: pageType(window.location.pathname),
    ...(debug && {debug_mode: true}),
    ...params,
  })
}

const sentOnce = new Set<string>()

// For events that can repeat on every poll (data_fallback): sends each
// event + params pair once per page load.
export function trackOnce<E extends AnalyticsEvent>(
  event: E,
  params: AnalyticsEvents[E],
) {
  const key = `${event}:${JSON.stringify(params)}`
  if (sentOnce.has(key)) return
  sentOnce.add(key)
  track(event, params)
}

export function trackPageView() {
  if (!init()) return
  window.gtag!('event', 'page_view', {
    page_location: window.location.href,
    page_title: document.title,
    page_type: pageType(window.location.pathname),
    ...(debug && {debug_mode: true}),
  })
}
