<template>
  <div class="root">
    <div class="root__home root__container">
      <div class="root__home__left">
        <h1 v-if="false" class="root__headTitle">Fast. Scalable. Powerful.</h1>
        <h1 class="root__headTitle">Fast.</h1>
        <h1 class="root__headTitle">Scalable.</h1>
        <h1 class="root__headTitle">Powerful.</h1>
        <h3 class="root__subtitle">The Blockchain for Web 3.0</h3>

        <el-button
          class="root__learnMore"
          type="primary"
          @click="$router.push('/about')"
          >Learn more</el-button
        >
      </div>
      <Logo class="root__home__logo" :full="false" />
    </div>

    <div class="root__eco root__container">
      <div class="root__eco__inner root__container__inner">
        <div class="root__eco__left">
          <h2 class="root__eco__title">{{ $t('home.ecoTitle') }}</h2>
          <p class="root__eco__description">
            {{ $t('home.ecoText') }}
          </p>
          <el-button
            class="root__learnMore"
            type="primary"
            @click="$router.push('/eco')"
          >
            {{ $t('home.ecoButton') }}</el-button
          >
        </div>
        <img
          class="root__eco__image"
          src="~/assets/images/progressiveApp.svg"
        />
      </div>
    </div>

    <div class="root__exchanges-container">
      <div class="root__exchanges__title">
        Listed Exchanges
      </div>
      <div class="root__exchanges">
        <a
          v-for="exchange in EXCHANGES"
          :key="exchange.id"
          class="root__exchanges__exchange"
          :class="`root__exchanges__exchange-${exchange.id}`"
          :href="exchange.website"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <img :src="getImage(exchange.image)" />
        </a>
      </div>
    </div>

    <div v-if="false" class="root__tech root__container">
      <div class="root__tech__inner root__container__inner">
        <h2 class="root__tech__title">Fast. Scalable. Powerful.</h2>
      </div>
    </div>

    <div class="root__wallets root__container">
      <div class="root__wallets__inner root__container__inner">
        <div class="root__wallets__left">
          <h2 class="root__wallets__title">{{ $t('home.walletsTitle') }}</h2>
          <p class="root__wallets__description">
            {{ $t('home.walletsText') }}
          </p>
          <el-button
            class="root__learnMore"
            type="primary"
            @click="$router.push('/wallets')"
          >
            {{ $t('home.walletsButton') }}</el-button
          >
          <!--  -->
        </div>
        <div class="root__wallets__image-container">
          <img class="root__wallets__image" src="~/assets/images/vault.svg" />
          <div class="root__wallets__image-background"></div>
        </div>
      </div>
    </div>

    <div class="root__dao root__container">
      <div class="root__dao__inner root__container__inner">
        <div class="root__dao__left">
          <h2 class="root__dao__title">{{ $t('home.dafTitle') }}</h2>
          <p class="root__dao__description">
            {{ $t('home.dafText') }}
          </p>
          <el-button
            class="root__learnMore"
            type="primary"
            @click="go('https://peakd.com/proposals')"
          >
            {{ $t('home.dafButton') }}</el-button
          >
          <!-- Learn more -->
        </div>
        <img class="root__dao__image" src="~/assets/images/distribution.svg" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onBeforeMount } from '@vue/composition-api'
import { EXCHANGES } from '../helpers/var'
import Logo from '~/components/logo/logo.vue'
export default defineComponent({
  components: { Logo },
  props: {},
  setup() {
    const state = reactive({
      minHeight: 0
    })

    const calcHeight = () => {
      if (window) {
        const header = window.document.getElementById('header')
        const headerHeight = header ? Number(header.offsetHeight) : 0
        return (
          window.document.documentElement.offsetHeight - headerHeight - 20 - 40
        )
      }
      return 0
    }

    const go = (link) => {
      window.open(link, '_blank')
    }

    onBeforeMount(() => {
      state.minHeight = calcHeight()
    })

    const getImage = (image) => {
      try {
        return require(`~/assets/images/exchanges/${image}`)
      } catch (error) {
        return ''
      }
    }

    return { state, go, EXCHANGES, getImage }
  }
})
</script>

