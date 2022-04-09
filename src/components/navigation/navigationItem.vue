<template>
  <div class="navigation-item">
    <el-button
      v-if="isButton && to && !to.includes('whyhive.co')"
      class="navigation-item__button"
      type="primary"
      @click="go(to)"
      >{{ name }}</el-button
    >
    <el-button
      v-if="isButton && to && to.includes('whyhive.co')"
      class="navigation-item__whyhive"
      type="primary"
      @click="go(to)"
      plain
      >{{ name }}</el-button
    >
    <a
      v-if="
        !isButton && to && (to.includes('https://') || to.includes('mailto'))
      "
      class="navigation-item__link"
      :class="{'navigation-item__link--dark': dark}"
      :href="to"
      target="_blank"
      rel="nofollow noopener noreferrer"
      >{{ name }}</a
    >
    <nuxt-link
      v-if="
        !isButton && to && !to.includes('https://') && !to.includes('mailto')
      "
      class="navigation-item__link"
      rel="nofollow noopener noreferrer"
      :class="{
        'navigation-item__link--dark': dark,
        'navigation-item__link--active': $route.name
          ? $route.name.startsWith(to)
          : null,
      }"
      :to="{name: to}"
    >
      {{ name }}
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    to: {
      type: String,
    },
    name: {
      type: String,
    },
    isButton: Boolean,
    dark: Boolean,
  },
  methods: {
    go(to) {
      window.open(to, '_blank')
    },
  },
})
</script>

<style lang="scss">
.navigation-item {
  padding: 5px 5px;
  &__link {
    transition: all ease-in 0.1s;

    &--dark {
      color: white;
    }
    &:hover,
    &.nuxt-link-active,
    &--active {
      color: $primary-color-100;
    }
  }

  &__button {
    min-width: 90px;
  }

  &__whyhive {
  }
}
</style>
