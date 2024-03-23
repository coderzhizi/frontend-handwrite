//求n个a-b之间的随机数
function randomNumbersInRange(a, b, n) {
  if ((b - a + 1) < n) {
      throw new Error("范围不够");
  }

  let numSet = new Set()

  while (numSet.size < n) { // Set对象长度是用size
    numSet.add(Math.floor(Math.random() * (b - a + 1) + a))
  }

  return [...numSet]
}

// 测试函数
let a = 1;
let b = 10;
let n = 8;
console.log(randomNumbersInRange(a, b, n));
