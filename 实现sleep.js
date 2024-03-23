const sleep = time => {
  const startTime = (new Date).getTime()

  while ((new Date).getTime() - startTime < time) {
    continue
  }
}

console.log(1)
sleep(2000)
console.log(2)