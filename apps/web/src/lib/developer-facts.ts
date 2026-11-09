import {readFile} from 'node:fs/promises'
import path from 'node:path'

// Written by scripts/developer-facts.mjs before `next build`

export interface DeveloperFacts {
  asOf: string
  release?: {tag: string; date: string}
}

export interface DevActivity {
  id: string
  repo: string
  actor: string
  avatar?: string
  title: string
  url: string
  at: string
}

const FACTS_FILE = path.join(
  process.cwd(),
  'build-data',
  'developer-facts.json',
)
const ACTIVITY_FILE = path.join(
  process.cwd(),
  'build-data',
  'dev-activity.json',
)

export async function getDeveloperFacts(): Promise<DeveloperFacts | undefined> {
  try {
    const facts = JSON.parse(await readFile(FACTS_FILE, 'utf8'))
    return typeof facts?.asOf === 'string' ? facts : undefined
  } catch {
    return undefined
  }
}

export async function getDevActivity(): Promise<DevActivity[] | undefined> {
  try {
    const items = JSON.parse(await readFile(ACTIVITY_FILE, 'utf8'))
    return Array.isArray(items) && items.length ? items : undefined
  } catch {
    return undefined
  }
}
