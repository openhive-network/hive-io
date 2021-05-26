import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Index = () => import('./pages/index.vue').then((m) => m.default || m)
const About = () => import('./pages/about.vue').then((m) => m.default || m)
const Brand = () => import('./pages/brand.vue').then((m) => m.default || m)
const Eco = () => import('./pages/eco.vue').then((m) => m.default || m)
const Wallets = () => import('./pages/wallets.vue').then((m) => m.default || m)
const Developers = () => import('./pages/developers.vue').then((m) => m.default || m)

export const createRouter = () => {
  const router = new Router({
    mode: 'history',
    base: '/',
    scrollBehavior,
    routes: [
      {
        path: '/',
        component: Index,
        name: 'index',
        meta: {}
      },
      {
        path: '/about',
        component: About,
        name: 'about',
        meta: {}
      },
      {
        path: '/brand',
        component: Brand,
        name: 'brand',
        meta: {}
      },
      {
        path: '/eco',
        component: Eco,
        name: 'eco',
        meta: { keepPosition: true, thresholdPosition: 600 }
      },
      {
        path: '/eco/:app',
        component: Eco,
        name: 'eco-app',
        meta: { keepPosition: true, thresholdPosition: 600 }
      },
      {
        path: '/wallets',
        component: Wallets,
        name: 'wallets',
        meta: {}
      },
      {
        path: '/developers',
        component: Developers,
        name: 'developers',
        meta: {}
      },
    ],
    fallback: true,
  })

  router.beforeEach((to, from, next) => {
    return next()
  })

  return router
}

if (process.client) {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'

    // reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    window.addEventListener('beforeunload', () => {
      // console.log('set restoration auto')
      window.history.scrollRestoration = 'auto'
    })

    // Setting scrollRestoration to manual again when returning to this page.
    window.addEventListener('load', () => {
      // console.log('set restoration manual')
      window.history.scrollRestoration = 'manual'
    })
  }
}

const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  if (
    (to.matched.length < 2 && !to.meta.keepPosition) ||
    to.meta.scrollToTop ||
    to.matched.some((r) => r.components.default.options.scrollToTop)
  ) {
    // console.log('Resetting position to 0', to)
    // scroll to the top of the page
    if (!to.meta.thresholdPosition || window.pageYOffset > to.meta.thresholdPosition) position = { x: 0, y: 0 }
  }

  // console.log('saved position', savedPosition)

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
    // console.log('savedPosition', savedPosition)
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let { hash } = to
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = `#${window.CSS.escape(hash.substr(1))}`
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn(
            'Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).',
          )
        }
      }
      resolve(position)
    })
  })
}
