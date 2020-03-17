<template>
  <div class="root">
    <div
      class="root__home root__container"
      :style="`min-height:${state.minHeight}px;`"
    >
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
          >Learn More</el-button
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
            :disabled="true"
            @click="$router.push('/eco')"
            >More Details Soon</el-button
          >
          <!-- Dive In -->
        </div>
        <img
          class="root__eco__image"
          src="~/assets/images/progressiveApp.svg"
        />
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
            :disabled="true"
            @click="$router.push('/wallets')"
            >More Details Soon</el-button
          >
          <!-- Choose Wallet -->
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
            :disabled="true"
            @click="$router.push('/daf')"
            >More Details Soon</el-button
          >
          <!-- Learn more -->
        </div>
        <img class="root__dao__image" src="~/assets/images/distribution.svg" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from '@vue/composition-api'
import Logo from '~/components/logo/logo.vue'
export default defineComponent({
  components: { Logo },
  props: {},
  setup() {
    const state = reactive({
      minHeight: 725
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

    onMounted(() => {
      state.minHeight = calcHeight()
    })

    return { state }
  }
})
</script>

<style lang="scss" scoped>
.root {
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

    &__logo {
      height: 150px;
      margin-left: -55px;
      margin-top: -130px;
    }

    &__left {
      height: fit-content;
      display: flex;
      flex-flow: column;
      justify-content: center;
    }
  }

  &__learnMore {
    width: fit-content;
    font-size: 16px;
    padding: 13px 23px;
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
      height: 200px;
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
        width: 290px;
        height: 290px;
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
    }
  }
}
</style>
