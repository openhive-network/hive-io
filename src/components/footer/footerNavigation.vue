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
import { defineComponent } from '@vue/composition-api'
import Logo from '~/components/logo/logo.vue'
import Navigation from '~/components/navigation/navigation.vue'
export default defineComponent({
  components: { Logo, Navigation },
  props: {
    items: {
      type: Array,
      default: () => [] as any[]
    }
  },

  setup() {
    return {}
  }
})
</script>

<style lang="scss">
.footer-navigation {
  &__title {
  }

  &__navigation {
  }
}
</style>
