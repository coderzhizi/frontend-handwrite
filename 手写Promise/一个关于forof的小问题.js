const arr = [1, 2, 3, 4, 5]

for (const item of arr) {
  console.log(item)
  arr.shift(item)
}

console.log(arr) // [4, 5]  