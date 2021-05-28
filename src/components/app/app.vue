<template>
  <div
    class="app"
    :class="`app--${item.name} app--type-${appType} ${
      move && !detailed ? 'app--shouldMove' : ''
    } ${detailed ? 'app--detailed' : ''}`"
  >
    <a
      v-if="!openModal && !detailed && !openDetailed"
      :href="item.website"
      target="_blank"
      rel="nofollow noopener noreferrer"
      class="app__inner"
      :class="{'app__inner--hover': hover}"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
    >
      <div class="app__image">
        <img :src="getImage(item.image)" />
      </div>
    </a>

    <div
      v-else
      class="app__inner"
      :class="{'app__inner--hover': hover}"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
      @click="onClick"
    >
      <div class="app__image">
        <img :src="getImage(item.image)" />
      </div>
    </div>

    <div class="app__right">
      <div class="app__topContainer">
        <a
          v-if="showName || detailed"
          :href="item.website"
          target="_blank"
          rel="nofollow noopener noreferrer"
          class="app__name"
          :class="{'app__name--hover': hover}"
          @mouseenter="hover = true"
          @mouseleave="hover = false"
          >{{ item.name
          }}<fa-icon
            v-if="!detailed && !openDetailed && !openModal"
            class="app__name__icon"
            :icon="['fas', 'external-link-alt']"
          ></fa-icon
        ></a>
        <div v-if="detailed || showTypes" class="app__typeContainer">
          <AppType v-for="t in item.types" :key="t" :app-type="t" />
        </div>
        <div
          v-if="detailed && stats && stats.dau && stats.dau.last_month > 10"
          class="app__monthlyUsers"
        >
          {{ `${formatToUnits(stats.dau.last_month)} Monthly Users` }}
        </div>
      </div>

      <div v-if="detailed" class="app__description">{{ item.description }}</div>

      <div v-if="item.os" class="app__icons">
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
        >{{ 'Open Source'
        }}<fa-icon
          class="app__git__icon"
          :icon="['fas', 'external-link-alt']"
        ></fa-icon
      ></a>
      <div v-if="item.closedSource" class="app__git">
        {{ 'Closed Source'
        }}<fa-icon class="app__git__icon" :icon="['fas', 'times']"></fa-icon>
      </div>
      <div v-if="detailed" class="app__launch">
        <a
          :href="item.website"
          target="_blank"
          rel="nofollow noopener noreferrer"
          style="color: white"
          >Website</a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed} from '@nuxtjs/composition-api'
import {formatToUnits} from '~/helpers/util'

export default defineComponent({
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    appType: String,
    move: {
      type: Boolean,
      default: true,
    },
    showName: {
      type: Boolean,
      default: true,
    },
    showTypes: {
      type: Boolean,
      default: false,
    },
    openModal: Boolean,
    openDetailed: Boolean,
    detailed: Boolean,
  },

  setup(_props, {root}) {
    const hover = ref(false)
    const dict = {threespeak: '3speak'}
    const stats = computed(
      () =>
        root.$accessor.statsAppsData.filter(
          (d) => d.name === (dict[_props.item.id] || _props.item.id),
        )[0],
    )
    const getImage = (image) => {
      try {
        return require(`~/assets/images/apps/${image}`)
      } catch (error) {
        return ''
      }
    }
    return {getImage, hover, stats}
  },
  methods: {
    onClick() {
      if (this.$props.openDetailed || this.$accessor.activeEco.id) {
        this.$accessor.setActiveEco(this.$props.item as any)
        if (this.$props.openDetailed) {
          // this.$router.replace(`/eco/${this.$props.item.id}`)
        }
      } else {
        this.$accessor.setActiveEco(this.$props.item as any)
        this.$modal.show('modal-eco')
      }
    },
    formatToUnits(v) {
      return formatToUnits(v)
    },
  },
})
</script>

<style lang="scss">
.app {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  margin: 15px 30px;
  cursor: pointer;

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
    font-size: 1rem;
    transition: all ease-in 0.1s;

    &__icon {
      height: 8px;
      margin-left: 5px;
    }
  }

  &--shouldMove {
    .app__name {
      &:hover,
      &--hover {
        color: $primary-color-100;
      }
    }

    .app__inner {
      &:hover,
      &--hover {
        transform: translateY(-10%);
      }
    }
  }

  &__git {
    display: flex;
    align-items: center;
    margin-top: 4px;
    font-size: 0.88rem;
    opacity: 0.5;
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

  .app__right {
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  .app__topContainer {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
  }

  .app__typeContainer {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    .app-type {
      margin-left: 8px;

      &:nth-of-type(1) {
        margin-left: 0;
      }
    }
  }

  .app__monthlyUsers {
    padding: 5px 10px;
    margin-left: 15px;
    background: #e2e2ec;
    border-radius: 5px;
    font-size: 0.8rem;
    cursor: default;
    margin-bottom: 6px;
  }

  &--detailed {
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: flex-start;
    cursor: initial;

    .app__name {
      font-size: 1.5rem;
      font-weight: 600;
    }

    .app__right {
      display: flex;
      flex-flow: column;
      align-items: flex-start;
      margin-top: 10px;
      margin-left: 20px;
      flex: 1;
    }

    .app__inner {
    }

    .app__topContainer {
      flex-flow: row wrap;
      margin-bottom: 5px;
    }

    .app__typeContainer {
      margin-left: 12px;
      margin-top: -2px;
    }

    .app__launch {
      padding: 8px 20px;
      cursor: pointer;
      border-radius: 5px;
      background: #757575;
      width: fit-content;
      color: white;
      margin-top: 14px;
      &:hover {
        background: #5f5f5f;
      }
    }
  }
}

@media (max-width: 525px) {
  .app {
    margin: 20px 20px 40px 20px;
  }

  .app__monthlyUsers {
    margin-left: 0 !important;
  }
}

@media (max-width: 425px) {
  .app {
    margin: 15px 15px 30px 15px;
  }
}
</style>
