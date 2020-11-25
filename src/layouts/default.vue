<template>
  <div class="layout layout--default">
    <Header class="layout__header" :items="headerNavigation" />
    <Infobar v-if="showInfobar" />
    <nuxt class="layout__main" />
    <div class="layout__socials">
      <SocialIcon
        v-for="{icon, link} in socials"
        :key="icon"
        class="layout__socials__social"
        :icon="['fab', icon]"
        :link="link"
        :height="40"
        :width="40"
      />
    </div>
    <Footer
      class="layout__footer"
      :items="footerNavigation"
      :socials="socials"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  watch,
  onMounted,
  ref,
} from '@vue/composition-api'

import {
  NAVIGATION_HEADER,
  NAVIGATION_FOOTER,
  SOCIAL_MEDIAS,
  INFOBAR,
} from '../helpers/var'
import Infobar from '~/components/infobar/infobar.vue'
import Header from '~/components/header/header.vue'
import Footer from '~/components/footer/footer.vue'
import SocialIcon from '~/components/icon/icon.vue'

export default defineComponent({
  components: {Header, Footer, Infobar, SocialIcon},
  props: {},
  setup(_props, {root}) {
    const headerNavigation = ref(NAVIGATION_HEADER)
    const footerNavigation = ref(NAVIGATION_FOOTER)
    const socials = ref(SOCIAL_MEDIAS)
    const infobar = ref(INFOBAR)

    const preventScroll = computed(() => root.$accessor.preventScroll)
    const showInfobar = computed(
      () =>
        INFOBAR.show &&
        INFOBAR.routes.includes(String(root.$route.name)) &&
        root.$route.name,
    )

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
        },
      )
    })

    // watch()

    return {
      preventScroll,
      headerNavigation,
      footerNavigation,
      socials,
      infobar,
      showInfobar,
    }
  },
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

  &__socials {
    padding: 20px 20px;
    background: #212529f0;
    width: calc(100% - 40px);
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    &__social {
      margin: 20px;

      path {
        fill: white;
        transition: all ease-in 0.1s;
      }

      &:hover {
        path {
          fill: $color-0;
        }
      }
    }
  }
}
</style>
