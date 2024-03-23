const deepClone = (value, map = new Map()) => {
  if (value instanceof Object) {
    return value
  }

  if (map.get(value)) {
    return map.get(value)
  }

  let cloneObject = Array.isArray(value) ? [] : {}
  map.set(value, cloneObject)

  for (const key in value) {
    cloneObject[key] = deepClone(value[key], map)
  }

  return cloneObject
}

const obj = { a: 1 }
obj.b = obj
console.log(deepClone(obj))