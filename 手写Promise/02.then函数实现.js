const PENDING = 'pending'
const FULLFILLED = 'fullfilled'
const REJECTED = 'rejected'

/**
 * 运行一个微任务队列
 * @param {*} callbakc 
 */
function runMicroTask (callback) {
  // 面试的时候可以用setTimeout模拟一个微任务队列异步任务执行 setTimeout(callback, 0)
  // node环境中有一个process对象，浏览器中是没有的
  if (globalThis.process && globalThis.process.nextTick) {
    // 将回调放到微任务都列中
    process.nextTick(callback)
  } else if (globalThis.MutationObserver) {
    const p = document.createElement('p')
    // 浏览器环境中实现微队列
    const observer = new MutationObserver(callback)
    observer.observe(p, {
      childList: true
    })
  } else {
    setTimeout(callback, 0)
  }
}

function isPromise(value) {
  return !!(value && typeof value === 'object' && typeof value.then === 'function')
}

// 写函数的时候关注函数参数和函数返回值，思考
class MyPromise {
  constructor(executor) {
    this._state = PENDING
    this._value = undefined
    this._handlers = []
    try {
      executor(this._resolve.bind(this), this._reject.bind(this))
    } catch (error) {
      this._reject(error)
    }
  }

  /**
   * 让then中回调能拿到当前prmise实例的resolve和reject函数
   * @param {Function} executor 
   * @param {Function} state 
   * @param {Function} resolve 
   * @param {Function} reject 
   */
  _pushHandler(executor, state, resolve, reject) {
    this._handlers.push({
      executor,
      state,
      resolve,
      reject
    })
  }

  _runHandlers() {
    if (this._state === PENDING) {
      return
    }

    while (this._handlers[0]) {
      const handler = this._handlers[0]
      this._runOneHandler(handler)
      this._handlers.shift()
    }
  }

  _runOneHandler({ executor, state, resolve, reject}) { // handler
    runMicroTask(() => {
      if (this._state !== state) {
        return
      }

      // 如果then传入回调不是一个函数，则将then返回的promise保持跟调用then的promise一致
      if (typeof executor !== 'function') {
        this._state === FULLFILLED ? resolve(this._value) : reject(this._value)
        return
      }

      try {
        const result = executor(this._value) // 注意和原来handler.executor的区别，handler.executor()调用的话this就是指向handler了，不太合理
        if (isPromise(result)) {
          this.then(resolve, reject)
          return
        }
        resolve(result)
      } catch (error) {
        reject(error)
      }
    })
  }
  
  /**
   * Promise A+规范的Promise
   * @param {*} onFullfilled 
   * @param {*} onRejected
   */
  then(onFullfilled, onRejected) {
    // then方法会返回一个新的Promise对象
    return new MyPromise((resolve, reject) => {
      this._pushHandler(onFullfilled, FULLFILLED, resolve, reject) // 这里的this是调用then方法的then（因为我们用的是箭头函数）
      this._pushHandler(onRejected, REJECTED, resolve, reject)
      this._runHandlers() // 可能这时调用then方法的promise已经是有状态的了，我们可以试试下面then中回调return的是promise和非promise值时，如果不加这行，有什么区别
    })
  }
  
  _changeState(newState, value) {
      if (this._state !== PENDING) {
        return
      }

      this._state = newState
      this._value = value

      this._runHandlers()
  }

  _resolve(data) {
    this._changeState(FULLFILLED, data)
  }

  _reject(reason) {
    this._changeState(REJECTED, reason)
  }
}

const promise = new MyPromise((resolve, reject) => {  
    resolve(1)
})

// 我们需要注意，then函数的回调只会在then之前的promise的状态确定之后才会对回调做执行（不过执行前会先将其放到微任务队列中）
// 如果promise是pending，但是then()的时候我们也是会将其中的回调拿到注册到调用then函数的对象的handlers属性中进行一个注册
// const promise2 = promise.then(data => {
//   return new Promise((resolve, reject) => {
//     resolve(0)
//   })
// }, error => {
//   console.log(error)
// }).then(data => {
//   return 345
// })

/*
  将then中回调先进行注册
  当promise状态改变时，将回调放入微队列中
  运行回调


*/
const promise2 = promise.then(data => {
    // return 123
    return new MyPromise((resolve, reject) => {
      resolve(2)
    })
})

setTimeout(() => {
  console.log(promise2)
}, 1000)