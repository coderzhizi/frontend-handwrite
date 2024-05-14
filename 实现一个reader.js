Array.prototype.getReader = function () {
  if (!Array.isArray(this)) {
    return 'error'
  }

  let index = 0

  const read = (n = 1) => {
    if (Number.isInteger(n) && n > 0) {
      return this.slice(index, (index += n))
    }

    throw new Error('error')
  }

  const reader = {
    read,
  }

  return reader
}

const arr = [1, 2, 3, 4, 5, 6]
const reader = arr.getReader()
console.log(reader.read('1')) //error
console.log(reader.read()) // [1]
console.log(reader.read(1)) //[2]
console.log(reader.read(2)) //[3，4]
console.log(reader.read(3)) //[5，6]
console.log(reader.read()) //[]
console.log(arr) //[1，2，3，4，5，6]
