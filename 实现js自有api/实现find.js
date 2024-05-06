Array.prototype.Find = function (callback, thisArg) {
  const context = thisArg ? thisArg : this
  for (let i = 0; i < context.length; i++) {
    if (callback.call(context, context[i], i, context)) {
      return context[i]
    }
  }
}
const arr = [4, 5]
const result = [1, 2, 3].Find((item, index, array) => item >= 2, arr)
console.log(result)
