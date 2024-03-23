const arr1 = [1, [2, 3, 4, [5, 6, 7]], 8]
const arr2 = [1, [2, 3, 4], [5, [6, [7, 8, 9, [10, 11, 12, [13, 14]]]]], [15]];

const flatArray = array => {
  const result = [];

  array.forEach(item => {
    if (Array.isArray(item)) {
      result.push(...flatArray(item)); // 使用扩展运算符将结果展开并添加到 result 中
      return;
    }

    result.push(item);
  });

  return result;
};

// 非递归实现
const flatArray2 = array => {
  
}

const flatArray3 = array => {
  return array.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatArray(cur) : cur)
  }, [])
}

const flatArray4 = array => {
  return array.toString().split(',').map(Number)
}

const flatArray5 = array => {
  return JSON.parse('[' + JSON.stringify(array).replace(/\[|\]/g, '') + ']')
}

console.log(flatArray(arr2));
console.log(flatArray3(arr2));
console.log(flatArray4(arr2));
console.log(flatArray5(arr2))