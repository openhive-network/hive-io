'use client'

import {useEffect, useRef, useState} from 'react'

// Decorative: the operation types of a recent block as open hexagons.

const COUNTS_URL =
  'https://api.hive.blog/hafbe-api/operation-type-counts?result-limit=1'
const BLOCK_MS = 3_000
const FADE_IN_MS = 900
const FADE_OUT_MS = 1100

export type HexType =
  'accounts' | 'posts' | 'votes' | 'json' | 'transfers' | 'other' | 'vops'

// Same tints as the type words in the band paragraph
export const HEX_COLORS: Record<HexType, string> = {
  accounts: '#7dd3fc',
  posts: '#fcd34d',
  votes: '#fda4af',
  json: '#c4b5fd',
  transfers: '#6ee7b7',
  other: '#9ca3af',
  vops: '#6b7280',
}

// Operation type ids (hafah-api/operation-types); 50 and up are virtual
const TYPE_IDS: Record<Exclude<HexType, 'other' | 'vops'>, number[]> = {
  accounts: [9, 10, 22, 23, 24, 25, 26, 41, 43],
  posts: [1, 17, 19],
  votes: [0, 12, 13, 45],
  json: [15, 18, 35],
  transfers: [2, 3, 27, 29, 31, 32, 33, 49],
}
const FIRST_VIRTUAL = 50
const TYPE_OF = new Map<number, HexType>(
  Object.entries(TYPE_IDS).flatMap(([type, ids]) =>
    ids.map((id) => [id, type as HexType] as const),
  ),
)

const COLS = 28
const ROWS = 3
const R = 20 // circumradius
const W = Math.sqrt(3) * R
const ROW_STEP = 1.5 * R
const VIEW_W = COLS * W + W / 2
const VIEW_H = (ROWS - 1) * ROW_STEP + 2 * R + 2
const MAX_HEXES = 64
const ROW_SPAN = [1, 0.85, 0.6]
const MAX_DELAY_MS = 380

interface Cell {
  x: number
  y: number
  row: number
  col: number
}
const CELLS: Cell[] = Array.from({length: ROWS * COLS}, (_, i) => {
  const row = Math.floor(i / COLS)
  const col = i % COLS
  return {
    row,
    col,
    x: col * W + (row % 2 ? W : W / 2),
    y: VIEW_H - R - 1 - row * ROW_STEP,
  }
})
const HEX_POINTS = Array.from({length: 6}, (_, k) => {
  const a = (Math.PI / 3) * k - Math.PI / 2
  return `${(R * 0.9 * Math.cos(a)).toFixed(2)},${(R * 0.9 * Math.sin(a)).toFixed(2)}`
}).join(' ')

function seeded(seed: number) {
  let s = seed >>> 0 || 1
  return () => {
    s ^= s << 13
    s ^= s >>> 17
    s ^= s << 5
    return (s >>> 0) / 4294967296
  }
}

interface OpCount {
  op_type_id: number
  op_count: number
}

// Virtual ops count once per type, so payout blocks do not flood the pile
function hexesFor(ops: OpCount[]) {
  const totals = new Map<HexType, number>()
  for (const {op_type_id: id, op_count: count} of ops) {
    const type =
      id >= FIRST_VIRTUAL ? 'vops' : (TYPE_OF.get(id) ?? ('other' as const))
    const add = type === 'vops' ? 1 : count
    totals.set(type, (totals.get(type) ?? 0) + add)
  }
  return [...totals].flatMap(([type, n]) =>
    Array<HexType>(Math.max(1, Math.round(Math.sqrt(n) * 2.2))).fill(type),
  )
}

