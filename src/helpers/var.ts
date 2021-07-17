export * from './blockexplorers'
export * from './ecosystem'
export * from './exchanges'
export * from './navigation'
export * from './socialmedias'
export * from './statswebsites'
export * from './wallets'
export * from './contributors'
export * from './updates'

export const INFOBAR = {
  show: false,
  date: '2021-06-30T14:00:00+00:00',
  url: 'https://hive.blog/hive/@hiveio/hive-hardfork-25-is-on-the-way-hive-to-reach-equilibrium-on-june-30th-2021',
  // If empty, only url is used
  urlReady: '',
  // Should timer be hidden when date is reached?
  hideWhenReady: false,
  // Shown when timer is NOT reacher
  title: 'Hardfork 25 in',
  // titleDesktopOnly is displayed BEFORE the title ONLY on desktop and hidden on mobile
  titleDesktopOnly: '',

  // Shown when date is reached
  titleReady: 'Hardfork 25 just happened!',

  // Show when route is active
  routes: ['index'],
}
