// const deepClone = (value, map = new Map()) => {
//   if (value instanceof Object) {
//     return value
//   }

//   if (map.get(value)) {
//     return map.get(value)
//   }

//   let cloneObject = Array.isArray(value) ? [] : {}
//   map.set(value, cloneObject)

//   for (const key in value) {
//     cloneObject[key] = deepClone(value[key], map)
//   }

//   return cloneObject
// }

const obj = { a: 1 }
obj.b = obj
const deep = deepClone


function deepClone (obj, map = new Map()) {
  if (!(obj instanceof Object)) return obj

  if (map.get(obj)) return map.get(obj)

  let cloneObj = Array.isArray(obj) ? [] : {}
  map.set(obj, cloneObj)
  for (let key in obj) {
    cloneObj[key] = deepClone(obj[key], map)
  }

  return cloneObj
}