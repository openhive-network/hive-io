<template>
  <div class="mobile-menu">
    <div
      class="mobile-menu__toggle"
      :class="{ 'mobile-menu__toggle--active': isMobileActive }"
    >
      <input type="checkbox" @click="onClick" />

      <span class="boink"></span>
      <span class="boink"></span>
      <span class="boink"></span>

      <Navigation
        class="mobile-menu__navigation"
        :items="items"
        @clicked="$accessor.setIsMobileActive(false)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import Navigation from '~/components/navigation/navigation.vue'
export default defineComponent({
  components: { Navigation },
  props: {
    items: {
      type: Array,
      default: () => [] as any[]
    },
    dark: Boolean
  },

  setup(_props, { root }) {
    const isMobileActive = computed(() => root.$accessor.isMobileActive)
    const onClick = () => {
      root.$accessor.setIsMobileActive(!isMobileActive.value)
    }
    return { onClick, isMobileActive }
  }
})
</script>

TODO: Add browser prefixes
<style lang="scss">
.mobile-menu {
  &__toggle {
    display: block;
    position: relative;

    z-index: 1;

    -webkit-user-select: none;
    user-select: none;

    input {
      display: block;
      width: 40px;
      height: 32px;
      position: absolute;
      top: -7px;
      left: -5px;

      cursor: pointer;

      opacity: 0;
      z-index: 2;

      -webkit-touch-callout: none;
    }

    &--active {
      .boink {
        opacity: 1;
        transform: rotate(45deg) translate(-2px, -1px);
        background: $secondary-color-100;

        &:nth-last-child(3) {
          opacity: 0;
          transform: rotate(0deg) scale(0.2, 0.2);
        }

        &:nth-last-child(2) {
          transform: rotate(-45deg) translate(0, -1px);
        }
      }

      .mobile-menu__navigation {
        display: flex;
      }
    }

    .boink {
      display: block;
      width: 33px;
      height: 4px;
      margin-bottom: 5px;
      position: relative;

      background: $secondary-color-100;
      border-radius: 3px;

      z-index: 1;

      transform-origin: 4px 0px;

      transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
        background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;

      &:first-child {
        transform-origin: 0% 0%;
      }

      &:nth-last-child(2) {
        transform-origin: 0% 100%;
      }
    }
  }

  &__navigation {
    display: none;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;

    flex-flow: column;
    justify-content: center;
    & .navigation__item {
      text-align: center;
      padding: 10px 0;
      width: 100%;
    }

    margin-top: -200px;

    background: $color-0;
  }
}
</style>
