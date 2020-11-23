<template>
  <div class="about">
    <div class="about__inner">
      <div class="about__first">
        <img
          class="about__titleImage"
          src="~/assets/images/progressiveApp.svg"
        />
        <h1 class="about__title">
          {{ $t(`about.title`) }} 3<span style="color: #e31337">.</span>0
        </h1>
        <p class="about__text">{{ $t('about.text') }}</p>
        <h2 style="opacity: 0.5; margin-top: 120px">Why choose Hive?</h2>
      </div>

      <div class="about__feature">
        <h2 class="about__feature__text">{{ $t('about.featureFast') }}.</h2>
        <h3>{{ $t('about.featureFastText') }}</h3>
      </div>

      <div class="about__feature">
        <h2 class="about__feature__text">{{ $t('about.featureScalable') }}.</h2>
        <h3>{{ $t('about.featureScalableText') }}</h3>
      </div>

      <div class="about__feature">
        <h2 class="about__feature__text">{{ $t('about.featurePowerful') }}.</h2>
        <h3>
          {{ $t('about.featurePowerfulText') }}
        </h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@vue/composition-api'
import Logo from '~/components/logo/logo.vue'

export default defineComponent({
  components: {Logo},
  props: {},
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.about {
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
    align-items: center;
    justify-content: center;
    padding: 80px 0 40px 0;
    max-width: 820px;
    text-align: center;
    margin-top: -15px;
    min-height: calc(100vh - 200px); /* 100vh - header - padding */
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
    font-size: 1.2rem;
    font-weight: 400;
  }

  &__feature {
    width: 100%;
    max-width: 600px;
    min-width: 200px;
    margin: 10px;
    padding: 10px 0;
    &__text {
      width: fit-content;
      border-bottom: 10px solid #e31236;
      margin-bottom: 12px;
    }
  }
}
</style>
