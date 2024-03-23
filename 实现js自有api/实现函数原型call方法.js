Function.prototype.myCall = function(thisContext, ...restArgs) {
  thisContext = (thisContext === null || thisContext === undefined) ? window : Object(thisContext)

  Object.defineProperty(thisContext, 'fn', {
    configurable: true,
    enumerable: false,
    value: this
  })

  const res = thisContext.fn(...restArgs)
  delete thisContext.fn

  return res
}

function test(a, b) {
  return a + b + this.value
}

console.log(test.myCall({ value: 3 }, 1, 2))
console.log(test.call({ value: 3 } , 1, 2))
