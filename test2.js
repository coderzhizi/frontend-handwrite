function calculateMovingAverage(prices, windowSize) {
  const converToAverageArray = (sums) => {
    return sums.map((item) => {
      const average = item / windowSize
      return Number.isInteger(average) ? average.toFixed(0) : average.toFixed(1)
    })
  }
  const reduceSum = (prices) =>
    prices.map((item) => Number(item)).reduce((pre, cur) => pre + cur, 0)

  if (prices.length < windowSize) {
    const priceSum = reduceSum(prices)
    console.log(priceSum, prices.length)
    console.log((priceSum / prices.length).toFixed(1))
    console.log((parseInt(priceSum) / prices.length).toFixed(1))
    const average = priceSum / prices.length
    return [Number.isInteger(average) ? average.toFixed(0) : average.toFixed(1)]
  }

  const initSum = reduceSum(prices.slice(0, windowSize))
  const priceSums = [initSum]
  let currentSum = initSum
  let startCalculateIndex = 0
  let currentIndex = windowSize
  while (
    currentIndex - startCalculateIndex === windowSize &&
    currentIndex < prices.length
  ) {
    currentSum = currentSum + Number(prices[currentIndex]) - Number(prices[startCalculateIndex])
    priceSums.push(currentSum)
    startCalculateIndex++
    currentIndex++
  }

  return converToAverageArray(priceSums)
}

console.log(calculateMovingAverage(['1.5', '2.0', '1.4', '1.5'], 3))
/** 请你编写一个 JavaScript 函数 calculateMovingAverage，该函数接收一个价格数组和一个时间窗口大小，返回一个数组，表示在给定时间窗口内的移动平均价格。
要求： 
 价格数组：输入的价格数组是一个包含连续交易日股票或期货收盘价的浮点数数组。
 时间窗口大小：窗口大小是一个正整数，表示用于计算移动平均线的连续交易日数。 
 移动平均计算：对于每一个时间窗口，计算窗口内价格的平均值。如果窗口大小为 n，则每个移动平均值由窗口内的 n 个连续价格计算得出。 边界处理：对于前 n−1 个价格，窗口内的价格数量小于 n，你可以选择跳过或者计算可用价格的平均值。
 算法效率：算法应该尽量高效，避免不必要的重复计算。
平均数保留一位小数。
请注意数组内的数字都以字符串的形式存在，请做好类型转换。
**/