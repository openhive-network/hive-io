<template>
  <div class="root">
    <div class="root__home root__container">
      <div class="root__home__left">
        <h1 v-if="false" class="root__headTitle">Fast. Scalable. Powerful.</h1>
        <h1 class="root__headTitle">Fast.</h1>
        <h1 class="root__headTitle">Scalable.</h1>
        <h1 class="root__headTitle">Powerful.</h1>
        <h3 class="root__subtitle">The Blockchain for Web3</h3>
        <div class="root__buttons">
          <el-button
            class="root__learnMore"
            type="primary"
            @click="$router.push('/about')"
            >{{ $t('root.learnMore') }}</el-button
          >
        </div>
      </div>
      <!-- <Video class="video" /> -->
      <Logo class="root__home__logo" :full="false" />
    </div>

    <scrollindicator style="margin: 0 auto 0px auto; margin-bottom: 40px" />

    <!-- Ecosystem -->
    <RootEco class="secondarybg"/>

    <!-- Fast transactions -->
    <!--div class="root__general root__container secondarybg">
      <div class="root__general__inner root__container__inner non-reverse">
        <div class="root__general__image-container">
          <img class="root__general__image" src="~/assets/images/fast.png" /-->
          <!-- <div class="root__general__image-background"></div> -->
        <!--/div>
        <div class="root__general__left">
          <h2 class="root__general__title">{{ $t('root.fastTitle') }}</h2>
          <p class="root__general__description">
            {{ $t('root.fastText') }}
          </p>
          <el-button
            class="root__learnMore"
            type="primary"
            @click="go('https://hive.blog/hive-139531/@blocktrades/one-block-irreversibility-for-delegated-proof-of-stake-dpos')"
          >
            {{ $t('root.fastButton') }}</el-button
          -->
          <!--  -->
        <!--/div>
      </div>
    </div -->

    <!-- No fees -->
    <div class="root__general root__container">
      <div class="root__general__inner root__container__inner">
        <div class="root__general__left">
          <h2 class="root__general__title">{{ $t('root.feeTitle') }}</h2>
          <p class="root__general__description">
            {{ $t('root.feeText') }}
          </p>
          <p class="root__general__description">
            {{ $t('root.feeText2') }}
          </p>
          <!-- <el-button
            class="root__learnMore"
            type="primary"
            @click="go('https://hive.blog/hive-139531/@blocktrades/one-block-irreversibility-for-delegated-proof-of-stake-dpos')"
          >
            {{ $t('root.fastButton') }}</el-button
          > -->
          <!--  -->
        </div>
        <div class="root__general__image-container">
          <img class="root__general__image" src="~/assets/images/fees.png" />
          <!-- <div class="root__general__image-background"></div> -->
        </div>
      </div>
    </div>

    <!-- Decentralized -->
    <div class="root__general root__container secondarybg">
      <div class="root__general__inner root__container__inner non-reverse">
        <div class="root__general__image-container">
          <img style="width: 280px" src="~/assets/images/decentralized.png" />
          <!-- <div class="root__general__image-background"></div> -->
        </div>
        <div class="root__general__left">
          <h2 class="root__general__title">{{ $t('root.decTitle') }}</h2>
          <p class="root__general__description">
            {{ $t('root.decText') }}
          </p>
          <p class="root__general__description">
            {{ $t('root.decText2') }}
          </p>
          <!-- <el-button
            class="root__learnMore"
            type="primary"
            @click="go('https://hive.blog/hive-139531/@blocktrades/one-block-irreversibility-for-delegated-proof-of-stake-dpos')"
          >
            {{ $t('root.fastButton') }}</el-button
          > -->
          <!--  -->
        </div>
      </div>
    </div>

    <!-- Username -->
    <div class="root__general root__container">
      <div class="root__general__inner root__container__inner">
        <div class="root__general__left">
          <h2 class="root__general__title">{{ $t('root.usernameTitle') }}</h2>
          <p class="root__general__description">
            {{ $t('root.usernameText') }}
          </p>
          <!-- <el-button
            class="root__learnMore"
            type="primary"
            @click="go('https://hive.blog/hive-139531/@blocktrades/one-block-irreversibility-for-delegated-proof-of-stake-dpos')"
          >
            {{ $t('root.fastButton') }}</el-button
          > -->
          <!--  -->
        </div>
        <div class="root__general__image-container">
          <img style="width: 220px;" src="~/assets/images/username.png" />
          <!-- <div class="root__general__image-background"></div> -->
        </div>
      </div>
    </div>

    <!-- HDF -->
    <div class="root__dao root__container secondarybg">
      <div class="root__dao__inner root__container__inner">
        <div class="root__dao__left">
          <h2 class="root__dao__title">{{ $t('root.dafTitle') }}</h2>
          <p class="root__dao__description">
            {{ $t('root.dafText') }}
          </p>
          <el-button
            class="root__learnMore"
            type="primary"
            @click="go('https://peakd.com/proposals')"
          >
            {{ $t('root.dafButton') }}</el-button
          >
          <!-- Learn more -->
        </div>
        <img class="root__dao__image" src="~/assets/images/distribution.svg" />
      </div>
    </div>

    <!-- HBD -->
    <div class="root__hbd root__container">
      <div class="root__hbd__inner root__container__inner">
        <div class="root__hbd__left">
          <h2 class="root__hbd__title">{{ $t('root.hbdTitle') }}</h2>
          <p class="root__hbd__description">
            {{ $t('root.hbdText') }} <br /><br />
            {{ $t('root.hbdAPR') }}
          </p>
          <el-button
            class="root__learnMore"
            type="primary"
            @click="$router.push('/hbd')"
          >
            {{ $t('root.hbdButton') }}</el-button
          >
          <!--  -->
        </div>
        <div class="root__hbd__image-container">
          <img class="root__hbd__image" src="~/assets/images/hbd.svg" />
          <!-- <div class="root__hbd__image-background"></div> -->
        </div>
      </div>
    </div>

    <!-- Wallets -->
    <!-- div class="root__wallets root__container">
      <div class="root__wallets__inner root__container__inner">
        <div class="root__wallets__left">
          <h2 class="root__wallets__title">{{ $t('root.walletsTitle') }}</h2>
          <p class="root__wallets__description">
            {{ $t('root.walletsText') }}
          </p>
          <el-button
            class="root__learnMore"
            type="primary"
            @click="$router.push('/wallets')"
          >
            {{ $t('root.walletsButton') }}</el-button
          -->
          <!--  -->
        <!-- /div>
        <div class="root__wallets__image-container">
          <img class="root__wallets__image" src="~/assets/images/vault.svg" />
          <div class="root__wallets__image-background"></div>
        </div>
      </div>
    </div -->

    <div class="root__exchanges-container">
      <div class="root__exchanges__title">
        {{ $t('root.exchanges.title') }}
      </div>
      <div class="root__exchanges__subtitle">
        {{ $t('root.exchanges.subtitle') }}
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
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, onBeforeMount} from '@nuxtjs/composition-api'
import {EXCHANGES} from '../helpers/var'
import scrollindicator from '~/components/scrollindicator.vue'
export default defineComponent({
  name: 'Index',
  components: {scrollindicator},
  props: {},
  setup() {
    const state = reactive({
      minHeight: 0,
    })

    const calcHeight = () => {
      if (window) {
        const header = window.document.getElementById('header')
        const headerHeight = header ? Number(header.offsetHeight) : 0
        return (
          window.document.documentElement.offsetHeight -
          headerHeight -
          20 -
          40 -
          80
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

    return {state, go, EXCHANGES, getImage}
  },
})
</script>

<style lang="scss">
.secondarybg {
  background: #e7e7f1;
}

.reverse {
  flex-flow: row-reverse;
}

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
    padding: 60px 20px 0px 20px;
    min-height: calc(
      100vh - 90px - 60px - 80px
    ); /* 100vh - header - padding  */

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
      //background: #320109;
      background: #212529;
      justify-content: center;
      align-items: center;
      padding: 40px 40px 50px 40px;
    }
    display: flex;
    flex-flow: row wrap;
    max-width: 1100px;
    justify-content: space-evenly;
    align-items: center;

    &__title {
      color: white;
      font-weight: 700;
      margin-bottom: 10px;
      font-size: 16px;
      opacity: 1;
      padding-bottom: 2px;
      cursor: default;
      //border-bottom: 1px solid rgb(224, 224, 224);
    }

    &__subtitle {
      color: rgb(187, 187, 187);
      margin-bottom: 20px;
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

      &-swapzone img {
        height: 35px;
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
    float: left;
  }
  &__whyHive {
    min-width: 150px;
    width: fit-content;
    font-size: 16px;
    padding: 15px 26px;
    margin-top: 15px;
  }

  &__eco,
  &__dao {
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

  &__tech {
    &__inner {
      display: flex;
    }

    &__title {
      flex: 1;
      text-align: center;
    }
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

  &__general {
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
        background: #ffffff;
        opacity: 0.75;
        border-radius: 10000px;
        border: 1px solid #e2e2ec;
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

  &__hbd {
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
      width: 230px;
      z-index: 1;

      &-background {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #ffffff;
        opacity: 0.75;
        border-radius: 10000px;
        border: 1px solid #e2e2ec;
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

.video {
  width: 100% !important;
  margin-top: -30px;
  border: 1px solid #000;
  border-radius: 10px;
  max-width: 640px !important;
}
@media (max-width: 1000px) {
  .root__home {
    flex-flow: wrap !important;
  }
  .video {
    margin-top: 40px;
    margin-bottom: 10px;
  }
}

@media (max-width: 700px) {
  .non-reverse {
    flex-flow: column !important;
  }
  .root {
    &__exchanges {
      &__exchange {
        img {
          height: 14px;
        }
      }
    }

    &__container {
      &__inner {
        flex-flow: column-reverse wrap;
        padding: 100px 40px;
      }
    }

    &__dao__left,
    &__wallets__image-container,
    &__hbd__image-container,
    &__eco__left,
    &__wallets__left,
    &__hbd__left,
    &__general__left {
      margin: 0;
      text-align: center;
    }

    &__eco__image,
    &__wallets__image-container,
    &__hbd__image-container,
    &__dao__image,
    &__general__image-container {
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
    &__hbd__image-container,
    &__dao__image {
      width: 200px;
    }

    &__wallets__image,
    &__hbd__image, {
      width: 100px;
    }

    &__wallets__image-container,
    &__hbd__image-container {
      height: 200px;
    }
  }
}
</style>
