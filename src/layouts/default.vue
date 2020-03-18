<template>
  <div class="layout layout--default">
    <Header class="layout__header" :items="headerNavigation" />
    <nuxt class="layout__main" />
    <Footer class="layout__footer" :items="footerNavigation" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  watch,
  onMounted,
  ref
} from '@vue/composition-api'
import Header from '~/components/header/header.vue'
import Footer from '~/components/footer/footer.vue'

export default defineComponent({
  components: { Header, Footer },
  props: {},
  setup(_props, { root }) {
    const headerNavigation = ref([
      {
        to: 'about',
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

    const footerNavigation = ref([
      {
        to: 'brand',
        name: 'Brand'
      }
    ])

    const preventScroll = computed(() => root.$accessor.preventScroll)
    onMounted(() => {
      watch(
        () => preventScroll,
        (vref) => {
          if (document) {
            if (vref.value) {
              document.body.style.overflow = 'hidden'
            } else {
              document.body.style.overflow = 'auto'
            }
          }
        }
      )
    })

    // watch()

    return {
      preventScroll,
      headerNavigation,
      footerNavigation
    }
  }
})
</script>

<style lang="scss">
.layout {
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  // justify-content: center;

  align-items: center;

  &__main {
    width: 100%;

    display: flex;
    flex-flow: column;
    flex: 1;
    justify-content: flex-start;
  }
}
</style>
