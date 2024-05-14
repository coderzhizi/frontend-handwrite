const timeout = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time))
}

// 实现这个类
class SuperTask {
  constructor(paralleCount = 2) {
    this.paralleCount = paralleCount
    this.runningCount = 0
    this.tasks = []
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.tasks.push({
        task,
        resolve,
        reject,
      })

      this._run()
    })
  }

  _run() {
    while (this.runningCount < this.paralleCount && this.tasks.length) {
      const { task, resolve, reject } = this.tasks.shift()
      this.runningCount++
      task()
        .then(resolve, reject)
        .finally(() => {
          this.runningCount--
          // 正在运行的数量减一后，就可以继续执行其他任务
          this._run()
        })
    }
  }
}

const superTask = new SuperTask()
function addTask(time, name) {
  superTask
    .add(() => timeout(time)) // 这个add方法肯定返回的是一个Promise
    .then(() => {
      console.log(`任务${name}完成`)
    })
}

addTask(1000, 1)
addTask(500, 2)
addTask(3000, 3)
addTask(4000, 4)
addTask(5000, 5)
