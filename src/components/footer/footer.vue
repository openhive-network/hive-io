<template>
  <div class="footer">
    <div class="footer__inner">
      <Logo class="footer__logo" :dark="true" />
      <div class="footer__navigationContainer">
        <FooterNavigation
          v-for="(subItems, index) in items"
          :key="index"
          :items="subItems"
          class="footer__navigation"
        />
      </div>
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
    justify-content: space-between;
  }

  &__navigationContainer {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 100%;
    margin-left: 15px;
  }

  &__navigation {
    margin-bottom: 20px;
  }

  &__logo {
    height: 30px;
    width: 132px;
  }
}

@media (max-width: 1250px) {
  .footer__inner {
    padding: 40px 60px;
  }
}

@media (max-width: 1000px) {
  .footer {
    &__inner {
      flex-flow: column;
    }

    &__navigationContainer {
      margin-top: 20px;
      margin-left: 0;
    }
  }
}
</style>
