// Fetches the /developers facts and feed before `next build`. Not in the
// page itself: Next caches page fetches in .next/cache, which CI restores,
// so the page would show old data. Never fails the build.
import fs from 'node:fs'
import path from 'node:path'
import {fetchDeveloperFacts} from '../src/lib/developer-facts-fetch.mjs'
import {fetchDevActivity} from '../src/lib/dev-activity-fetch.mjs'

const outDir = path.join(import.meta.dirname, '..', 'build-data')
const write = (name, data) =>
  fs.writeFileSync(
    path.join(outDir, name),
    JSON.stringify(data, null, 2) + '\n',
  )

const [facts, activity] = await Promise.all([
  fetchDeveloperFacts(),
  fetchDevActivity(),
])
fs.mkdirSync(outDir, {recursive: true})
write('developer-facts.json', facts)
write('dev-activity.json', activity ?? [])
const missing = Object.keys(facts).filter((key) => facts[key] === undefined)
console.log(
  `✅ Developer facts: release ${facts.release?.tag ?? 'omitted'}` +
    (missing.length ? `, omitted: ${missing.join(', ')}` : '') +
    `; activity: ${activity?.length ?? 0} events`,
)
