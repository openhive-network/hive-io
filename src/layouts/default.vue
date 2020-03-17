<template>
  <div class="layout layout--default">
    <Header class="layout__header" />
    <nuxt class="layout__main" />
    <Footer class="layout__footer" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  watch,
  onMounted
} from '@vue/composition-api'
import Header from '~/components/header/header.vue'
import Footer from '~/components/footer/footer.vue'

export default defineComponent({
  components: { Header, Footer },
  props: {},
  setup(_props, { root }) {
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
      preventScroll
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
