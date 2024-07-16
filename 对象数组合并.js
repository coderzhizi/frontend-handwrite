const testArr = [
    { '0': 1 },
    { '1': 2 },
    { '2': 3 },
    { '3': 4 },
    { '4': 5 }
]

const merge = (arr) => {
    return arr.reduce((pre, cur) => ({ ...pre, ...cur }), {})
}

const merge2 = (arr) => {
    const mergeObj = {}
    arr.forEach(item => {
        Object.keys(key => {
            mergeObj[key] = item[key]
        })
    })

    return mergeObj
}

console.log(merge(testArr))