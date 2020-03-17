<template>
  <div class=""></div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {
    full: {
      type: Boolean,
      default: true
    }
  },

  setup() {
    return {}
  }
})
</script>

<style lang="scss">
.logo {
  &__inner {
  }

  &__icon {
    fill: $primary-color-100;
    height: 20px;
  }

  &__text {
    fill: $secondary-color-100;
  }
}
</style>
