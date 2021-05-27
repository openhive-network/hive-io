<template>
  <div class="contributors-contributor">
    <img
      class="contributors-contributor__image"
      :src="
        contributor.image
          ? getImage(contributor.image)
          : `https://images.hive.blog/u/${contributor.social.hive}/avatar/large`
      "
    />
    <a
      class="contributors-contributor__name"
      :href="`${links.hive}${contributor.social.hive}`"
      target="_blank"
      rel="nofollow noopener noreferrer"
      >{{ contributor.name }}</a
    >
    <div class="contributors-contributor__label dotdotdot">
      {{ contributor.labels.join(' & ').replace('Core Developer', 'Core Dev') }}
    </div>
    <div class="contributors-contributor__socials">
      <a
        v-for="social in Object.entries(contributor.social)"
        :key="social[0]"
        :href="`${links[social[0]]}${social[1]}`"
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <fa-icon
          class="contributors-contributor__icon"
          :icon="['fab', social[0]]"
        />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import {IContributor} from '~/types/index'

export default defineComponent({
  props: {
    contributor: {
      type: Object,
      default: {} as IContributor,
    },
  },

  setup() {
    const getImage = (image) => {
      try {
        return require(`~/assets/images/contributors/${image}`)
      } catch (error) {
        return ''
      }
    }

    const links = {
      linkedin: 'https://www.linkedin.com/in/',
      hive: 'https://hive.blog/@',
      twitter: 'https://twitter.com/',
    }
    return {getImage, links}
  },
})
</script>

<style lang="scss">
.contributors-contributor {
  display: flex;
  flex-flow: column nowrap;
  padding: 14px;
  background: #e2e2ec;
  border-radius: 5px;
  &__image {
    min-height: 190px;
    min-width: 190px;
    max-height: 190px;
    max-width: 190px;
    height: 100%;
    width: 100%;
    object-fit: contain;
    border-radius: 10px;
  }

  &__name {
    font-size: 1.2rem;
    font-weight: 700;
    padding: 6px 10px;
    margin: 10px 4px 10px 4px;
    background: #f0f0f7;
    color: #555562;
    border-radius: 14px 14px 1px 1px;
    text-align: center;
    cursor: pointer;
  }

  &__labels {
    display: flex;
  }

  &__label {
    font-size: 0.8rem;
    color: #787885;
    text-align: center;
  }

  &__socials {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
  }

  &__icon {
    height: 20px;
    width: 20px;
    cursor: pointer;
    margin: 5px 6px;
    opacity: 1;
    color: #787885;
  }
}

@media (max-width: 768px) {
  .contributors-contributor {
    &__image {
      max-height: 160px;
      max-width: 160px;
    }
  }
}

@media (max-width: 720px) {
  .contributors-contributor {
    flex: 1;
    &__image {
      max-height: 100%;
      max-width: 100%;
      min-width: 150px;
      min-height: 150px;
    }
  }
}
</style>
