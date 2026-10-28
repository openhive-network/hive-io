// Writes out/sitemap.xml after the static export. Each URL's lastmod is the
// date of the last commit that touched the page's own sources, so search
// engines (and the IndexNow step in CI) see which pages actually changed.
// The English copy (messages/en.json) counts for every page, so a copy-only
// release still changes lastmod and pings IndexNow. The layout and other
// shared files are left out on purpose: they change often and would mark
// every page as new. A page with no commit in the local history (shallow
// clone) gets no lastmod rather than a guess.
import fs from 'node:fs'
import path from 'node:path'
import {execFileSync} from 'node:child_process'

const SITE = 'https://hive.io'
const srcDir = path.join(import.meta.dirname, '..', 'src')
const outFile = path.join(import.meta.dirname, '..', 'out', 'sitemap.xml')

const PAGES = [
  {
    path: '/',
    priority: '1.00',
    sources: [
      'app/[locale]/(home)',
      'components/root',
      'components/hero',
      'lib/data/exchanges.ts',
    ],
  },
  {
    path: '/about/',
    priority: '0.80',
    sources: ['app/[locale]/about', 'lib/data/videos.ts'],
  },
  {
    path: '/eco/',
    priority: '0.80',
    sources: [
      'app/[locale]/eco',
      'lib/data/ecosystem.ts',
      'lib/data/statswebsites.ts',
    ],
  },
  {
    path: '/wallets/',
    priority: '0.80',
    sources: ['app/[locale]/wallets', 'lib/data/wallets.ts'],
  },
  {
    path: '/brand/',
    priority: '0.80',
    sources: ['app/[locale]/brand', 'components/color'],
  },
  {
    path: '/developers/',
    priority: '0.80',
    sources: ['app/[locale]/developers'],
  },
  {path: '/hbd/', priority: '0.80', sources: ['app/[locale]/hbd']},
  {
    path: '/join/',
    priority: '0.80',
    sources: ['app/[locale]/join', 'components/join'],
  },
  {path: '/roadmap/', priority: '0.80', sources: ['app/[locale]/roadmap']},
  {
    path: '/contributors/',
    priority: '0.70',
    sources: [
      'app/[locale]/contributors',
      'components/contributors',
      'lib/data/contributors.ts',
    ],
  },
  {
    path: '/core-dev-meetings/',
    priority: '0.70',
    sources: ['app/[locale]/core-dev-meetings', 'lib/data/coredevmeetings.ts'],
  },
]

// Relative to srcDir.
const SHARED_SOURCES = ['../messages/en.json']

// Pathspecs are literal: [locale] and (home) are not globs.
function lastCommitDate(sources) {
  try {
    const date = execFileSync(
      'git',
      [
        'log',
        '-1',
        '--format=%cs',
        '--',
        ...[...sources, ...SHARED_SOURCES].map((s) => `:(literal)${s}`),
      ],
      {cwd: srcDir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore']},
    ).trim()
    return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : null
  } catch {
    return null
  }
}

const entries = PAGES.map((page) => {
  const lastmod = lastCommitDate(page.sources)
  if (!lastmod) console.warn(`⚠️  Sitemap: no commit date for ${page.path}`)
  return [
    '<url>',
    `  <loc>${SITE}${page.path}</loc>`,
    ...(lastmod ? [`  <lastmod>${lastmod}</lastmod>`] : []),
    `  <priority>${page.priority}</priority>`,
    '</url>',
  ].join('\n')
})

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`

fs.writeFileSync(outFile, xml)
console.log(`✅ Sitemap: ${PAGES.length} URLs written to out/sitemap.xml`)
