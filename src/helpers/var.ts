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
  show: true,
  date: '2022-10-11T12:00:00+00:00',
  url: 'https://hive.blog/hive/@hiveio/the-evolution-of-hive-hardfork-26',
  // If empty, only url is used
  urlReady: '',
  // Should timer be hidden when date is reached?
  hideWhenReady: true,
  // Shown when timer is NOT reacher
  title: 'Hardfork 26 in',
  // titleDesktopOnly is displayed BEFORE the title ONLY on desktop and hidden on mobile
  titleDesktopOnly: '',

  // Shown when date is reached
  titleReady: 'Hardfork 26 just happened!',

  // Show when route is active
  routes: ['index'],
}
