<template>
  <div class="navigation-item">
    <a
      v-if="to && to.includes('https://')"
      class="navigation-item__link"
      :class="{ 'navigation-item__link--dark': dark }"
      :href="to"
      target="_blank"
      >{{ name }}</a
    >
    <nuxt-link
      v-else
      class="navigation-item__link"
      :class="{ 'navigation-item__link--dark': dark }"
      :to="{ name: to }"
    >
      {{ name }}
    </nuxt-link>
  </div>
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
    },
    dark: Boolean
  }
})
</script>

<style lang="scss">
.navigation-item {
  &__link {
    transition: all ease-in 0.1s;

    &--dark {
      color: white;
    }
    &:hover,
    &.nuxt-link-active {
      color: $primary-color-100;
    }
  }
}
</style>
