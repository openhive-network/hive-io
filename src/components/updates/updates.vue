<template>
  <div class="updates">
    <UpdatesUpdate class="updates__update" :item="UPDATES[0]" :big="true" />

    <div class="updates__smaller">
      <UpdatesUpdate
        v-for="update in UPDATES.slice(1, UPDATES.length)"
        :key="update.title"
        class="updates__update"
        :item="update"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import {UPDATES} from '~/helpers/updates'

export default defineComponent({
  setup() {
    return {
      UPDATES: UPDATES.map((v) => {
        if (v.video) {
          v.video = v.video
            .replace('youtube.', 'youtube-nocookie.')
            .replace('youtu.be/', 'www.youtube-nocookie.com/embed/')
            .replace('/watch?v=', '/embed/')
            .replace('&t=', '?start=')
        }
        return v
      }),
    }
  },
})
</script>

<style lang="scss">
.updates {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  max-width: 1200px;
  width: 100%;

  &__smaller {
    display: flex;
    width: 100%;
    flex-flow: row wrap;
    justify-content: center;

    .updates__update {
      margin: 10px 15px;
    }
  }
}
</style>
