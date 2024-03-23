const PENDING = 'pending'
const FULLFILLED = 'fullfilled'
const REJECTED = 'rejected'

class MyPromise {
  /** 
   * 创建一个Promise
   * @param { Function } executor 任务执行器，立即执行
   */
  constructor(executor) {
    this._state = PENDING
    this._value = undefined
    try {
      executor(this._resolve.bind(this), this._reject.bind(this)) // 通过bind将this指向否则我们外部new MyPromise回调中调用resolve时，由于是全局调用，则resolve函数中的this指向的是全局，那么这肯定是不行的
    } catch (error) {
      this._reject(error)
    }
  }

  /**
   * 更改任务状态
   * @param {*} newState 新状态
   * @param {*} value 相关数据
   */
  _changeState(newState, value) {
    if (this._state !== PENDING) {
      return
    }
    this._state = newState
    this._value = value
  }

  /**
   * 标记当前任务完成
   * @param { any } data 任务完成的相关数据
   */
  _resolve (data) {
    this._changeState(FULLFILLED, data)
    // 改变状态和数据
    console.log(data)
  }

  /**
   * 标记当前任务失败
   * @param { any } reason 
   */
  _reject(reason) {
    this._changeState(REJECTED, reason)
    // 改变状态和数据
    console.log(reason)
  }
}

const promise = new MyPromise((resolve, reject) => { // 这里的回调我们将其定义为executor
  // throw 123
  resolve(123)
  reject(456)
})

