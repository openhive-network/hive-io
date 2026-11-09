// Build-time facts for /developers and the live head block. A failed
// fetch drops the fact; nothing is guessed or hardcoded.

const GITLAB_API = 'https://gitlab.syncad.com/api/v4'
const HIVE_API = 'https://api.hive.blog'
const GROUP = 'hive'
const CORE = 'hive/hive'
// beem links to its repo: its PyPI package has had no release since 2021
export const LEAD_TOOLS = ['hive', 'haf']
export const TOOL_GROUPS = {
  hafApis: ['hivemind', 'hafah', 'haf_block_explorer'],
  libraries: ['wax', 'workerbee', 'dhive', 'beem'],
  wallets: ['clive', 'beekeeper', 'keychain', 'hivesigner'],
}
const GITHUB_TOOLS = {
  keychain: 'hive-keychain/hive-keychain-extension',
  hivesigner: 'ecency/hivesigner-sdk',
}
export const TOOLS = [...LEAD_TOOLS, ...Object.values(TOOL_GROUPS).flat()]

export const toolUrl = (name) =>
  GITHUB_TOOLS[name]
    ? `https://github.com/${GITHUB_TOOLS[name]}`
    : `https://gitlab.syncad.com/${GROUP}/${name}`
const TIMEOUT_MS = 10_000

async function request(url, body) {
  try {
    const response = await fetch(url, {
      method: body ? 'POST' : 'GET',
      headers: body ? {'Content-Type': 'application/json'} : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    return response.ok ? response : undefined
  } catch {
    return undefined
  }
}

async function json(url, body) {
  try {
    return await (await request(url, body))?.json()
  } catch {
    return undefined
  }
}

const project = (name) => `${GITLAB_API}/projects/${encodeURIComponent(name)}`

async function latestRelease() {
  const tags = await json(
    `${project(CORE)}/repository/tags?search=%5E1.&per_page=100`,
  )
  if (!Array.isArray(tags)) return undefined
  const version = (name) => name.split('.').map(Number)
  const newer = (a, b) => {
    const [x, y] = [version(a), version(b)]
    const i = x.findIndex((n, j) => n !== y[j])
    return i >= 0 && x[i] > y[i]
  }
  const latest = tags
    .filter((tag) => /^\d+\.\d+\.\d+$/.test(tag.name))
    .reduce(
      (best, tag) => (!best || newer(tag.name, best.name) ? tag : best),
      undefined,
    )
  return latest && {tag: latest.name, date: latest.commit.committed_date}
}

export async function headBlock() {
  const data = await json(HIVE_API, {
    jsonrpc: '2.0',
    method: 'database_api.get_dynamic_global_properties',
    params: {},
    id: 1,
  })
  return data?.result?.head_block_number
}

/** @returns {Promise<import('./developer-facts').DeveloperFacts>} */
export async function fetchDeveloperFacts() {
  return {asOf: new Date().toISOString(), release: await latestRelease()}
}
