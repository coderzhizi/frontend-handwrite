function invokeOnce (fn) {
    let called = false

    return function _invokeOnce (rest) {
        if (called) {
            return _invokeOnce.value
        }

        called = true
        _invokeOnce.value = fn.apply(this, rest)
    }
}

Reflect.defineProperty(Function.prototype, 'invokeOnce' , {
    value() {
        return invokeOnce(this)
    },
    configurable: true
})

const _invokeOnce = invokeOnce(() => Math.random())
const res1 = _invokeOnce()
const res2 = _invokeOnce()
const res3 = _invokeOnce()
const res4 = _invokeOnce()

console.log(res1, res2, res3, res4)