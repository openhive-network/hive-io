<template>
  <div class="app" :class="`app--${item.name}`">
    <a
      :href="item.website"
      target="_blank"
      rel="nofollow noopener noreferrer"
      class="app__inner"
      :class="{ 'app__inner--hover': hover }"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
    >
      <div class="app__image">
        <img :src="getImage(item.image)" />
      </div>
    </a>

    <a
      :href="item.website"
      target="_blank"
      rel="nofollow noopener noreferrer"
      class="app__name"
      :class="{ 'app__name--hover': hover }"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
      >{{ item.name
      }}<fa-icon
        class="app__name__icon"
        :icon="['fas', 'external-link-alt']"
      ></fa-icon
    ></a>

    <div class="app__icons">
      <Icon
        v-for="os in item.os"
        :key="os.name"
        class="app__icon"
        :icon="os.icon"
        :tooltip="os.name"
        :height="18"
      />
    </div>
    <a
      v-if="item.github || item.gitlab"
      :href="item.github || item.gitlab"
      target="_blank"
      rel="nofollow noopener noreferrer"
      class="app__git"
      >{{ item.github ? 'Github' : 'Gitlab'
      }}<fa-icon
        class="app__git__icon"
        :icon="['fas', 'external-link-alt']"
      ></fa-icon
    ></a>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
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
    const hover = ref(false)
    const getImage = (image) => {
      try {
        return require(`~/assets/images/apps/${image}`)
      } catch (error) {
        return ''
      }
    }
    return { getImage, hover }
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
    height: 110px;
    width: 110px;
    padding: 12px;
    margin-bottom: 8px;
    transition: transform 0.5s;
    &:hover,
    &--hover {
      transform: translateY(-10%);
    }
  }

  &__icons {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2px;
  }

  &__icon {
    margin: 4px;
  }

  &__name {
    display: flex;
    align-items: center;
    margin-top: 2px;
    margin-bottom: 6px;
    font-size: 1.25rem;
    transition: all ease-in 0.1s;
    &:hover,
    &--hover {
      color: $primary-color-100;
    }

    &__icon {
      height: 8px;
      margin-left: 5px;
    }
  }

  &__git {
    display: flex;
    align-items: center;
    margin-top: 4px;
    font-size: 0.88rem;
    transition: all ease-in 0.1s;
    &:hover {
      color: $primary-color-100;
    }

    &__icon {
      height: 7px;
      margin-left: 5px;
    }
  }

  &__image {
    display: flex;
    height: 100%;
    width: 100%;
    img {
      height: 100%;
      width: 100%;
      border-radius: 15%;
    }
  }

  &--Engrave {
    .app__image {
      height: initial;
      img {
        border-radius: 0;
      }
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

@media (max-width: 525px) {
  .app {
    margin: 20px 20px 40px 20px;
  }
}

@media (max-width: 425px) {
  .app {
    margin: 15px 15px 30px 15px;
  }
}
</style>
