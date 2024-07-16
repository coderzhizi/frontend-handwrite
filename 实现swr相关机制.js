const cacheMap = new Map()

const swr = async (cacheKey, fetcher, cacheTime) => {
    let data = cacheMap.get(cacheKey) || { value: null, time: 0, promise: null }

    cacheMap.set(cacheKey, data)

    // 是否过期
    const isStaled = Date.now() - cacheTime

    if (isStaled && !data.promise) {
        data.promise = fetcher()
            .then(value => {
                data.value = value
                data.time = Date.now()
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                data.promise = null
            })
    }

    if (data.promise && !data.value) {
        await data.promise
    }

    return data.value
}