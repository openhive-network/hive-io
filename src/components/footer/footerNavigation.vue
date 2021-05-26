<template>
  <div class="footer-navigation">
    <Navigation
      class="footer-navigation__navigation"
      :items="items"
      :dark="true"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
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
.footer-navigation {
  min-width: 180px;
  &__title {
  }

  &__navigation {
    flex-flow: column;
    .navigation-item {
      margin: 0;
      padding: 5px 0;

      &:nth-child(1) {
        a {
          font-weight: 700;
        }
      }
    }
  }
}
</style>
