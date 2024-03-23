// Array.prototype.my_reduce = function (callback, initialValue) {
//   if (!Array.isArray(this) || !this.length || typeof callback !== 'function') {
//       return []
//   } else {
//       // 判断是否有初始值
//       let hasInitialValue = initialValue !== undefined;
//       let value = hasInitialValue ? initialValue : tihs[0];
//       for (let index = hasInitialValue ? 0 : 1; index < this.length; index++) {
//           const element = this[index];
//           value = callback(value, element, index, this)
//       }
//       return value
//   }
// }

Array.prototype.myReduce = function(callback, initiValue) {
  if (!Array.isArray(this) || !this.length || typeof callback !== 'function') {
    return []
  }

  const hasInitiValue = initiValue !== undefined
  let value = hasInitiValue ? initiValue : this[0]

  for (let index = hasInitiValue ? 0 : 1; index < this.length; index++) {
    value = callback(value, this[index],  index, this)
  }

  return value
}

let arr = [1, 2, 3, 4, 5]
let res = arr.myReduce((pre, cur, i, arr) => {
  console.log(pre, cur, i, arr)
  return pre + cur
}, 10)
console.log(res)//25