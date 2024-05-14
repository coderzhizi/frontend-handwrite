/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let ans = 0
  let i = 0
  let map = new Map()

  for (let j = 0; j < s.length; j++) {
      if (map.has(s[j])) {
          i = map.get(s[j]) + 1
      }

      map.set(s[j], j)

      ans = Math.max(ans, j - i + 1)
  }

  return ans
};

console.log(lengthOfLongestSubstring("abba"))