const tree = [
  {
    id: '1',
    parentId: '',
    name: '根节点',
    children: [
      {
        id: '1-1',
        parentId: '1',
        name: '子节点1',
        children: [
          { id: '1-1-1', parentId: '1-1', name: '孙子节点1', children: [] },
          { id: '1-1-2', parentId: '1-1', name: '孙子节点2', children: [] },
        ],
      },
      { id: '1-2', parentId: '1', name: '子节点2', children: [] },
    ],
  },
  {
    id: '2',
    parentId: '',
    name: '另一个根节点',
    children: [
      {
        id: '2-1',
        parentId: '2',
        name: '子节点A',
        children: [
          { id: '2-1-1', parentId: '2-1', name: '孙子节点A1', children: [] },
        ],
      },
    ],
  },
]

const convertToArray = (tree) => {
  const result = []

  tree.forEach(item => {
    result.push(item)

    if (item.children) {
      result.push(...convertToArray(item.children))
    }
  })

  return result
}

console.log((convertToArray(tree)))


