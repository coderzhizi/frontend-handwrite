Function.prototype.myBind = function(thisContext, ...restArgs) {
  thisContext = (thisContext === null || thisContext === undefined) ? window : Object(thisContext)

  Object.defineProperty(thisContext, 'fn', {
    configurable: true,
    enumerable: false,
    value: this
  })

  return (...otherRestArgs) => {
    thisContext.fn(...[...restArgs, ...otherRestArgs])
    delete thisContext.fn
  }
}

function sum(a, b) {
  return a + b + this.value
}

const sumBind = sum.bind({ value: 4}, 1)
console.log(sumBind(2))
