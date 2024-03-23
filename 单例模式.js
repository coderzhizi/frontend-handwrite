class Single {
  _instance = null

  static getInstance() {
    if (this._instance) {
      return this._instance
    }

    globalThis._instance = new Single()
    return this._instance
  }
}

const o1 = Single.getInstance()
const o2 = Single.getInstance()
console.log(o1, o2, o1 === o2)