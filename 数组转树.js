const flatArray = [
  { id: '1', parentId: '', name: '根节点' },
  { id: '1-1', parentId: '1', name: '子节点1' },
  { id: '1-2', parentId: '1', name: '子节点2' },
  { id: '1-1-1', parentId: '1-1', name: '孙子节点1' },
  { id: '1-1-2', parentId: '1-1', name: '孙子节点2' },
  { id: '2', parentId: '', name: '另一个根节点' },
  { id: '2-1', parentId: '2', name: '子节点A' },
  { id: '2-1-1', parentId: '2-1', name: '孙子节点A1' },
];

const arrayToTree1 = array => {
  const tree = []
  const itemMap = new Map()

  array.forEach(item => [
    itemMap.set(item.id, { item, children: []})
  ])

  array.forEach(item => {
    const parentItem = itemMap.get(item.parentId)

    // 如果有parent，则将这个节点加到Map中这个parentId对应的value的children
    if (parentItem) {
      parentItem.children.push(itemMap.get(item.id))
      return
    }

    // 根节点，将其对应的value push进结果数组（因为对象存的是引用，而我们后序遍历就会接着对这个对象产生影响，如果其有children的话）
    tree.push(itemMap.get(item.id))
  })

  return tree
}
const arrayToTree2 = (array, pid, pidName = 'parentId') => {
  return array
    .filter(item => (item[pidName] === pid))
    .map(item => {
      item.children = arrayToTree2(array, item.id)
      return item
    })
}

console.log(arrayToTree1(flatArray));
console.log(arrayToTree2(flatArray, ''))

/**
 * 数组转树
 */
