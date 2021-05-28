<template>
  <div
    class="contributor-label"
    :class="{'contributor-label--withCount': Boolean(count)}"
    :style="`background: ${CONTRIBUTOR_LABELS[label].background}; color:  ${CONTRIBUTOR_LABELS[label].text}`"
  >
    {{ label }}
    <span v-if="count">({{ count }})</span>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import {CONTRIBUTOR_LABELS} from '~/helpers/var'
export default defineComponent({
  props: {
    label: {
      type: String,
      default: '',
    },
    count: Number,
  },

  setup() {
    return {CONTRIBUTOR_LABELS}
  },
})
</script>

<style lang="scss">
.contributor-label {
  padding: 5px;
  border-radius: 6px;
  text-transform: uppercase;
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;

  &--withCount {
    font-size: 1rem;
    padding: 7px 15px;
  }
}

@media (max-width: 768px) {
  .contributor-label {
    width: calc(50% - 42px);
    &--withCount {
      font-size: 0.8rem;
    }
  }
}
</style>
