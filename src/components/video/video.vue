<template>
  <video class="video" controls>
    <source src="~/assets/videos/marketing.mp4" type="video/mp4">
  </video>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
.video {
  width: auto;
  height: auto;
}
</style>
