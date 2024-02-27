<template>
  <div class="root-eco root__eco root__container">
    <ModalEco />
    <div class="root__eco__inner root__container__inner">
      <div class="root__eco__left">
        <h2 class="root__eco__title">{{ $t('root.ecoTitle') }}</h2>
        <p class="root__eco__description">
          {{ $t('root.ecoText') }}
        </p>
        <el-button
          class="root__learnMore"
          type="primary"
          @click="$router.push('/eco')"
        >
          {{ $t('root.ecoButton') }}</el-button
        >
      </div>
      <div class="root-eco__right">
        <App
          v-for="app in favs"
          :key="app.id"
          class="root-eco__app"
          :item="app"
          :move="true"
          :show-name="false"
          :open-modal="true"
          app-type="eco"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, useAsync} from '@nuxtjs/composition-api'
import {shuffleArray} from '../../helpers/util'
import {ECOSYSTEM} from '~/helpers/var'
import {IEcoItem} from '~/types'
export default defineComponent({
  props: {
    full: {
      type: Boolean,
      default: true,
    },
  },

  setup(_props) {
    const favs = useAsync(() => {
      const maxFeatured = 8
      const fixed = ECOSYSTEM.filter((e) => e.featured).slice(0, 1)
      const random = fixed.concat(
        shuffleArray(
          ECOSYSTEM.filter((e) => e.featured).slice(1, ECOSYSTEM.length - 2),
        ).slice(0, maxFeatured - 1),
      )
      return random
    }) as any

    return {
      favs: favs as IEcoItem[],
    }
  },
})
</script>

<style lang="scss">
.root-eco {
  // background: #ebebf5;
  &__inner {
  }

  &__left {
    max-width: 450px;
    width: 100%;
    min-width: 250px;
    margin-right: 25px;
  }

  &__right {
    position: relative;
    height: 250px;
    width: 250px;
    margin-top: 86px;
  }

  &__app {
    position: absolute;
    .app__name {
      font-size: 0.9rem;
    }

    &:nth-of-type(1) {
      top: 0;
      left: 0;
      z-index: 1;
    }
    &:nth-of-type(2) {
      top: -115px;
      left: 35px;
      .app__inner {
        height: 80px;
        width: 80px;
      }
    }
    &:nth-of-type(3) {
      top: -40px;
      left: 150px;
      .app__inner {
        height: 85px;
        width: 85px;
      }
    }
    &:nth-of-type(4) {
      top: 96px;
      left: 151px;

      .app__inner {
        height: 65px;
        width: 65px;
      }
    }
    &:nth-of-type(5) {
      top: -108px;
      left: -86px;
      .app__inner {
        height: 77px;
        width: 77px;
      }
    }
    &:nth-of-type(6) {
      top: 10px;
      left: -102px;
      .app__inner {
        height: 60px;
        width: 60px;
      }
    }
    &:nth-of-type(7) {
      top: 147px;
      left: 13px;
      .app__inner {
        height: 80px;
        width: 80px;
      }
    }
    &:nth-of-type(8) {
      top: 117px;
      left: -93px;
      .app__inner {
        height: 55px;
        width: 55px;
      }
    }
  }
}

@media (max-width: 600px) {
  .root-eco {
    &__right {
      margin-top: 60px;
      margin-bottom: 50px;
      margin-left: 70px;
    }
  }
}
</style>
