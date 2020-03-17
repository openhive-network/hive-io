<template>
  <div class="footer">
    <div class="footer__inner">
      <Logo class="footer__logo" :dark="true" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Logo from '~/components/logo/logo.vue'
export default defineComponent({
  components: { Logo },

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
  }

  &__logo {
    height: 30px;
  }
}
</style>
