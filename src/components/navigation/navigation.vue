<template>
  <div class="navigation">
    <NavigationItem
      v-for="(item, index) in items"
      :key="index"
      class="navigation__item"
      :to="item.to"
      :name="item.name"
      @click.native="$emit('clicked')"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import NavigationItem from '~/components/navigation/navigationItem.vue'
export default defineComponent({
  components: { NavigationItem },
  props: {},

  setup() {
    const items = ref([
      {
        to: 'about/',
        name: 'About'
      }
      /* {
        to: 'eco',
        name: 'Ecosystem'
      },
      {
        to: 'wallets',
        name: 'Wallets'
      } */
      /* {
        to: 'developer',
        name: 'Developer'
      } */
    ])

    return { items }
  }
})
</script>

<style lang="scss">
.navigation {
  display: flex;
  &__item {
    margin: 0 5px;
    padding: 5px 10px;
  }
}
</style>
