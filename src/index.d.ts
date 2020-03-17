/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue from 'vue'
// import {VqlClient} from 'villus/dist/types/src/client'
import i18n from 'nuxt-i18n'
import { accessorType } from './store'

// const client = createClient({})
declare module 'vue/types/vue' {
  interface Vue {
    $accessor: typeof accessorType
    // $graphql: typeof VqlClient
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $accessor: typeof accessorType
    // $graphql: typeof VqlClient
  }
}
