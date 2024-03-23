function myNew(constructor, ...args) {
  // 使用参数中的对象作为返回的对象的原型
  const instance = Object.create(constructor.prototype)
  const result = constructor.apply(instance, args)

  return result instanceof Object ? result : instance
}

// 举例：定义一个构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// 使用自定义的myNew关键字来创建实例
const person = myNew(Person, 'Alice', 25);
console.log(person);