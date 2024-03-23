function cacheDecorator(callback) {
  let cache = new Map()

  return function(...restArgs) {
    let key = JSON.stringify(restArgs)
    if (cache.has(key)) {
      return cache.get(key)
    }

    let result = callback.apply(this, restArgs)
    cache.set(key, result)
    return result
  }
}