function rgb2hex(sRGB) {
  // 填写JavaScript
  let pattern = /rgb\((\d{1,3}\,\s*){2}\d{1,3}\)/

  if (pattern.test(sRGB)) {
    let nums = sRGB.match(/\d{1,3}/g)
    let result = '#'

    for (const key of nums) {
      let t = parseInt(key).toString(16)
      result += t.length === 1 ? '0' + t : t
    }

    return result
  }

  return sRGB
}
console.log(rgb2hex('rgb(255, 255, 255)'))
