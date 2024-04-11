// Array.prototype.flatten = function(depth) {
//     return this.reduce((pre, cur) => {
//         return pre.concat((Array.isArray(this) && depth > 1) ? cur.flatten(depth - 1) : cur) // concat相当于自动flat了一层
//     }, [])
// };

// 示例用法
var nestedArray = [1, 2, [3, 4, [5, 6]], 7, [8, 9]];
var flattenedArray = nestedArray.flatten(1); // 指定扁平化的层数为 2
console.log(flattenedArray);

function flatten(depth) {
    return this.reduce((pre, cur) => {
        return pre.concat((Array.isArray(cur) && depth > 1) ? cur.flatten(depth - 1) : cur)
    }, [])
}

