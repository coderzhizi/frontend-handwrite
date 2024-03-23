const url = "http://131.41.230.135:81/baseUser/pageQuery?page=1&pageSize=5"
const obj = {}
const strings = url.split('?')[1].split('&')
for (const str of strings) {
  const entry = str.split('=')
  obj[entry[0]] = entry[1]
}

console.log(obj)