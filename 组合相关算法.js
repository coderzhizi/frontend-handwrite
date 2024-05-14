function combinationSum(candidates, target) {
  const result = []

  function backtrack(start, target, path) {
    if (target === 0) {
      result.push([...path])
      return
    }
    if (target < 0) {
      return
    }
    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i])
      backtrack(i, target - candidates[i], path)
      path.pop() // 回溯
    }
  }

  candidates.sort((a, b) => a - b) // 排序以便提前终止搜索
  backtrack(0, target, [])
  return result
}

// 示例用法
const candidates = [2, 3, 6, 7]
const target = 7
console.log(combinationSum(candidates, target))
