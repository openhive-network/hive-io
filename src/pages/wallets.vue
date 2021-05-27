<template>
  <div class="wallets">
    <div class="wallets__inner">
      <div class="wallets__first">
        <h1 class="wallets__title">{{ $t(`wallets.title`) }}</h1>
        <p class="wallets__text">
          {{ $t(`wallets.text`) }}
        </p>
      </div>
      <div class="wallets__apps">
        <App v-for="wallet in WALLETS" :key="wallet.id" :item="wallet" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import {WALLETS} from '../helpers/var'

export default defineComponent({
  name: 'Wallets',
  props: {},
  setup() {
    return {WALLETS}
  },
})
</script>

<style lang="scss" scoped>
.wallets {
  display: flex;
  align-items: center;
  margin-bottom: 150px;
  &__inner {
    display: flex;
    flex-flow: column;
    align-items: center;
    align-items: center;
    padding: 0 30px;
    width: calc(100% - 60px);
  }
  &__first {
    margin-top: 100px;
    padding: 0 0 20px 0;
    max-width: 720px;
    min-height: 160px;
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
    align-items: flex-start;
    justify-content: center;
    max-width: 900px;
  }
}

@media (max-width: 700px) {
  .wallets__first {
    margin-top: 100px;
  }
}

@media (max-width: 600px) {
  .wallets__first {
    margin-top: 20px;
  }
}
</style>
