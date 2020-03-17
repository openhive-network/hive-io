<template>
  <a :href="item.website" target="_blank" class="app">
    <div class="app__inner">
      <div class="app__image"></div>
    </div>
    <div class="app__name">{{ item.name }}</div>
  </a>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import {} from '../../types'
export default defineComponent({
  props: {
    item: {
      type: Object,
      default: true
    }
  },

  setup() {
    return {}
  }
})
</script>

<style lang="scss">
.app {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  margin: 25px 50px;

  &__inner {
    border-radius: 15%;
    background: #e2e2ec;
    height: 100px;
    width: 100px;
    padding: 10px;
    margin-bottom: 10px;
    transition: transform 0.5s;
    &:hover {
      transform: translateY(-10%);
    }
  }
}
</style>
