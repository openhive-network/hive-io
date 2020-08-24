<template>
  <div class="eco">
    <div class="eco__inner">
      <div class="eco__first">
        <h1 class="eco__title">{{ $t(`eco.title`) }}</h1>
        <p class="eco__text">
          {{ $t(`eco.text`) }}
        </p>
      </div>
      <div class="eco__apps">
        <App v-for="eco in ECOSYSTEM" :key="eco.id" :item="eco" />
      </div>
      <h1 class="eco__subTitle">{{ $t(`eco.subTitle`) }}</h1>
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
import { defineComponent } from '@vue/composition-api'
import { ECOSYSTEM, STATISTIC_WEBSITES } from '../helpers/var'
import Logo from '~/components/logo/logo.vue'
import App from '~/components/app/app.vue'
import StatWebsite from '~/components/statWebsite/statWebsite.vue'

export default defineComponent({
  components: { Logo, App, StatWebsite },
  props: {},
  setup() {
    return { ECOSYSTEM, STATISTIC_WEBSITES }
  }
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
    min-height: 160px;
    width: 100%;
    text-align: center;
  }

  &__text {
    max-width: 820px;
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
  }
}

@media (max-width: 700px) {
  .eco__first {
    margin-top: 100px;
  }
}

@media (max-width: 600px) {
  .eco__first {
    margin-top: 20px;
  }
}
</style>
