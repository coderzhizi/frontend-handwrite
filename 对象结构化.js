const obj = {
  a: 1,
  b: {
    f: '2',
    g: '3',
  },
  c: [
    1,
    2,
    {
      e: true,
    },
  ],
}

const structObj = object => {
  let res = {}

  const convert = (item, path = []) => {
    if (!(item instanceof Object)) {
      res[path.join('')] = item
    }

    Object.entries(item).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        path.push(key)
        value.forEach((item, index) => {
          path.push(`[${index}]`)
          if (item instanceof Object) {
            path.push('.')
          }

          convert(item, path)
          path.pop()
        })
      } else if (value instanceof Object) {
        path.push(key + '.')
        convert(value, path)
        path.pop()
      } else {
        path.push(key)
        res[path.join('')] = value
      }

      path.pop()
    })
  }

  convert(object)
  return res
}

console.log(structObj(obj))

// 需要得到：{ a: 1, 'b.f': '2', 'b.g': '3', 'c[0]': 1, 'c[1]': 2, 'c[2].e': true}
