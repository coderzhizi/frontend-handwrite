function formatNumberWithThousandSeparator(num) {
  if (typeof num !== 'number' || isNaN(num)) {
    throw new Error('Invalid input, expected a number')
  }

  let result = ''
  const [integerPart, pointPart] = num.toString().split('.')
  for (let i = integerPart.length - 1; i >= 0; i--) {
    result = integerPart[i] + result
    if (i % 3 === 0 && i !== 0) {
      result = ',' + result
    }
  }

  if (!pointPart.length) return result

  result = result + '.'

  for (let i = 0; i < pointPart.length; i++) {
    result = result + pointPart[i]
    if (i % 3 === 0 && i !== pointPart.length - 1) {
      result = result + ','
    }
  }

  return result
}

function formatNumberWithThousandSeparator2(num) {
  return num.toLocaleString()
}

console.log(formatNumberWithThousandSeparator(123456789.1234)) // 123,456,789.1,234
console.log(formatNumberWithThousandSeparator2(123456789.1234)) // 123,456,789.123
