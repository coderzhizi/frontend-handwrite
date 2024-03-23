Function.prototype.myApply = function (context, args) {
  context = context === null || context === undefined ? window : Object(context)

  // 新增context对象的属性fn的value指代调用apply的函数
  Object.defineProperty(context, 'fn', {
    configurable: true,
    enumerable: false,
    // （这里的this就是调用apply的函数，比如：a.apply()， apply是这样调用的）
    value: this,
  })

  // 通过隐式绑定
  context.fn(...args)

  delete context.fn
}

function sum(a, b) {
  return a + b + this.value
}
console.log(sum.apply({ value: 1 }, [2, 3]))