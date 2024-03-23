function myInstanceof(obj, constructor) {
  if (typeof obj !== 'object' && obj === null) {
    return false
  }

  let proto = Object.getPrototypeOf(obj)

  while (proto) {
    if (proto === constructor.prototype) {
      return true
    }

    proto = Object.getPrototypeOf(proto)
  }

  return false
}

function MyClass(value) {
  this.value = value;
}

let obj1 = new MyClass(10);
let obj2 = { value: 20 };

console.log(myInstanceof(obj1, MyClass)); // true
console.log(myInstanceof(obj2, MyClass)); // false