<template>
  <div class="eco-detailed">
    <App
      class="eco-detailed__active"
      :item="$accessor.activeEco"
      :detailed="true"
    />
    <div>
      <h3 class="eco-detailed__otherTitle">Similar Apps</h3>
      <div class="eco-detailed__otherContainer">
        <App
          v-for="eco in $accessor.similarEco"
          :key="eco.id"
          :item="eco"
          :detailed="false"
          :move="true"
          :show-name="false"
          :open-modal="true"
          app-type="eco"
          :style="`opacity: ${
            eco.id === $accessor.activeEco.id ? '0.333' : '1'
          }`"
        />
      </div>
    </div>
    <div v-if="$route.name !== 'eco' && $route.name !== 'eco-app'">
      <div style="display: flex; margin-bottom: 10px">
        <h3 class="eco-detailed__otherTitle" style="margin: 0">Other Apps</h3>
        <el-button
          type="primary"
          style="margin-left: 15px; padding: 6px 18px"
          plain
          @click="exploreEco"
          >Explore Ecosystem</el-button
        >
      </div>
      <div class="eco-detailed__otherContainer">
        <App
          v-for="eco in $accessor.otherEco"
          :key="eco.id"
          :item="eco"
          :detailed="false"
          :move="true"
          :show-name="false"
          :open-modal="true"
          app-type="eco"
          :style="`opacity: ${
            eco.id === $accessor.activeEco.id ? '0.333' : '1'
          }`"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeUnmount} from '@nuxtjs/composition-api'
import {IEcoItem} from '~/types'
import {ECOSYSTEM} from '~/helpers/ecosystem'

export default defineComponent({
  name: 'EcoDetailed',
  props: {},
  setup() {
    return {}
  },
  methods: {
    exploreEco() {
      this.$modal.hide('modal-eco')
      this.$router.push('/eco')
    },
  },
})
</script>

<style lang="scss">
.eco-detailed {
  &__active {
    margin: 0 !important;
    padding: 25px 40px;
    margin-bottom: 15px !important;
    background: $color-0;
  }

  &__otherTitle {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  &__otherTitle,
  &__otherContainer {
    padding-left: 40px;
  }
  &__otherContainer {
    display: flex;
    flex-flow: row wrap;
    padding: 0 40px 5px 30px;

    .app {
      margin: 0 12px 8px 0;
    }

    .app__inner {
      height: 40px;
      width: 40px;
    }
  }
}
</style>
