<template>
  <div class="contributors">
    <h1>Contributors</h1>
    <div class="contributors__subtitle">
      We're a decentralized project, running on more than
      {{ CONTRIBUTORS.length }} people contributing regularly to the Hive
      Ecosystem
    </div>
    <div class="contributors__labels">
      <ContributorsContributorLabel
        v-for="label in contributorLabels"
        :key="label.value"
        :class="{
          'contributors__label--inactive':
            $route.query.t && $route.query.t !== label.value,
        }"
        :label="label.value"
        :count="label.count"
        @click.native="filterLabel(label.value)"
      />
    </div>
    <div class="contributors__container">
      <ContributorsContributor
        v-for="contributor in $accessor.contributors"
        :key="contributor.id"
        class="contributors__contributor"
        :contributor="contributor"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useAsync,
  computed,
  ref,
  watch,
  useRoute,
} from '@nuxtjs/composition-api'
import {shuffleArray, routerPush} from '~/helpers/util'
import {CONTRIBUTORS, CONTRIBUTOR_LABELS} from '~/helpers/var'
import {IContributor} from '~/types'

export default defineComponent({
  props: {
    full: {
      type: Boolean,
      default: true,
    },
  },

  setup(_props, {root}) {
    const route = useRoute()

    const contributorLabels = computed(() =>
      Object.keys(CONTRIBUTOR_LABELS)
        .filter((l) => {
          return root.$accessor.shuffledContributors.filter(
            (c) => !c.inactive && c.labels.includes(l as any),
          )[0]
        })
        .map((l) => {
          return {
            value: l,
            count: root.$accessor.shuffledContributors.filter(
              (c) => !c.inactive && c.labels.includes(l as any),
            ).length,
          }
        }),
    )

    const filteredContributors = ref([] as any)

    const getFilteredContributors = (key) => {
      root.$accessor.setContributors(
        root.$accessor.shuffledContributors.filter(
          (e) => !e.inactive && (!key || e.labels.includes(key)),
        ),
      )
    }

    useAsync(() => {
      if (root.$accessor.contributors.length <= 0)
        getFilteredContributors(route.value.query.t)
    })
    watch(
      () => route.value.query.t,
      (newT) => getFilteredContributors(newT),
    )

    return {
      filteredContributors: filteredContributors as IContributor[],
      contributorLabels,
      CONTRIBUTORS,
    }
  },
  methods: {
    async filterLabel(key: string) {
      if (this.$route.query.t === key) {
        await routerPush(this, `/about`)
      } else {
        await routerPush(this, `/about?t=${key}`)
      }
    },
  },
})
</script>

<style lang="scss">
.contributors {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  max-width: 1200px;
  width: 100%;

  &__subtitle {
    margin-bottom: 10px;
  }

  &__labels {
    display: flex;
    flex-flow: row wrap;
    margin-top: 20px;
    margin-bottom: 15px;
    .contributor-label {
      margin-right: 12px;
      margin-bottom: 8px;
    }
  }

  &__label {
    &--inactive {
      opacity: 0.333;
      &:hover {
        opacity: 0.75;
      }
    }
  }

  &__container {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    width: 100%;
  }

  &__contributor {
    margin: 10px;
  }
}
</style>
