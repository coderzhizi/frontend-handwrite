function curry(fn) {
  return function curried(...restArgs) {
    if (fn.length <= restArgs.length) {
      return fn(...restArgs)
    }

    return function(...otherRestArgs) {
      return curried(...[...restArgs, ...otherRestArgs])
    }
  }
}

const sum = (a, b, c) => a + b + c
const currySum = curry(sum)
console.log(currySum(1)(2)(3))