const checkObjectType = value => Object.prototype.toString.call(value).slice(8, -1)
console.log(checkObjectType([1, 2]))
console.log(checkObjectType(() => {}))
console.log(checkObjectType(null))
console.log(checkObjectType(undefined))
console.log(checkObjectType(Symbol()))
console.log(checkObjectType({}))
console.log(checkObjectType(new Date()))
console.log(checkObjectType(new RegExp()))

const checkAllType = value => (typeof value !== 'object') ? typeof value : checkObjectType(value)
console.log('-----------------------------')
console.log(1)
console.log(checkAllType([1, 2]))
console.log(checkAllType(() => {}))
console.log(checkAllType(null))
console.log(checkAllType(undefined))
console.log(checkAllType(Symbol()))
console.log(checkAllType({}))
console.log(checkAllType(new Date()))
console.log(checkAllType(new RegExp()))