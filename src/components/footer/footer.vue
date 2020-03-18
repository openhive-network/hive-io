<template>
  <div class="footer">
    <div class="footer__inner">
      <Logo class="footer__logo" :dark="true" />
      <Navigation class="footer__navigation" :items="items" :dark="true" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Logo from '~/components/logo/logo.vue'
import Navigation from '~/components/navigation/navigation.vue'
export default defineComponent({
  components: { Logo, Navigation },
  props: {
    items: {
      type: Array,
      default: () => [] as any[]
    }
  },

  setup() {
    return {}
  }
})
</script>

<style lang="scss">
.footer {
  width: 100%;
  background: $secondary-color-100;
  &__inner {
    padding: 40px 80px;
    display: flex;
    flex-flow: row;
  }

  &__logo {
    height: 30px;
    margin-right: 100px;
  }
}
</style>
