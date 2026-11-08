import {useSyncExternalStore} from 'react'

const values = new Map<string, unknown>()
const subscribe = () => () => {}

/**
 * Random values for a static export: the prerendered HTML and hydration use
 * `serverValue`, then the client switches to `make()`. Without this, a random
 * order picked during the build is frozen into the HTML for every visitor.
 * `make()` runs once per page load and per `key`, so the value stays put
 * across re-renders and client-side navigation.
 */
export const useClientRandom = <T>(
  key: string,
  serverValue: T,
  make: () => T,
): T =>
  useSyncExternalStore(
    subscribe,
    () => {
      if (!values.has(key)) values.set(key, make())
      return values.get(key) as T
    },
    () => serverValue,
  )
