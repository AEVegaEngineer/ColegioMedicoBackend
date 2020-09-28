function countDigits(str) {
    console.log(str);
    return Array.prototype.reduce.call(
        str,
        function (acc, val) {
            return val.charCodeAt(0) > 47 && val.charCodeAt(0) < 58
                ? acc + 1
                : acc;
        },
        0
    );
}
module.exports = { countDigits };
