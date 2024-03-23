const sortVersion = (array) => {
  // 定义一下sort的排序规则
  array.sort((a, b) => { 
    const aParts = a.split('.')
    const bParts = b.split('.')
    const maxLength = Math.max(aParts.length, bParts.length)

    for (let index = 0; index < maxLength; index++) {
      const aPart = parseInt(aParts[index] || '0')
      const bPart = parseInt(bParts[index] || '0')

      if (aPart !== bPart) {
        return aPart > bPart ? 1 : -1
      }
    }

    return 0
  })

  return array
}

console.log(sortVersion(["1.2.3", "1.0.0", "2.0.0", "1.10.0"]))
console.log(sortVersion(["1.2.3", "1.0.0", "2.0.0", "1.10.0", "1.2.3"]))
console.log(sortVersion(["1", "1.0", "1.0.0", "1.0.0.0"]))