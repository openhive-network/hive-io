<template>
  <div
    v-if="state.setInterval"
    class="infobar"
    :class="{'infobar--active': isReady}"
    @click="go()"
  >
    <div v-if="!isReady" class="infobar__countdown">
      <div class="infobar__countdown__preText">
        <span class="infobar__countdown__preText--desktopOnly"> HiveFest</span>
        in
      </div>
      <div class="infobar__countdown__numbers">
        <div class="infobar__countdown__d">
          {{ state.d }}
        </div>
        :
        <div class="infobar__countdown__h">
          {{ state.h }}
        </div>
        :
        <div class="infobar__countdown__m">
          {{ state.m }}
        </div>
        :
        <div class="infobar__countdown__s">
          {{ state.s }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onBeforeUnmount,
  computed,
  onMounted,
} from '@vue/composition-api'
import moment from 'moment'

export default defineComponent({
  props: {},

  setup() {
    const state = reactive({
      d: '0',
      h: '01',
      m: '00',
      s: '00',
      interval: null as any,
      setInterval: false,
    })

    const setCountdown = () => {
      const then = moment.utc('2020-10-14T14:00:00+00:00').valueOf()
      const now = moment.utc().valueOf()
      if (then - now < 0) {
        clearInterval(state.interval)
        state.d = '00'
        state.h = '00'
        state.m = '00'
        state.s = '00'
        return
      }
      const countdown = moment(then - now)
      const d = countdown.utc().format('DD')
      const h = countdown.utc().format('HH')
      const m = countdown.utc().format('mm')
      const s = countdown.utc().format('ss')

      state.d = `${Number(d) - 1 < 10 ? '0' : ''}${String(Number(d) - 1)}`
      state.h = h
      state.m = m
      state.s = s
    }

    onMounted(() => {
      setCountdown()
      state.interval = setInterval(() => {
        state.setInterval = true
        setCountdown()
      }, 1000)
    })

    onBeforeUnmount(() => {
      clearInterval(state.interval)
    })

    const countdown = computed(() => {
      return `${state.d}:${state.h}:${state.m}:${state.s}`
    })

    const isReady = computed(() => {
      return countdown.value === '00:00:00:00'
    })

    const go = () => {
      const link =
        'https://peakd.com/hiveblockchain/@hiveio/has-the-eclipse-happened-explaining-how-hive-hardforks-work-and-activating-hf24-on-october-14th'
      window.open(link, '_blank')
      /* if (!isReady.value) {

      } else {

      }
      window.open('https://hive.blog', '_blank') */
    }

    return {state, isReady, countdown, go}
  },
})
</script>

<style lang="scss">
.infobar {
  position: absolute;
  right: 0;
  left: 0;
  top: 120px;
  width: fit-content;
  margin: 0 auto;
  background: $primary-color-100;
  color: white;
  border-radius: 4px;
  padding: 15px 30px;
  min-width: 250px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer; // default;

  &--active {
    background: $primary-color-100;
    cursor: pointer;

    transition: transform 0.5s;
    &:hover {
      transform: translateY(-10%);
    }
  }

  &__countdown {
    display: flex;
    align-items: center;
    justify-content: center;

    &__preText {
      margin-right: 7px;
    }
    &__numbers {
      display: flex;
    }

    &__s {
      min-width: 30px;
      text-align: left;
    }
  }
}

@media (max-width: 600px) {
  .infobar {
    top: 100px;
  }
  .infobar__countdown__preText--desktopOnly {
    display: none !important;
  }
}
</style>
