<template>
  <div class="statWebsite" :class="`statWebsite--${item.id}`">
    <a
      :href="item.website"
      target="_blank"
      rel="nofollow noopener noreferrer"
      class="statWebsite__inner"
      :class="{ 'statWebsite__inner--hover': hover }"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
    >
      <div class="statWebsite__image">
        <img :src="getImage(item.image)" />
      </div>
    </a>

    <a
      :href="item.website"
      target="_blank"
      rel="nofollow noopener noreferrer"
      class="statWebsite__name"
      :class="{ 'statWebsite__name--hover': hover }"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
      >{{ item.name
      }}<fa-icon
        class="statWebsite__name__icon"
        :icon="['fas', 'external-link-alt']"
      ></fa-icon
    ></a>

    <a
      v-if="item.github || item.gitlab"
      :href="item.github || item.gitlab"
      target="_blank"
      rel="nofollow noopener noreferrer"
      class="statWebsite__git"
      >{{ item.github ? 'Github' : 'Gitlab'
      }}<fa-icon
        class="statWebsite__git__icon"
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
        return require(`~/assets/images/websites/${image}`)
      } catch (error) {
        return ''
      }
    }
    return { getImage, hover }
  }
})
</script>

<style lang="scss">
.statWebsite {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  margin: 25px 40px;

  &__inner {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background: #e2e2ec;
    height: 60px;
    width: 250px;
    padding: 12px;
    margin-bottom: 8px;
    transition: transform 0.5s;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.03);
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
    justify-self: center;
    height: 100%;
    width: 100%;
    max-height: 40px;
    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }

  &--dapp-review,
  &--stateofthedapps {
    .statWebsite__inner {
      background: #2e3135;
    }
  }

  &--dapp-com,
  &--hivedapps-com {
    .statWebsite__inner {
      background: white;
    }
  }
}

@media (max-width: 525px) {
  .statWebsite {
    margin: 20px 20px 40px 20px;
  }
}

@media (max-width: 425px) {
  .statWebsite {
    margin: 15px 15px 30px 15px;
  }
}
</style>
