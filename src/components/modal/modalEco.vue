<template>
  <modal
    class="modal-eco"
    name="modal-eco"
    :max-width="750"
    :max-height="750"
    width="80%"
    height="auto"
    :scrollable="true"
    :adaptive="true"
    :focus-trap="true"
    @before-close="$accessor.resetActiveEco()"
  >
    <fa-icon
      class="modal-eco__close"
      :icon="['fas', 'times']"
      @click="$modal.hide('modal-eco')"
    />
    <EcoDetailed />
  </modal>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import EcoDetailed from '../app/ecoDetailed.vue'
import {IEcoItem} from '~/types'
import {ECOSYSTEM} from '~/helpers/ecosystem'

export default defineComponent({
  name: 'ModalEco',
  components: {EcoDetailed},
  props: {},
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
.modal-eco {
  .v--modal {
    background: $color-2;
    padding-bottom: 15px;
    max-width: 750px;
    margin: 0 auto;
    left: 0 !important;
  }

  &__close {
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 14px;
    height: 20px;
    width: 20px;
  }
}

@media (max-width: 600px) {
  .modal-eco {
    .v--modal {
      width: 100% !important;
    }
  }
}
</style>
