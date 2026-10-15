import type {ComponentProps} from 'react'

const EXPLORER_URL = 'https://explore.openhive.network/'

/**
 * Link to the chain explorer, shown in place of a live number when the
 * Hive API cannot be reached. Pass the color via className.
 */
function ExplorerLink({className, ...props}: ComponentProps<'a'>) {
  return (
    <a
      href={EXPLORER_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`hover:underline ${className ?? ''}`}
      {...props}
    />
  )
}

export {ExplorerLink}
