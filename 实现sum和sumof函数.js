// sum(1, 2, 3)(4).sumOf() = 10
// sum(2)(3)(5, 6).sumOf() = 16

function sum(...rest) {
  let args = [...rest]
  let fn = (...otherRest) => {
    args = args.concat(otherRest)
    return fn
  }

  fn.sumOf = () => args.reduce((pre, cur) => pre + cur, 0)

  return fn
}

console.log(sum(1, 2, 3)(4)(5, 6).sumOf())