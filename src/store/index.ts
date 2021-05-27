// eslint-disable-next-line import/no-extraneous-dependencies
// import { Context } from '@nuxt/types'
import {getterTree, getAccessorType, mutationTree, actionTree} from 'typed-vuex'
import {IContributor, IEcoItem} from '~/types'
import {ECOSYSTEM} from '~/helpers/ecosystem'
import {shuffleArray} from '~/helpers/util'
import {CONTRIBUTORS} from '~/helpers/var'

// Import all your submodules
// import * as scheduleModule from '../../schedule'

export const state = () => ({
  test: '',
  preventScroll: false,
  isMobileActive: false,
  activeEco: {} as IEcoItem,
  globalAppsData: null,
  statsAppsData: [] as any[],
  shuffledContributors: [] as IContributor[],
  contributors: [] as IContributor[],
  contributorLabels: [] as any[],
})

export const getters = getterTree(state, {
  similarEco: (state) => {
    if (!state.activeEco.id) return ECOSYSTEM
    return ECOSYSTEM.filter((e) => {
      // if (e.id === state.activeEco.id) return false
      return e.types.filter((t) => state.activeEco.types.includes(t))[0]
    })
  },
  otherEco: (state) => {
    if (!state.activeEco.id) return ECOSYSTEM
    return ECOSYSTEM.filter((e) => {
      // if (e.id === state.activeEco.id) return false
      return !e.types.filter((t) => state.activeEco.types.includes(t))[0]
    })
  },
})

export const mutations = mutationTree(state, {
  setIsMobileActive: (state, isMobileActive) => {
    state.isMobileActive = isMobileActive
    state.preventScroll = isMobileActive
  },
  setPreventScroll: (state, preventScroll) => {
    state.preventScroll = preventScroll
  },
  setActiveEco: (state, eco: IEcoItem) => {
    state.activeEco = eco
  },
  resetActiveEco: (state) => {
    state.activeEco = {} as any
  },
  setGlobalAppsData: (state, data) => {
    state.globalAppsData = data
  },
  setStatsAppsData: (state, data) => {
    state.statsAppsData = data
  },
  setShuffledContributors: (state, shuffledContributors) => {
    state.shuffledContributors = shuffledContributors
  },
  setContributors: (state, contributors) => {
    state.contributors = contributors
  },
  setContributorLabels: (state, labels) => {
    state.contributorLabels = labels
  },
})

export const actions = actionTree(
  {state, getters, mutations},
  {
    // async nuxtServerInit({commit}, {req, app}: any) {

    // },
    nuxtClientInit({commit}) {
      commit(
        'setShuffledContributors',
        shuffleArray(CONTRIBUTORS.filter((e) => !e.inactive)),
      )
      this.$axios
        .get('https://hivedapps.com/api/global')
        .then((result) => {
          if (result.status === 200) {
            commit('setGlobalAppsData', result.data.data)
          }
        })
        .catch()

      this.$axios
        .get('https://hivedapps.com/api/apps')
        .then((result) => {
          if (result.status === 200) {
            commit('setStatsAppsData', result.data.apps)
          }
        })
        .catch()
    },
  },
)

// This compiles to nothing and only serves to return the correct type of the accessor
export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  // actions,
  modules: {
    // The key (submodule) needs to match the Nuxt namespace (e.g. ~/store/submodule.ts)
    // module
    // schedule: scheduleModule
  },
})
