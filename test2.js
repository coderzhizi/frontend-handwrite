/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    const map = new Map()

    const getLetterMapString = str => { // 得到每个字符串对应的各字母个数组成的字符串
        const letterMap = new Array(26).fill(0)
        for (const char of str) {
            letterMap[char.charCodeAt() - 'a'.charCodeAt()]++
        }
        return letterMap.join() // 默认逗号分隔
    }

    for (const str of strs) {
        const letterMapStrng = getLetterMapString(str)
        map.set(letterMapStrng, (map.get(letterMapStrng) || []).concat(str))
    }
    console.log(map)

    return Array.from(map.values())
};

console.log(groupAnagrams(["bdddddddddd","bbbbbbbbbbc"]))