export * from './blockexplorers'
export * from './ecosystem'
export * from './exchanges'
export * from './navigation'
export * from './socialmedias'
export * from './statswebsites'
export * from './wallets'
export * from './contributors'

export const INFOBAR = {
  show: false,
  date: '2020-12-18T15:30:00+00:00',
  url: 'https://hivefe.st',
  // If empty, only url is used
  urlReady: '',
  // Should timer be hidden when date is reached?
  hideWhenReady: false,
  // Shown when timer is NOT reacher
  title: 'HiveFest in',
  // titleDesktopOnly is displayed BEFORE the title ONLY on desktop and hidden on mobile
  titleDesktopOnly: '',

  // Shown when date is reached
  titleReady: 'HiveFest is happening!',

  // Show when route is active
  routes: ['index'],
}
