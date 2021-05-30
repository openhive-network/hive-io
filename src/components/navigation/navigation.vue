<template>
  <div class="navigation">
    <NavigationItem
      v-for="(item, index) in items"
      :key="index"
      class="navigation__item"
      :to="item.to"
      :name="item.name"
      :is-button="item.isButton"
      :dark="dark"
      @click.native="$emit('clicked')"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    items: {
      type: Array,
      default: () => [] as any[],
    },
    dark: Boolean,
  },

  setup() {
    return {}
  },
})
</script>

<style lang="scss">
.navigation {
  display: flex;
  align-items: center;
  &__item {
    margin: 0 4px;
    padding: 5px 10px;
    &--dark {
      .navigation-item__link {
        color: white;
        font-weight: 500;
      }
    }
  }
}
</style>
