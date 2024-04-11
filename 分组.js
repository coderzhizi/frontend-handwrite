const data = [
  { value: '1', groupId: 'a' },
  { value: '15', groupId: 'b' },
  { value: '7', groupId: 'a' },
  { value: '9', groupId: 'c' },
  { value: '6', groupId: 'b' },
  { value: '5', groupId: 'b' },
  { value: '11' },
  { value: '11', groupId: undefined },
  { value: '11', groupId: 'undefined' },
  { value: '11', groupId: false },
  { value: '11', groupId: null },
  { value: '11', groupId: 0 },
  { value: '11', groupId: '' }
]

const convertData = data => {  
  return data.reduce((pre, cur) => {
     const { value, groupId } = cur

     if (!groupId || groupId === 'undefined') {
      return pre
     }

     const index = pre.findIndex(item => item[0]?.groupId === groupId)
     // 没找到
     if (index === - 1) {
      return pre.concat([[cur]])
     }

     pre[index].push(cur)
     pre[index].sort((a, b) => a.value - b.value)

     return pre
  }, [])
}

console.log('result', convertData(data))