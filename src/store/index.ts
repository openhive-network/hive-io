// eslint-disable-next-line import/no-extraneous-dependencies
// import { Context } from '@nuxt/types'
import {
  getterTree,
  getAccessorType,
  mutationTree,
  actionTree
} from 'nuxt-typed-vuex'

// Import all your submodules
// import * as module from './module'

export const state = () => ({
  test: '',
  preventScroll: false,
  isMobileActive: false
})

export const getters = getterTree(state, {
  text: (state) => state.test
})

export const mutations = mutationTree(state, {
  setIsMobileActive: (state, isMobileActive) => {
    state.isMobileActive = isMobileActive
    state.preventScroll = isMobileActive
  },
  setPreventScroll: (state, preventScroll) => {
    state.preventScroll = preventScroll
  }
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    // async nuxtServerInit(ctx, { req, app }: Context) {}
  }
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
  }
})
