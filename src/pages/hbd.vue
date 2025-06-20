<template>
  <div class="hbd">
    <div class="hbd__inner">
      <div class="hbd__first">
        <img
          v-if="false"
          class="hbd__titleImage"
          src="~/assets/images/progressiveApp.svg"
        />
        <h2 class="hbd__title">
          {{ $t(`hbd.title`) }}
        </h2>
        <p class="hbd__text">{{ $t('hbd.text') }}</p>
        <!-- <h2 style="opacity: 0.5; margin-top: 120px">Why choose Hive?</h2> -->
        <div>
          <div class="hbd__feature">
            <h3 class="hbd__feature__text">{{ $t('hbd.howTitle') }}</h3>
            <h4>{{ $t('hbd.howText') }}</h4>
          </div>

          <div class="hbd__feature">
            <h3 class="hbd__feature__text">
              {{ $t('hbd.hbdToHiveTitle') }}
            </h3>
            <h4>{{ $t('hbd.hbdToHiveText') }}</h4>
          </div>

          <div class="hbd__feature">
            <h3 class="hbd__feature__text">
              {{ $t('hbd.hiveToHbdTitle') }}
            </h3>
            <h4>
              {{ $t('hbd.hiveToHbdText') }}
            </h4>
            <h4>
              {{ $t('hbd.supportedWallets') }}:
              <a href="https://peakd.com" target="_blank" rel="nofollow noopener noreferrer">Peakd</a>,
              <a href="https://hive-keychain.com" target="_blank" rel="nofollow noopener noreferrer">Hive Keychain</a>
            </h4>
          </div>

          <div class="hbd__feature">
            <h3 class="hbd__feature__text">
              {{ $t('hbd.interestTitle') }}
            </h3>
            <h4>
              {{ $t('hbd.interestText') }}
            </h4>
          </div>

          <div class="hbd__feature">
            <h3 class="hbd__feature__text">
              {{ $t('hbd.risksTitle') }}
            </h3>
            <h4>
              {{ $t('hbd.risksText') }}
            </h4>
            <h4>
              {{ $t('hbd.risksText2') }}
            </h4>
            <h4 style="font-weight: bold;">
              <a href="https://peakd.com/hbd/@arcange/hive-debt-ratio-and-haircut-rule" target="_blank" rel="nofollow noopener noreferrer">Read more</a>
            </h4>
          </div>

          <div class="hbd__feature">
            <h3 class="hbd__feature__text">
              {{ $t('hbd.whereToBuyTitle') }}
            </h3>
            <h4>
              <a href="https://hivedex.io" target="_blank" rel="nofollow noopener noreferrer">Hivedex.io (internal market)</a><br />
              <a href="https://ecency.com/market" target="_blank" rel="nofollow noopener noreferrer">Ecency (internal market)</a><br />
              <a href="https://tribaldex.com/trade/SWAP.HBD" target="_blank" rel="nofollow noopener noreferrer">Tribaldex</a><br />
              <a href="https://sg.upbit.com" target="_blank" rel="nofollow noopener noreferrer">Upbit</a><br />
              <a href="https://ex.xbts.io/market/XBTSX.HBD_BTS" target="_blank" rel="nofollow noopener noreferrer">XBTS</a>
            </h4>
          </div>

          <div class="hbd__feature">
            <h3 class="hbd__feature__text">
              {{ $t('hbd.moreInfoTitle') }}
            </h3>
            <h4>
              {{ $t('hbd.moreInfoText') }}
              <a href="https://www.hbdstats.com" target="_blank" rel="nofollow noopener noreferrer">HBD Stats</a>,
              <a href="https://hive.ausbit.dev/hbd" target="_blank" rel="nofollow noopener noreferrer">Block Explorer</a>
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Hbd',
  components: {},
  props: {},
  setup() {},
})
</script>

<style lang="scss" scoped>
.hbd {
  display: flex;
  align-items: center;
  margin-bottom: 150px;
  &__inner {
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 0 30px;
  }

  &__first {
    display: flex;
    flex-flow: column;
    align-items: left;
    justify-content: center;
    padding: 0 0 40px 0;
    max-width: 820px;
    text-align: center;
    min-height: 60vh;
  }

  &__nav {
    display: flex;
    flex-flow: row wrap;
    justify-content: left;
    margin-top: 20px;
    margin-bottom: 40px;

    &__item {
      flex: 1;
      margin: 5px 7px;
      padding: 10px 20px;
      min-width: 110px;
      text-align: center;
      color: white;
      background: rgba(33, 37, 41, 0.6);
      border-radius: 5px;
      cursor: pointer;

      &--active {
        background: $primary-color-100;
      }
    }
  }

  &__titleImage {
    height: 150px;
    margin-bottom: 35px;
  }

  &__text {
    max-width: 800px;
  }

  h2 {
    font-size: 3.2rem;
  }

  h3 {
    font-size: 1.9rem;
  }

  h4 {
    font-size: 1.1rem;
    font-weight: 400;
    text-align: left !important;
  }

  &__feature {
    width: 100%;
    max-width: 820px;
    min-width: 200px;
    margin: 10px;
    padding: 10px 0;
    &__text {
      width: fit-content;
      border-bottom: 10px solid #e31236;
      margin-bottom: 12px;
    }
  }
  a:hover {
    color: $primary-color-100;
  }
}
</style>