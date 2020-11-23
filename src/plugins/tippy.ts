import Vue from 'vue'
import VueTippy, {TippyComponent} from 'vue-tippy'

// Add additional themes.
/* import 'tippy.js/themes/light.css'
import 'tippy.js/themes/light-border.css'
import 'tippy.js/themes/translucent.css' */

Vue.use(VueTippy, {
  directive: 'tippy', // => v-tippy
  flipDuration: 0,
  popperOptions: {
    modifiers: {
      preventOverflow: {
        enabled: true,
      },
    },
  },
})
Vue.component('tippy', TippyComponent)
