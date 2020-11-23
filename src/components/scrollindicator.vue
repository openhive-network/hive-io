<template>
  <div class="scroll-indicator">
    <fa-icon class="scroll-indicator__icon" :icon="['fas', 'chevron-down']">
    </fa-icon>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@vue/composition-api'
export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
.scroll-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 40px;
  width: 40px;
  opacity: 0.4;
  &__icon {
    height: 30px;
    width: 30px;
    position: absolute;
    font-size: 50px;

    -webkit-animation: bounce 1s infinite;
    animation: bounce 1s infinite;
  }
}

@-webkit-keyframes bounce {
  0% {
    top: 0%;
  }
  50% {
    top: 50%;
  }
  100% {
    top: 0%;
  }
}

@keyframes bounce {
  0% {
    top: 0%;
  }
  50% {
    top: 50%;
  }
  100% {
    top: 0%;
  }
}
</style>
