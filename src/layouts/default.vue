<template>
  <div class="layout layout--default">
    <Header class="layout__header" :items="headerNavigation" />
    <Infobar v-if="false" />
    <nuxt class="layout__main" />
    <div class="layout__socials">
      <SocialIcon
        v-for="{ icon, link } in socials"
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
  ref
} from '@vue/composition-api'
import Infobar from '~/components/infobar/infobar.vue'
import Header from '~/components/header/header.vue'
import Footer from '~/components/footer/footer.vue'
import SocialIcon from '~/components/icon/icon.vue'

export default defineComponent({
  components: { Header, Footer, Infobar, SocialIcon },
  props: {},
  setup(_props, { root }) {
    const headerNavigation = ref([
      {
        to: 'about',
        name: 'About'
      },
      {
        to: 'eco',
        name: 'Ecosystem'
      },
      {
        to: 'wallets',
        name: 'Wallets'
      },
      {
        to: 'https://developers.hive.io',
        name: 'Developer'
      },
      {
        to: 'https://signup.hive.io',
        name: 'Join',
        isButton: true
      }
    ])

    const footerNavigation = ref([
      [
        {
          to: 'about',
          name: 'About'
        },
        {
          to: 'https://hive.blog/@hiveio',
          name: 'Blog'
        },
        {
          to: 'brand',
          name: 'Brand Assets'
        },
        {
          to: 'https://signup.hive.io',
          name: 'Join'
        },
        {
          to: 'mailto:info@hive.io',
          name: 'Contact '
        }
        /* {
          to: 'contributors',
          name: 'Contributors'
        } */
      ],
      [
        {
          to: 'eco',
          name: 'Ecosystem'
        },
        {
          to: 'https://hiveblocks.com',
          name: 'Blockexplorer'
        },
        {
          to: 'https://hivedapps.com',
          name: 'dApps Statistics'
        },
        {
          to: 'https://hiveprojects.io',
          name: 'Projects'
        },
        {
          to: 'https://hivekings.com/witnesses',
          name: 'Governance'
        }
      ],
      [
        {
          to: 'wallets',
          name: 'Wallets'
        }
      ],
      [
        {
          to: 'developer',
          name: 'Developer'
        },
        {
          to: 'https://developers.hive.io',
          name: 'Documentation'
        },
        {
          to: 'https://github.com/openhive-network/hive',
          name: 'GitHub'
        },
        {
          to: 'https://gitlab.syncad.com/hive',
          name: 'GitLab'
        }
      ]
    ])

    const socials = ref([
      {
        icon: 'hive',
        link: 'https://hive.blog/@hiveio'
      },
      {
        icon: 'github',
        link: 'https://github.com/openhive-network/hive'
      },
      {
        icon: 'gitlab',
        link: 'https://gitlab.syncad.com/hive'
      },
      {
        icon: 'twitter',
        link: 'https://twitter.com/hiveblocks'
      },
      {
        icon: 'medium',
        link: 'https://medium.com/@hiveblocks'
      },
      {
        icon: 'telegram',
        link: 'https://t.me/hiveblockchain'
      },
      { icon: 'reddit', link: 'https://reddit.com/r/hivenetwork' },
      { icon: 'discord', link: 'https://discord.gg/xHKUjeC' },
      {
        icon: 'facebook',
        link: 'https://www.facebook.com/hiveblocks/'
      },
      {
        icon: 'quora',
        link: 'https://www.quora.com/q/otycmrjbbhahuqae'
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
      footerNavigation,
      socials
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
