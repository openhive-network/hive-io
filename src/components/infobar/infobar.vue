<template>
  <div class="infobar" :class="{ 'infobar--active': isReady }" @click="go()">
    <div v-if="!isReady" class="infobar__countdown">
      <div class="infobar__countdown__preText">Launch in</div>
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
    <div v-else>#HiveIsAlive!</div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onBeforeUnmount,
  computed
} from '@vue/composition-api'
import moment from 'moment'

export default defineComponent({
  props: {},

  setup() {
    const state = reactive({
      d: '00',
      h: '00',
      m: '00',
      s: '00',
      interval: null as any
    })

    const setCountdown = () => {
      const then = moment.utc('2020-03-20T14:00:00+0000').valueOf()
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
      const d = countdown.format('DD')
      const h = countdown.format('HH')
      const m = countdown.format('mm')
      const s = countdown.format('ss')

      state.d = `0${String(Number(d) - 1)}`
      state.h = h
      state.m = m
      state.s = s
    }

    setCountdown()
    state.interval = setInterval(() => {
      setCountdown()
    }, 1000)

    onBeforeUnmount(() => {
      clearInterval(state.interval)
    })

    const isReady = computed(() => {
      return `${state.d}:${state.h}:${state.m}:${state.s}` === '00:00:00:00'
    })

    const go = () => {
      if (!isReady.value) return
      window.open('https://hive.blog', '_blank')
    }

    return { state, isReady, go }
  }
})
</script>

<style lang="scss">
.infobar {
  position: absolute;
  right: 0;
  left: 0;
  top: 80px;
  width: fit-content;
  margin: 0 auto;
  background: $secondary-color-100;
  color: white;
  border-radius: 4px;
  padding: 15px 30px;
  min-width: 250px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: default;

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
</style>