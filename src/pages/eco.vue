<template>
  <div class="eco">
    <div class="eco__inner">
      <div class="eco__first">
        <h1 class="eco__title">{{ $t(`eco.title`) }}</h1>
        <p class="eco__text">
          {{ $t(`eco.text`) }}
        </p>
      </div>
      <div class="eco__types">
        <AppType
          v-for="appType in appTypes"
          :key="appType.value"
          :class="{
            'eco__type--inactive':
              $route.query.t && $route.query.t !== appType.value,
          }"
          :app-type="appType.value"
          :count="appType.count"
          @click.native="filterEco(appType.value)"
        />
      </div>
      <ModalEco />

      <div class="eco__apps">
        <!-- <EcoDetailed
          v-if="$route.name === 'eco-app' || $accessor.activeEco.id"
        /> -->
        <App
          v-for="eco in filteredEco"
          :key="eco.id"
          :item="eco"
          :open-modal="true"
          :move="true"
          :show-name="true"
          :show-types="true"
          app-type="eco"
        />
      </div>
      <h2 style="margin-top: 40px">But wait, there's more...</h2>
      <p>
        Over <b>190 projects</b> have been BUIDL'd by the Hive community. You
        can view all of them via HiveProjects.io
      </p>
      <StatWebsite :item="HIVE_PROJECTS" :transparent="true" />

      <h2 class="eco__subTitle">{{ $t(`eco.subTitle`) }}</h2>
      <p class="eco__subText">
        {{ $t(`eco.subText`) }}
      </p>
      <div class="eco__statistics">
        <StatWebsite
          v-for="site in STATISTIC_WEBSITES"
          :key="site.id"
          :item="site"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useRouter,
  useRoute,
  watch,
  reactive,
  ref,
  computed,
  useAsync,
} from '@nuxtjs/composition-api'
import {
  ECOSYSTEM,
  STATISTIC_WEBSITES,
  TYPE_COLORS,
  HIVE_PROJECTS,
} from '../helpers/var'
import {routerPush} from '~/helpers/util'
import EcoDetailed from '~/components/app/ecoDetailed.vue'

export default defineComponent({
  name: 'Eco',
  components: {EcoDetailed},
  props: {},
  setup(_prop, {root}) {
    const route = useRoute()
    useAsync(() => {
      if (route.value.name === 'eco-app') {
        root.$accessor.setActiveEco(
          ECOSYSTEM.filter((e) => e.id === route.value.params.app)[0],
        )
      }
    })
    const appTypes = computed(() =>
      Object.keys(TYPE_COLORS)
        .filter((c) => {
          return ECOSYSTEM.filter((e) => e.types.includes(c as any))[0]
        })
        .map((c) => {
          return {
            value: c,
            count: ECOSYSTEM.filter((e) => e.types.includes(c as any)).length,
          }
        }),
    )
    const filteredEco = ref([] as any)

    const getFilteredEco = (key) => {
      filteredEco.value = ECOSYSTEM.filter((e) => !key || e.types.includes(key))
    }

    getFilteredEco(route.value.query.t)
    watch(
      () => route.value.query.t,
      (newT) => getFilteredEco(newT),
    )
    return {
      filteredEco,
      appTypes,
      ECOSYSTEM,
      STATISTIC_WEBSITES,
      HIVE_PROJECTS,
    }
  },
  methods: {
    async filterEco(key: string) {
      if (this.$route.query.t === key) {
        await routerPush(this, `/eco`)
      } else {
        await routerPush(this, `/eco?t=${key}`)
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.eco {
  display: flex;
  align-items: center;
  margin-bottom: 150px;
  &__inner {
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 0 30px;
    width: calc(100% - 60px);
  }
  &__first {
    margin-top: 100px;
    padding: 0 0 20px 0;
    max-width: 720px;
    min-height: 120px;
    width: 100%;
    text-align: center;
  }

  &__text {
    max-width: 820px;
    margin-bottom: 0;
  }

  &__types {
    display: flex;
    flex-flow: row wrap;
    margin-top: 20px;
    margin-bottom: 15px;
    .app-type {
      margin-right: 12px;
      margin-bottom: 8px;
    }
  }

  &__type {
    &--inactive {
      opacity: 0.333;
      &:hover {
        opacity: 0.75;
      }
    }
  }

  h1 {
    text-align: center;
  }

  h3 {
    font-size: 1.5rem;
  }

  &__apps {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    max-width: 1000px;
  }

  &__subTitle {
    margin: 60px 0 15px 0;
  }

  &__statistics {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    max-width: 800px;
    margin-top: 20px;
  }
}

@media (max-width: 700px) {
  .eco__first {
    margin-top: 100px;
  }
}

@media (max-width: 600px) {
  .eco {
    &__first {
      margin-top: 20px;
    }

    &__types {
      justify-content: space-evenly;
    }
  }
}
</style>
