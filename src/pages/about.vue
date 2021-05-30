<template>
  <div class="about">
    <div class="about__inner">
      <div class="about__nav">
        <div
          v-for="nav in ABOUT_NAVIGATION"
          :key="nav.to"
          class="about__nav__item"
          :class="{'about__nav__item--active': nav.to === $route.name}"
          @click="
            nav.to !== $route.name ? $router.push({name: nav.to}) : () => {}
          "
        >
          {{ nav.text }}
        </div>
      </div>
      <div v-if="$route.name === 'about'" class="about__first">
        <img
          v-if="false"
          class="about__titleImage"
          src="~/assets/images/progressiveApp.svg"
        />
        <h2 class="about__title">
          {{ $t(`about.title`) }}<span style="color: #e31337">3</span>
        </h2>
        <p class="about__text">{{ $t('about.text') }}</p>
        <!-- <h2 style="opacity: 0.5; margin-top: 120px">Why choose Hive?</h2> -->
        <div>
          <div class="about__feature">
            <h3 class="about__feature__text">{{ $t('about.featureFast') }}.</h3>
            <h4>{{ $t('about.featureFastText') }}</h4>
          </div>

          <div class="about__feature">
            <h3 class="about__feature__text">
              {{ $t('about.featureScalable') }}.
            </h3>
            <h4>{{ $t('about.featureScalableText') }}</h4>
          </div>

          <div class="about__feature">
            <h3 class="about__feature__text">
              {{ $t('about.featurePowerful') }}.
            </h3>
            <h4>
              {{ $t('about.featurePowerfulText') }}
            </h4>
          </div>
        </div>
      </div>
      <Updates v-if="$route.name === 'about-updates'" />
      <Contributors v-if="$route.name === 'about-contributors'" />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import {ABOUT_NAVIGATION} from '~/helpers/navigation'

export default defineComponent({
  name: 'About',
  components: {},
  props: {},
  setup() {
    return {ABOUT_NAVIGATION}
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
    padding: 0 0 40px 0;
    max-width: 820px;
    text-align: center;
    min-height: 60vh;
  }

  &__nav {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
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
    font-size: 2.4rem;
  }

  h4 {
    font-size: 1.2rem;
    font-weight: 400;
    text-align: left !important;
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
