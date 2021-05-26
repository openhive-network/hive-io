<template>
  <div
    class="app-type"
    :class="{'app-type--withCount': Boolean(count)}"
    :style="`background: ${TYPE_COLORS[appType].background}; color:  ${TYPE_COLORS[appType].text}`"
  >
    {{ appType }}
    <span v-if="count">({{ count }})</span>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import {TYPE_COLORS} from '~/helpers/ecosystem'
export default defineComponent({
  props: {
    appType: {
      type: String,
      default: 'app',
    },
    count: Number,
  },

  setup() {
    return {TYPE_COLORS}
  },
})
</script>

<style lang="scss">
.app-type {
  padding: 5px;
  border-radius: 6px;
  text-transform: uppercase;
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;

  &--withCount {
    font-size: 1.1rem;
    padding: 7px 15px;
  }
}

@media (max-width: 600px) {
  .app-type {
    &--withCount {
      font-size: 0.8rem;
    }
  }
}
</style>
