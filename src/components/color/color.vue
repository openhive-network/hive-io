<template>
  <div class="color">
    <div class="color__circle" :style="`background-color:${color.hex};`" />
    <div class="color__right">
      <div class="color__name">{{ color.name }}</div>
      <div class="color__hex">
        <div class="color__label">HEX:</div>
        {{ color.hex }}
      </div>
      <div class="color__rgb">
        <div class="color__label">RGB:</div>
        {{ color.rgb }}
      </div>
      <div class="color__cmyk">
        <div class="color__label">CMYK:</div>
        {{ color.cmyk }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {
    color: {
      type: Object,
      default: () => {
        return { name: '', hex: '', rgb: '', cmyk: '' } as {
          name: string
          hex: string
          rgb: string
          cmyk: string
        }
      }
    }
  },

  setup() {
    return {}
  }
})
</script>

<style lang="scss">
.color {
  display: flex;
  flex-flow: row;
  margin: 25px;
  &__circle {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin-right: 15px;
    border: 1px solid #ebebf5;
  }

  &__right {
    display: flex;
    flex-flow: column;
  }

  &__name {
    font-size: 1.5rem;
    font-weight: 700;
  }

  &__hex,
  &__rgb,
  &__cmyk {
    display: flex;
    font-size: 0.9rem;
    opacity: 0.8;
  }

  &__label {
    font-size: 0.75rem;
    opacity: 0.5;
    min-width: 45px;
  }
}
</style>
