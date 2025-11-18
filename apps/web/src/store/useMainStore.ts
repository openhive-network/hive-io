import {create} from 'zustand'
import type {IContributor, IEcoItem} from '@/types'
import {ECOSYSTEM} from '@/lib/data/ecosystem'
import {shuffleArray} from '@/lib/data/util'
import {CONTRIBUTORS} from '@/lib/data/var'

interface MainStore {
  // State
  test: string
  preventScroll: boolean
  isMobileActive: boolean
  activeEco: IEcoItem
  globalAppsData: any
  statsAppsData: any[]
  shuffledContributors: IContributor[]
  contributors: IContributor[]
  contributorLabels: any[]

  // Actions
  setIsMobileActive: (isMobileActive: boolean) => void
  setPreventScroll: (preventScroll: boolean) => void
  setActiveEco: (eco: IEcoItem) => void
  resetActiveEco: () => void
  setShuffledContributors: (shuffledContributors: IContributor[]) => void
  setContributors: (contributors: IContributor[]) => void
  setContributorLabels: (labels: any[]) => void
  shuffleContributors: () => void
  initializeApp: () => Promise<void>

  // Computed / Getters
  getSimilarEco: () => IEcoItem[]
  getOtherEco: () => IEcoItem[]
}

export const useMainStore = create<MainStore>((set, get) => ({
  // Initial state
  test: '',
  preventScroll: false,
  isMobileActive: false,
  activeEco: {} as IEcoItem,
  globalAppsData: null,
  statsAppsData: [],
  shuffledContributors: [],
  contributors: [],
  contributorLabels: [],

  // Actions
  setIsMobileActive: (isMobileActive: boolean) => {
    set({isMobileActive, preventScroll: isMobileActive})
  },

  setPreventScroll: (preventScroll: boolean) => {
    set({preventScroll})
  },

  setActiveEco: (eco: IEcoItem) => {
    set({activeEco: eco})
  },

  resetActiveEco: () => {
    set({activeEco: {} as IEcoItem})
  },

  setGlobalAppsData: (data: any) => {
    set({globalAppsData: data})
  },

  setStatsAppsData: (data: any[]) => {
    set({statsAppsData: data})
  },

  setShuffledContributors: (shuffledContributors: IContributor[]) => {
    set({shuffledContributors})
  },

  setContributors: (contributors: IContributor[]) => {
    set({contributors})
  },

  setContributorLabels: (labels: any[]) => {
    set({contributorLabels: labels})
  },

  shuffleContributors: () => {
    const shuffled = shuffleArray(CONTRIBUTORS.filter((e) => !e.inactive))
    set({shuffledContributors: shuffled})
  },

  initializeApp: async () => {
    // Shuffle contributors on init
    get().shuffleContributors()
  },

  // Computed / Getters
  getSimilarEco: () => {
    const {activeEco} = get()
    if (!activeEco.id) return ECOSYSTEM
    return ECOSYSTEM.filter((e) => {
      return e.types.filter((t) => activeEco.types.includes(t))[0]
    })
  },

  getOtherEco: () => {
    const {activeEco} = get()
    if (!activeEco.id) return ECOSYSTEM
    return ECOSYSTEM.filter((e) => {
      return !e.types.filter((t) => activeEco.types.includes(t))[0]
    })
  },
}))
