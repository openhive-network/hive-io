<template>
  <div id="header" class="header">
    <div class="header__inner">
      <nuxt-link to="/">
        <Logo class="header__logo" />
      </nuxt-link>

      <Navigation class="header__navigation" :items="items" />
      <MobileMenu class="header__navigationMobile" :items="items" />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@vue/composition-api'
import Logo from '~/components/logo/logo.vue'
import MobileMenu from '~/components/mobileMenu/mobileMenu.vue'
import Navigation from '~/components/navigation/navigation.vue'
export default defineComponent({
  components: {Logo, MobileMenu, Navigation},
  props: {
    items: {
      type: Array,
      default: () => [] as any[],
    },
  },

  setup() {
    return {}
  },
})
</script>

<style lang="scss">
.header {
  max-width: 1300px;
  width: 100%;
  &__inner {
    padding: 20px 40px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    height: 33px;
  }

  &__navigation {
    &Mobile {
      display: none;
    }
  }
}

@media (max-width: 600px) {
  .header {
    &__navigation {
      display: none !important;
      &Mobile {
        display: initial !important;
      }
    }

    &__logo {
      z-index: 100;
    }
  }
}
</style>
