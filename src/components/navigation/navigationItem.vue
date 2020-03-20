<template>
  <div class="navigation-item">
    <el-button
      v-if="isButton"
      class="navigation-item__button"
      type="primary"
      @click="go(to)"
      >{{ name }}</el-button
    >
    <a
      v-if="!isButton && to && to.includes('https://')"
      class="navigation-item__link"
      :class="{ 'navigation-item__link--dark': dark }"
      :href="to"
      target="_blank"
      >{{ name }}</a
    >
    <nuxt-link
      v-if="!isButton && to && !to.includes('https://')"
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
    isButton: Boolean,
    dark: Boolean
  },
  methods: {
    go(to) {
      window.open(to, '_blank')
    }
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

  &__button {
    min-width: 100px;
  }
}
</style>
