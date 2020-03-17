<template>
  <nuxt-link class="navigation-item" :to="to">
    {{ name }}
  </nuxt-link>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import NavigationItem from '~/components/navigation/navigationItem.vue'
export default defineComponent({
  components: { NavigationItem },
  props: {
    to: {
      type: String
    },
    name: {
      type: String
    }
  }
})
</script>

<style lang="scss">
.navigation-item {
  transition: all ease-in 0.1s;
  &:hover,
  &.nuxt-link-active {
    color: $primary-color-100;
  }
}
</style>
