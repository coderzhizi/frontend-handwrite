/**
 * promise A+规范只是描述到then方法
 */

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

  /**
   * 实现catch方法
   * @param {*} onRejected 
   */
  catch(onRejected) {
    this._then(null, onRejected)
  }

  /**
   * 无论是什么结果，都会运行
   * 返回一个promise，状态和调用其的promise状态一致
   * @param {Function} 只要promise状态决定就会调用
   */
  finally(onSettled) {
    return this.then((data) => { // 并且回调中无法改变其返回的promise状态
      onSettled() // 外部传入的回调是拿不到调用其的promise的决议值的（resolve的值），因此此处什么都不传，因此我包将函数一层回调后再传给then
      // 这个promise的决议值
      return data
    }, 
    (reason) => {
      onSettled()
      throw reason
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