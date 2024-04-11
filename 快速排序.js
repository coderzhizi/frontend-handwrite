/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
  const set = new Set()

  for (const num of nums) {
    set.add(num)
  }

  let ans = 0

  for (const num of nums) {
    if (!set.has(num - 1)) { // 找到一个起点
      let startNum = num
      let tempLen = 1
      while (set.has(startNum + 1)) {
        startNum++
        tempLen++
      }
      ans = Math.max(ans, tempLen)
    } 
  }

  return ans
};

console.log(longestConsecutive([0,3,7,2,5,8,4,6,0,1]))