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
  date: '2020-09-10T00:00:00+00:00',
  url: 'https://hivefe.st',
  // If empty, only url is used
  urlReady: '',
  // Should timer be hidden when date is reached?
  hideWhenReady: true,
  // Shown when timer is NOT reacher
  title: 'HiveFest 9 in',
  // titleDesktopOnly is displayed BEFORE the title ONLY on desktop and hidden on mobile
  titleDesktopOnly: '',

  // Shown when date is reached
  titleReady: 'HiveFest 9 is on!',

  // Show when route is active
  routes: ['index'],
}
