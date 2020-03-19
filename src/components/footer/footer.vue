<template>
  <div class="footer">
    <div class="footer__inner">
      <Logo class="footer__logo" :dark="true" />
      <FooterNavigation
        v-for="(subItems, index) in items"
        :key="index"
        :items="subItems"
        class="footer__navigation"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Logo from '~/components/logo/logo.vue'
import FooterNavigation from '~/components/footer/footerNavigation.vue'
export default defineComponent({
  components: { Logo, FooterNavigation },
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
