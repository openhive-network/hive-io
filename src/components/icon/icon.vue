<template>
  <a
    v-tippy="{
      placement: 'bottom',
      arrow: true,
      content: tooltip,
      trigger: tooltip ? 'mouseenter focus' : 'manual'
    }"
    :href="link"
    target="_blank"
    class="icon"
    :style="{ height: `${height}px`, width: `${width}px` }"
  >
    <fa-icon
      class="icon__icon"
      :icon="icon"
      :style="{ height: `${height}px`, width: `${width}px` }"
    />
  </a>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {
    icon: {
      type: Array,
      default: () => [] as any[]
    },
    link: String,
    height: {
      type: Number,
      default: 30
    },
    width: {
      type: Number,
      default: 30
    },
    tooltip: String
  },

  setup() {
    return {}
  }
})
</script>

<style lang="scss">
.icon {
  &__icon {
  }
}
</style>
