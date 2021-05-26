<template>
  <a
    v-tippy="{
      placement: 'bottom',
      arrow: true,
      content: tooltip,
      trigger: tooltip ? 'mouseenter focus' : 'manual',
    }"
    :href="link"
    target="_blank"
    rel="nofollow noopener noreferrer"
    class="icon"
    :style="{height: `${height}px`}"
  >
    <fa-icon
      class="icon__icon"
      full-width
      :icon="icon"
      :style="{height: `${height}px`}"
    />
  </a>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    icon: {
      type: Array,
      default: () => [] as any[],
    },
    link: String,
    height: {
      type: Number,
      default: 30,
    },
    width: {
      type: Number,
      default: 30,
    },
    tooltip: String,
  },

  setup() {
    return {}
  },
})
</script>

<style lang="scss">
.icon {
  &__icon {
  }
}
</style>
