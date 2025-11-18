export const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]!
    array[j] = temp!
  }
  return array
}

export const catchRouteError = (err: Error) => {
  // eslint-disable-next-line no-console
  return err.name !== 'NavigationDuplicated' && console.error(err)
}

// Catch route errors
export const routerPush = async (_this: any, q: any): Promise<void> => {
  return await _this.$router.push(q).catch(catchRouteError)
}

export const formatToUnits = (number: number, precision = 2): string => {
  const abbrev = ['', 'k', 'm', 'b', 't']
  const unrangifiedOrder = Math.floor(Math.log10(Math.abs(number)) / 3)
  const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1))
  const suffix = abbrev[order] || ''

  return parseFloat((number / 10 ** (order * 3)).toFixed(precision)) + suffix
}
