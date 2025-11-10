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
  // date: '2020-09-10T00:00:00.000Z',
  date: '2025-11-19T13:00:00+00:00',
  url: 'https://peakd.com/hive-160391/@gtg/brace-yourself-hardfork-is-coming',
  // If empty, only url is used
  urlReady: '',
  // Should timer be hidden when date is reached?
  hideWhenReady: true,
  // Shown when timer is NOT reacher
  title: 'Hardfork 28 in',
  // titleDesktopOnly is displayed BEFORE the title ONLY on desktop and hidden on mobile
  titleDesktopOnly: '',

  // Shown when date is reached
  titleReady: 'Hardfork 28 is live!',

  // Show when route is active
  routes: ['index'],
}