<style lang="scss" scoped>
.root {
  height: 100%;
  &__container {
    display: flex;
    flex: 1;
    min-height: 550px;
    justify-content: center;
    &__inner {
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      width: 100%;
      align-items: center;
      max-width: 840px;
      padding: 40px;
    }
  }

  &__home {
    align-items: center;
    padding: 20px 20px 40px 20px;
    min-height: calc(100vh - 90px - 60px); /* 100vh - header - padding  */

    &__logo {
      height: 150px;
      margin-left: -55px;
      margin-top: -180px;
    }

    &__left {
      height: fit-content;
      display: flex;
      flex-flow: column;
      justify-content: center;
      margin-top: -50px;
      min-width: 433px;
    }
  }

  &__exchanges {
    &-container {
      display: flex;
      flex-flow: column;
      width: calc(100% - 80px);
      margin: 0 auto;
      // margin-top: 25px;
      background: #320109;
      justify-content: center;
      align-items: center;
      padding: 40px 40px 50px 40px;
    }
    display: flex;
    flex-flow: row wrap;
    max-width: 900px;
    justify-content: space-evenly;
    align-items: center;

    &__title {
      color: white;
      font-weight: 500;
      margin-bottom: 20px;
      font-size: 16px;
      opacity: 1;
      padding-bottom: 2px;
      cursor: default;
      border-bottom: 1px solid rgb(224, 224, 224);
    }

    &__exchange {
      padding: 8px 15px;
      margin: 10px 15px;

      &-huobi {
        margin-top: 5px;
      }

      img {
        height: 25px;
        transition: opacity ease-in 0.1s;
        opacity: 0.88;
      }

      &-upbit img {
        height: 24px;
      }

      &:hover {
        img {
          opacity: 1;
        }
      }
    }
  }

  &__learnMore {
    min-width: 150px;
    width: fit-content;
    font-size: 16px;
    padding: 15px 26px;
    margin-top: 15px;
  }

  &__eco,
  &__dao {
    background: #e7e7f1;
    &__inner {
    }

    &__left {
      max-width: 450px;
      width: 100%;
      min-width: 250px;
      margin-right: 25px;
    }
  }

  &__dao {
    &__image {
      width: 250px;
    }
  }

  &__eco {
    &__image {
      width: 300px;
    }
  }

  &__tech {
    &__inner {
      display: flex;
    }

    &__title {
      flex: 1;
      text-align: center;
    }
  }

  &__eco {
    background: #ebebf5;
  }

  &__wallets {
    &__inner {
      flex-flow: row-reverse;
    }

    &__left {
      width: 350px;
      max-width: 350px;
      width: 100%;
      min-width: 250px;
    }

    &__image {
      width: 150px;
      z-index: 1;

      &-background {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: $secondary-color-100;
        opacity: 0.75;
        border-radius: 10000px;
      }
      &-container {
        margin-left: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 280px;
        height: 280px;
        position: relative;
      }
    }
  }

  h1 {
    font-size: 3.8rem;
  }

  &__subtitle {
    margin-top: 10px !important;
  }
}

@media (max-width: 1000px) {
}

@media (max-width: 700px) {
  .root {
    &__container {
      &__inner {
        flex-flow: column-reverse wrap;
        padding: 100px 40px;
      }
    }

    &__dao__left,
    &__wallets__image-container,
    &__eco__left,
    &__wallets__left {
      margin: 0;
      text-align: center;
    }

    &__eco__image,
    &__wallets__image-container,
    &__dao__image {
      margin-bottom: 50px;
    }
  }
}

@media (max-width: 600px) {
  .root {
    &__home {
      &__logo {
        display: none;
      }

      &__left {
        min-width: initial;
      }
    }

    &__eco__image,
    &__wallets__image-container,
    &__dao__image {
      width: 200px;
    }

    &__wallets__image {
      width: 100px;
    }

    &__wallets__image-container {
      height: 200px;
    }
  }
}
</style>
