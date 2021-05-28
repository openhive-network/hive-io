export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export const catchRouteError = (err: Error) => {
  // eslint-disable-next-line no-console
  return err.name !== 'NavigationDuplicated' && console.error(err)
}

// Catch route errors
export const routerPush = async (_this, q) => {
  return await _this.$router.push(q).catch(catchRouteError)
}

export const formatToUnits = (number, precision = 2) => {
  const abbrev = ['', 'k', 'm', 'b', 't']
  const unrangifiedOrder = Math.floor(Math.log10(Math.abs(number)) / 3)
  const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1))
  const suffix = abbrev[order]

  return parseFloat((number / 10 ** (order * 3)).toFixed(precision)) + suffix
}
