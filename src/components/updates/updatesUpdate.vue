<template>
  <div class="updates-update" :class="{'updates-update--big': big}">
    <div class="updates-update__title">{{ item.title }}</div>
    <iframe
      v-if="item.video"
      :src="item.video"
      frameBorder="0"
      class="updates-update__iframe"
      allowfullscreen
    />
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    big: Boolean,
  },

  setup() {
    return {}
  },
})
</script>

<style lang="scss">
.updates-update {
  display: flex;
  flex-flow: column;
  margin-bottom: 10px;
  width: fit-content;
  height: fit-content;
  background: #e2e2ec;
  border-radius: 10px;
  // box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  &__title {
    font-weight: 700;
    margin-bottom: 10px;
    font-size: 1.25rem;
    padding: 12px 8px 4px 26px;
    color: #555555;
  }

  &__iframe {
    max-width: 100% !important;
    height: 100%;
    width: 100%;
    border-radius: 0 0 10px 10px;
    background: rgba(33, 37, 41, 0.6);
  }

  &--big {
    margin-bottom: 40px;
    iframe {
      width: 793px !important;
      height: 471px !important;
    }
  }
}

@media (min-width: 360px) {
  .updates-update {
    iframe {
      width: 360px;
      height: 205px;
    }
  }
}

@media (max-width: 360px) {
  .updates-update {
    iframe {
      width: 360px !important;
      height: 205px !important;
    }
  }
}
// @media (min-width: 576px) {
//   .updates-update {
//     iframe {
//       width: 504px;
//       height: 285.6px;
//     }
//   }
// }

// @media (min-width: 768px) {
//   .updates-update {
//     iframe {
//       width: 610px;
//       height: 362px;
//     }
//   }
// }
</style>
