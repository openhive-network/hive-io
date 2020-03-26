<template>
  <div class="app" :class="`app--${item.name}`">
    <a :href="item.website" target="_blank" class="app__inner">
      <div class="app__image">
        <img :src="getImage(item.image)" />
      </div>
    </a>
    <div class="app__icons">
      <Icon
        v-for="os in item.os"
        :key="os.name"
        class="app__icon"
        :icon="os.icon"
        :tooltip="os.name"
        :height="20"
        :width="20"
      />
    </div>
    <a :href="item.website" target="_blank" class="app__name">{{
      item.name
    }}</a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Icon from '~/components/icon/icon.vue'
import {} from '../../types'
export default defineComponent({
  components: {
    Icon
  },
  props: {
    item: {
      type: Object,
      default: true
    }
  },

  setup(_props) {
    const getImage = (image) => {
      try {
        return require(`~/assets/images/apps/${image}`)
      } catch (error) {
        return ''
      }
    }
    return { getImage }
  }
})
</script>

<style lang="scss">
.app {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  margin: 25px 50px;

  &__inner {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15%;
    background: #e2e2ec;
    height: 100px;
    width: 100px;
    padding: 12px;
    margin-bottom: 10px;
    transition: transform 0.5s;
    &:hover {
      transform: translateY(-10%);
    }
  }

  &__icons {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__icon {
    margin: 4px;
  }

  &__name {
    margin-top: 2px;
    font-size: 1.1rem;
    transition: all ease-in 0.1s;
    &:hover {
      color: $primary-color-100;
    }
  }

  &__image {
    display: flex;
    height: 100%;
    width: 100%;
    img {
      height: 100%;
      width: 100%;
    }
  }

  &--Engrave {
    .app__image {
      height: initial;
    }
  }

  &--DLease {
    .app__image {
      display: flex;
      justify-content: center;
      img {
        width: initial;
      }
    }
  }
}
</style>
