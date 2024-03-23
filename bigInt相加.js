let a = "9007199254740991";
let b = "1234567899999999999";

function addBigInt(a, b) {
  const maxLength = Math.max(a.length, b.length)
  a = a.padStart(maxLength, 0)
  b = b.padStart(maxLength, 0)

  let t = 0
  let carry = 0
  let sum = ""
  for (let i = maxLength - 1; i >= 0; i--) {
    t = parseInt(a[i]) + parseInt(b[i]) + carry
    carry = Math.floor(t/10) // 进位
    sum = t % 10 + sum // 比如 4 + 8 = 12,此时留下2，进位下面处理
  }

  // 最高位加完后可能还有进位
  if (carry === 1) {
    sum = '1' + sum
  }

  return sum
}

console.log(addBigInt(a, b))