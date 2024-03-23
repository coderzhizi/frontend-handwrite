/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * 个用于解决股票买卖问题的函数，允许用户在给定一系列连续天数的股票价格时，通过多次买卖来实现最大利润。
 * @param prices int整型一维数组 一个数字数组，其中的每个元素表示股票在连续天数内的价格
 * @return int整型
 */
function maxProfitWithMultipleTransactions( prices ) {
  // write code here
  let profit = 0, valley = prices[0], peak = prices[0], i = 0
  while (i < prices.length - 1) {
    while (i < prices.length - 1 && prices[i] >= prices[i + 1]) {
      i ++
    }

    valley = prices[i]
    while (i < prices.length - 1 && prices[i] <= prices[i + 1]) {
      i ++
    }
    peak = prices[i]
    profit += peak - valley
  }

  return profit
}
console.log(maxProfitWithMultipleTransactions([7,1,5,3,6,4]))