function layout(types: HexType[], block: number) {
  const random = seeded(block)
  const shuffled = [...types].sort(() => random() - 0.5).slice(0, MAX_HEXES)
  const drift = Math.max(0.06, 0.3 - shuffled.length / 160)
  const center = COLS / 2 + (random() - 0.5) * COLS * drift
  const order = CELLS.filter(
    (c) => Math.abs(c.col - center) <= (COLS * ROW_SPAN[c.row]) / 2,
  )
    .map((c) => ({
      c,
      key: c.row * 4.5 + Math.abs(c.col - center) + random() * 4,
    }))
    .sort((a, b) => a.key - b.key)
  const slots: (HexType | null)[] = CELLS.map(() => null)
  shuffled.forEach((type, i) => {
    const cell = order[i]?.c
    if (cell) slots[cell.row * COLS + cell.col] = type
  })
  const delays = CELLS.map((c) =>
    Math.round(random() * MAX_DELAY_MS * 0.75 + (c.row * MAX_DELAY_MS) / 8),
  )
  return {slots, delays}
}

async function latestBlock(): Promise<
  {block: number; ops: OpCount[]} | undefined
> {
  try {
    const response = await fetch(COUNTS_URL, {
      signal: AbortSignal.timeout(BLOCK_MS),
    })
    if (!response.ok) return undefined
    const [latest] = await response.json()
    return Array.isArray(latest?.operations)
      ? {block: latest.block_num, ops: latest.operations}
      : undefined
  } catch {
    return undefined
  }
}

type Pile = ReturnType<typeof layout>
const EMPTY: Pile = {slots: [], delays: []}

export function BlockHexes() {
  const ref = useRef<SVGSVGElement>(null)
  const [layers, setLayers] = useState<[Pile, Pile]>([EMPTY, EMPTY])
  const [front, setFront] = useState<0 | 1>(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const svg = ref.current
    if (!svg) return
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let inView = false
    let lastBlock = 0
    let shown: 0 | 1 = 0
    let timer: ReturnType<typeof setInterval> | undefined
    let frame = 0

    const tick = async () => {
      if (!inView || document.visibilityState !== 'visible') return
      const latest = await latestBlock()
      if (!latest || latest.block <= lastBlock) return
      lastBlock = latest.block
      const next = layout(hexesFor(latest.ops), latest.block)
      const back: 0 | 1 = shown ? 0 : 1
      // Swap a frame later so the new layer fades in from 0
      setLayers((current) => {
        const copy: [Pile, Pile] = [current[0], current[1]]
        copy[back] = next
        return copy
      })
      if (still) {
        shown = back
        setFront(back)
        return
      }
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          shown = back
          setFront(back)
        }),
      )
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      clearInterval(timer)
      if (!inView) return
      setReady(true)
      tick()
      if (!still) timer = setInterval(tick, BLOCK_MS)
    })
    observer.observe(svg)
    return () => {
      observer.disconnect()
      clearInterval(timer)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${VIEW_W.toFixed(0)} ${VIEW_H.toFixed(0)}`}
      preserveAspectRatio="xMidYMax meet"
      className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-full min-w-[760px] max-w-[1200px] h-auto"
    >
      <defs>
        <polygon id="block-hex" points={HEX_POINTS} />
      </defs>
      {ready &&
        layers.map(({slots, delays}, layer) => {
          const on = layer === front
          return (
            <g key={layer}>
              {CELLS.map((cell, i) => {
                const type = slots[i]
                return (
                  <use
                    key={i}
                    href="#block-hex"
                    x={cell.x.toFixed(1)}
                    y={cell.y.toFixed(1)}
                    fill="none"
                    strokeWidth={1.5}
                    stroke={type ? HEX_COLORS[type] : 'none'}
                    style={{
                      opacity: type && on ? (type === 'vops' ? 0.36 : 0.45) : 0,
                      transition: `opacity ${on ? FADE_IN_MS : FADE_OUT_MS}ms ease-in-out`,
                      transitionDelay: `${delays[i] ?? 0}ms`,
                    }}
                    className="motion-reduce:transition-none"
                  />
                )
              })}
            </g>
          )
        })}
    </svg>
  )
}
