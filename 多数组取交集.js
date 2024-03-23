const arr1 = [1, 2, 3, 3, 4, 5]
const arr2 = [1, 3, 6, 7]

const getIntersection = (arr, anOtherArr) => {
  const set1 = new Set(arr)
  const set2 = new Set(anOtherArr)

  return Array.from([...set1].filter(item => set2.has(item)))
}

console.log(getIntersection(arr1, arr2))