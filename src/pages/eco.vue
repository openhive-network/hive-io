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
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { ECOSYSTEM } from '../helpers/var'
import Logo from '~/components/logo/logo.vue'
import App from '~/components/app/app.vue'

export default defineComponent({
  components: { Logo, App },
  props: {},
  setup() {
    return { ECOSYSTEM }
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

  h2 {
    font-size: 3.8rem;
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
