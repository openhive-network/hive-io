<template>
  <div
    v-if="
      state.setInterval && (!isReady || (isReady && !infobar.hideWhenReady))
    "
    class="infobar"
    :class="{'infobar--active': isReady}"
  >
    <div v-if="!isReady" class="infobar__countdown">
      <div class="infobar__countdown__textWrapper">
        <span
          v-if="infobar.titleDesktopOnly"
          class="infobar__countdown__preText--desktopOnly"
          >{{ infobar.titleDesktopOnly }}</span
        >
        <span class="infobar__countdown__preText">{{ infobar.title }}</span>
      </div>
      <div class="infobar__countdown__timeBox" @click="go()">
        <span class="infobar__countdown__time">{{ formattedCountdown }}</span>
        <fa-icon
          class="infobar__countdown__icon"
          :icon="['fas', 'external-link-alt']"
        />
      </div>
    </div>
    <div
      v-if="state.setInterval && isReady"
      class="infobar__ready"
      @click="go()"
    >
      {{ infobar.titleReady }}
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onBeforeUnmount,
  computed,
  ref,
  onMounted,
} from '@nuxtjs/composition-api'
import moment from 'moment'
import {INFOBAR} from '../../helpers/var'

export default defineComponent({
  props: {},

  setup() {
    const infobar = ref(INFOBAR)

    const getInitialCountdown = () => {
      const then = moment.utc(INFOBAR.date).valueOf()
      const now = moment.utc().valueOf()
      if (then - now < 0) {
        return {d: '0', h: '0', m: '0', s: '0'}
      }
      const countdown = moment(then - now)
      const dNum = Number(countdown.utc().format('DD')) - 1
      const hNum = Number(countdown.utc().format('HH'))
      const mNum = Number(countdown.utc().format('mm'))
      const sNum = Number(countdown.utc().format('ss'))

      return {
        d: String(dNum),
        h: dNum > 0 ? (hNum < 10 ? '0' : '') + String(hNum) : String(hNum),
        m:
          dNum > 0 || hNum > 0
            ? (mNum < 10 ? '0' : '') + String(mNum)
            : String(mNum),
        s: (sNum < 10 ? '0' : '') + String(sNum),
      }
    }

    const initial = getInitialCountdown()
    const state = reactive({
      d: initial.d,
      h: initial.h,
      m: initial.m,
      s: initial.s,
      interval: null as any,
      setInterval: true,
    })

    const setCountdown = () => {
      const then = moment.utc(INFOBAR.date).valueOf()
      const now = moment.utc().valueOf()
      if (then - now < 0) {
        clearInterval(state.interval)
        state.d = '0'
        state.h = '0'
        state.m = '0'
        state.s = '0'
        return
      }
      const countdown = moment(then - now)
      const dNum = Number(countdown.utc().format('DD')) - 1
      const hNum = Number(countdown.utc().format('HH'))
      const mNum = Number(countdown.utc().format('mm'))
      const sNum = Number(countdown.utc().format('ss'))

      // Only show leading zeros when needed
      state.d = String(dNum)
      state.h = dNum > 0 ? (hNum < 10 ? '0' : '') + String(hNum) : String(hNum)
      state.m =
        dNum > 0 || hNum > 0
          ? (mNum < 10 ? '0' : '') + String(mNum)
          : String(mNum)
      state.s = (sNum < 10 ? '0' : '') + String(sNum)
    }

    onMounted(() => {
      state.interval = setInterval(() => {
        setCountdown()
      }, 1000)
    })

    onBeforeUnmount(() => {
      clearInterval(state.interval)
    })

    const countdown = computed(() => {
      return `${state.d}:${state.h}:${state.m}:${state.s}`
    })

    const formattedCountdown = computed(() => {
      const parts: string[] = []
      if (state.d !== '0') parts.push(`${state.d}d`)
      if (state.h !== '0' || state.d !== '0') parts.push(`${state.h}h`)
      if (state.m !== '0' || state.h !== '0' || state.d !== '0')
        parts.push(`${state.m}m`)
      parts.push(`${state.s}s`)
      return parts.join(' ')
    })

    const isReady = computed(() => {
      return countdown.value === '0:0:0:00' || countdown.value === '0:0:0:0'
    })

    const go = () => {
      if (INFOBAR.urlReady && isReady.value) {
        window.open(INFOBAR.urlReady, '_blank')
      } else {
        window.open(INFOBAR.url, '_blank')
      }
    }

    return {state, isReady, countdown, go, infobar, formattedCountdown}
  },
})
</script>

<style lang="scss">
.infobar {
  width: fit-content;
  margin: -160px auto 50px auto;
  text-align: center;

  &--active {
    .infobar__ready {
      background: $primary-color-100;
      cursor: pointer;
      transition: transform 0.5s;
      &:hover {
        transform: translateY(-10%);
      }
    }
  }

  &__countdown {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;

    &__textWrapper {
      color: #1a1a1a;
      font-size: 0.9rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    &__preText {
      color: inherit;
    }

    &__timeBox {
      background: $primary-color-100;
      color: white;
      border-radius: 4px;
      padding: 15px 30px;
      min-width: 250px;
      cursor: pointer;
      transition: transform 0.5s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;

      &:hover {
        transform: translateY(-10%);
      }
    }

    &__time {
      font-size: 1.8rem;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      letter-spacing: 2px;
      color: white;
    }

    &__icon {
      height: 10px;
      width: 10px;
      color: white;
      opacity: 0.8;
    }
  }

  &__ready {
    background: $primary-color-100;
    color: white;
    border-radius: 4px;
    padding: 15px 30px;
    min-width: 250px;
    font-size: 1.5rem;
    font-weight: 600;
    cursor: pointer;
  }
}

@media (max-height: 800px) {
  .infobar {
    margin-top: 0;
    margin-bottom: 30px;
  }
}

@media (max-width: 600px) {
  .infobar {
    margin-top: 0;
    margin-bottom: 20px;

    &__countdown {
      &__textWrapper {
        font-size: 0.8rem;
      }

      &__timeBox {
        padding: 12px 20px;
      }

      &__time {
        font-size: 1.5rem;
        letter-spacing: 1.5px;
      }
    }
  }

  .infobar__countdown__preText--desktopOnly {
    display: none !important;
  }
}
</style>
