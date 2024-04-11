function compose(functions) {
  return function(...args) {
    return functions.reduceRight((target, fn) => fn(target), args)
  }
}