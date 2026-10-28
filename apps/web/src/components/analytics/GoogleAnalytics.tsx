'use client'

import {useEffect} from 'react'
import {usePathname} from 'next/navigation'
import {useReportWebVitals} from 'next/web-vitals'
import {
  track,
  trackPageView,
  type AnalyticsEvent,
  type AnalyticsEvents,
} from '@/lib/analytics'

type Metric = Parameters<Parameters<typeof useReportWebVitals>[0]>[0]

// data-track="<event>" on an element sends that event on click, with every
// data-track-<param> attribute as a snake_case param. Without it, links
// inside data-track-nav="<placement>" send nav_click, and other links to
// another host send outbound_click, picking up data-track-app-name,
// data-track-app-category and data-track-placement from their ancestors.
function paramsFrom(element: HTMLElement) {
  const params: Record<string, string> = {}
  for (const [key, value] of Object.entries(element.dataset)) {
    if (!key.startsWith('track') || key === 'track' || value === undefined) {
      continue
    }
    const name = key
      .slice('track'.length)
      .replace(/^[A-Z]/, (c) => c.toLowerCase())
      .replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`)
    params[name] = value
  }
  return params
}

// GA4 drops parameter values longer than 100 characters
const MAX_VALUE = 100

function closestData(element: Element, attribute: string) {
  return element.closest(`[${attribute}]`)?.getAttribute(attribute) ?? undefined
}

function onClick(event: MouseEvent) {
  const target = event.target
  if (!(target instanceof Element)) return

  const tracked = target.closest<HTMLElement>('[data-track]')
  if (tracked) {
    track(
      tracked.dataset.track as AnalyticsEvent,
      paramsFrom(tracked) as unknown as AnalyticsEvents[AnalyticsEvent],
    )
    return
  }

  const link = target.closest<HTMLAnchorElement>('a[href]')
  if (!link) return
  let url: URL
  try {
    url = new URL(link.href, window.location.href)
  } catch {
    return
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return
  const external = url.hostname !== window.location.hostname

  const nav = closestData(link, 'data-track-nav')
  if (nav) {
    track('nav_click', {
      link_url: (external ? url.href : url.pathname).slice(0, MAX_VALUE),
      ...(external && {link_domain: url.hostname}),
      placement: nav,
    })
    return
  }

  if (!external) return
  track('outbound_click', {
    link_domain: url.hostname,
    link_url: url.href.slice(0, MAX_VALUE),
    app_name: closestData(link, 'data-track-app-name'),
    app_category: closestData(link, 'data-track-app-category'),
    placement: closestData(link, 'data-track-placement'),
  })
}

// Module-level so the callback is stable: a new function on every render
// makes useReportWebVitals subscribe again and report the same metric twice.
function reportWebVitals(metric: Metric) {
  track('web_vitals', {
    metric_name: metric.name,
    metric_rating: metric.rating,
    metric_id: metric.id,
    metric_value: metric.value,
    // CLS is a small fraction; scale it so GA4 keeps an integer
    value: Math.round(
      metric.name === 'CLS' ? metric.delta * 1000 : metric.delta,
    ),
  })
}

export function GoogleAnalytics() {
  const pathname = usePathname()

  // One page_view per route, including the first: client-side navigation
  // does not reload the page, so gtag's automatic page_view misses it.
  useEffect(() => {
    trackPageView()
  }, [pathname])

  useEffect(() => {
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  useReportWebVitals(reportWebVitals)

  return null
}
