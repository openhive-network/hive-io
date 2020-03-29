<template>
  <div class="brand">
    <div class="brand__inner">
      <div class="brand__first">
        <img class="brand__titleImage" src="~/assets/images/branding.svg" />
        <h1 class="brand__title">
          {{ $t(`brand.title`) }}
        </h1>
        <p class="brand__text">{{ $t('brand.text') }}</p>
        <a href="/hive-branding.zip"
          ><el-button class="brand__download" type="primary"
            >Download Assets</el-button
          >
        </a>
      </div>
      <h2 style="opacity: 0.5; margin-bottom: 20px;">Colors</h2>
      <div class="brand__colors">
        <Color v-for="(color, index) in colors" :key="index" :color="color" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import Logo from '~/components/logo/logo.vue'
import Color from '~/components/color/color.vue'

export default defineComponent({
  components: { Logo, Color },
  props: {},
  setup() {
    const colors = ref([
      {
        name: 'Hive Red',
        hex: '#E31337',
        rgb: '227 / 19/ 55',
        cmyk: '0 / 91.63 / 75.77 / 10.98'
      },
      {
        name: 'Hive Black',
        hex: '#212529',
        rgb: '33 / 37 / 41',
        cmyk: '19.51 / 9.76 / 0 / 83.92'
      },
      /* {
        name: 'Hive White',
        hex: '#ffffff',
        rgb: '255 / 255 / 255',
        cmyk: '0 / 0 / 0 / 0'
      }, */
      {
        name: 'Hive LightGrey',
        hex: '#f0f0f8',
        rgb: '240 / 240 / 248',
        cmyk: '3.23 / 3.23 / 0 / 2.75'
      },
      {
        name: 'Hive Grey',
        hex: '#e7e7f1',
        rgb: '231 / 231 / 241',
        cmyk: '4.15 / 4.15 / 0 / 5.49'
      }
    ])

    return { colors }
  }
})
</script>

<style lang="scss" scoped>
.brand {
  display: flex;
  align-items: center;
  margin-bottom: 150px;
  &__inner {
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 100%;
  }

  &__first {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    padding: 65px 20px 40px 20px;
    max-width: 820px;
    text-align: center;
    margin-top: -35px;
    min-height: calc(100vh - 90px - 60px);
  }

  &__titleImage {
    height: 150px;
    margin-bottom: 35px;
  }

  &__text {
    max-width: 700px;
    white-space: pre-line;
  }

  &__download {
    margin-top: 25px;
  }

  &__colors {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    background: #f9f9ff;
    padding: 15px 25px;
    border-radius: 5px;
    margin: 0 25px;
    max-width: 750px;
  }

  h2 {
    font-size: 3.2rem;
  }

  h3 {
    font-size: 1.5rem;
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
    }
  }
}
</style>
