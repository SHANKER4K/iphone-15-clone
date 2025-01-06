var toNum = function (a = "") {
    const devider = parseInt(a.length / parseInt(a.length / 10))
    const devidedStirng = a.split("").reduce((prev, cur, i) => {
        return i % devider == 0 ? (prev + "-" + cur) : prev + cur
    }).split("-").map((str, i) => {
        return str.split("").map((val, i) => {
            return val * 2 ** ((val.length - i - 1) * devider)
        })
    })
    return devidedStirng
    // return a.split('').map((val, i) =>
    //     val * 2 ** (a.length - i - 1)
    // ).reduce((prev, cur) => {
    //     return prev + cur
    // }, 0)
};

var addBinary = function (a, b) {
    return BigInt(parseInt(BigInt(a), 2))
};

var reducer = (arr = []) => {

}

var permute = function (nums = []) {
    let returnedArr = []
    let subArr = []
    for (let b = 0; b < nums.length; b++) {
        const elementb = nums[b];
        for (let i = 0; i < nums.length; i++) {
            const elementi = nums[i];
            let result = []
            result.push(elementi)
            for (let j = 0; j < nums.length; j++) {
                const elementj = nums[j];

                if (i == j)
                    continue
                else
                    result.push(elementj)
            }
            subArr.push(result)
        }
    };
    return subArr
}
// console.log(addBinary("10100000100100110110010000010101111011011001101110111111111101000000101111001110001111100001101", "110101001011101110001111100110001010100001101011101010000011011011001011101111001100000011011110011"));
console.log(permute([1, 2, 3]));
