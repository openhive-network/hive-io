// "Latest Shipped": PRs merged in the last 14 days across the repos
// HiveDevsTracker follows, read from the GitHub and GitLab APIs.
import {GITHUB_OWNERS, TRACKED_REPOS} from './dev-tracker-repos.mjs'

export const TRACKER_URL = 'https://hdt.hive.pizza/'
const GITHUB_SEARCH = 'https://api.github.com/search/issues'
const GITLAB_MERGED =
  'https://gitlab.syncad.com/api/v4/groups/hive/merge_requests?state=merged&order_by=merged_at&sort=desc&per_page=50&include_subgroups=true'
const WINDOW_DAYS = 14
const MAX_ITEMS = 8
// GitHub search queries are limited to 256 characters
const MAX_QUERY = 250
const TIMEOUT_MS = 10_000

// HiveDevsTracker's bot rule (api/app/normalize.py, is_bot_login)
const isBot = (login) => !login || login.toLowerCase().includes('bot')

function smallAvatar(url) {
  try {
    const avatar = new URL(url)
    if (avatar.protocol !== 'https:') return undefined
    if (
      avatar.hostname === 'avatars.githubusercontent.com' ||
      avatar.hostname.endsWith('gravatar.com')
    )
      avatar.searchParams.set('s', '40')
    else if (avatar.hostname === 'gitlab.syncad.com')
      avatar.searchParams.set('width', '40')
    else return undefined
    return avatar.href
  } catch {
    return undefined
  }
}

async function json(url, headers) {
  try {
    const response = await fetch(url, {
      headers,
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    return response.ok ? await response.json() : undefined
  } catch {
    return undefined
  }
}

function searchQueries(since) {
  const base = `is:pr is:merged merged:>=${since}`
  const queries = []
  let query = base
  for (const owner of GITHUB_OWNERS) {
    const next = `${query} user:${owner}`
    if (next.length > MAX_QUERY && query !== base) {
      queries.push(query)
      query = `${base} user:${owner}`
    } else query = next
  }
  return [...queries, query]
}

async function github(since) {
  const token =
    typeof process !== 'undefined' ? process.env?.GITHUB_TOKEN : undefined
  const headers = {
    Accept: 'application/vnd.github+json',
    ...(token && {Authorization: `Bearer ${token}`}),
  }
  const pages = await Promise.all(
    searchQueries(since).map((q) =>
      json(
        `${GITHUB_SEARCH}?${new URLSearchParams({
          q,
          sort: 'updated',
          order: 'desc',
          per_page: typeof window === 'undefined' ? '50' : '20',
        })}`,
        headers,
      ),
    ),
  )
  return pages.flatMap((page) =>
    (page?.items ?? []).map((pr) => ({
      repo: pr.repository_url?.split('/repos/')[1],
      platform: 'github',
      actor: pr.user?.login,
      avatar: smallAvatar(pr.user?.avatar_url),
      title: pr.title,
      url: pr.html_url,
      at: pr.pull_request?.merged_at,
    })),
  )
}

async function gitlab() {
  const merged = await json(GITLAB_MERGED)
  return (Array.isArray(merged) ? merged : []).map((mr) => ({
    repo: mr.references?.full?.split('!')[0],
    platform: 'gitlab',
    actor: mr.author?.username,
    avatar: smallAvatar(mr.author?.avatar_url),
    title: mr.title,
    url: mr.web_url,
    at: mr.merged_at,
  }))
}

/** @returns {Promise<import('./developer-facts').DevActivity[] | undefined>} */
export async function fetchDevActivity() {
  try {
    const since = new Date(Date.now() - WINDOW_DAYS * 86_400_000)
      .toISOString()
      .slice(0, 10)
    const all = (await Promise.all([github(since), gitlab()])).flat()
    const repos = new Set()
    const shipped = all
      .filter(
        (pr) =>
          TRACKED_REPOS.has(`${pr.platform}:${pr.repo}`) &&
          !isBot(pr.actor) &&
          pr.title &&
          !/^Merge\b/.test(pr.title) &&
          pr.url?.startsWith('https://') &&
          pr.at,
      )
      .sort((a, b) => Date.parse(b.at) - Date.parse(a.at))
      .filter((pr) => !repos.has(pr.repo) && repos.add(pr.repo))
      .slice(0, MAX_ITEMS)
    if (!shipped.length) return undefined
    return shipped.map(({repo, actor, avatar, title, url, at}) => ({
      id: url,
      repo,
      actor,
      avatar,
      title,
      url,
      at,
    }))
  } catch {
    return undefined
  }
}
