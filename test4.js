const _quickSort = (array) => {
  const qs = (array, l = 0, r = array.length - 1) => {
    if (l >= r) {
      return
    }

    let i = l - 1,
      j = r + 1,
      mid = array[Math.floor((l + r) / 2)]
    while (i < j) {
      do i++
      while (array[i] < mid)
      do j--
      while (array[j] > mid)
      if (i < j) [array[i], array[j]] = [array[j], array[i]]
    }

    qs(array, l, j)
    qs(array, j + 1, r)
  }

  qs(array, 0, array.length - 1)
}
const arr = [0, -1, 1, -2, 2]
_quickSort(arr)
console.log(arr)
