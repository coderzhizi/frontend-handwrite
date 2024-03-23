const isEqualObject = (o1, o2) => {
  if (Object.prototype.toString.call(o1) !== Object.prototype.toString.call(o2)) {
    return false
  }

  // 如果是对象则继续比较
  if (o1 !== null && typeof o1 === 'object') {
    const keys1 = Object.keys(o1)
    const keys2 = Object.keys(o2)

    if (keys1.length !== keys2.length) {
      return false
    }

    return keys1.every(key => isEqualObject(o1[key], o2[key]))
  }

  return o1 === o2
}

const o1 = { a: 1, b: { c: 2 } };
const o2 = { a: 1, b: { c: 2 } };
console.log(isEqualObject(o1, o2))