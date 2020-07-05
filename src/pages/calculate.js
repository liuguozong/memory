    // 计算时间
    const calculate = function count(timE) {
        console.log(timE, '传的时间')
        const m = leftpad(Math.floor((timE / 60) % 60), 2, 0)
        const s = leftpad(Math.floor(timE % 60), 2, 0)
        return timE = m + `:` + s
    }

    // 第一个参数需要补齐的字符第二个补齐几个第三个参数用什么补齐
    function leftpad(str, len, ch) {
        str = String(str)
        let i = -1
        if (!ch && ch !== 0) ch = ' '
        len = len - str.length
        while (++i < len) {
            str = ch + str
        }
        return str
    }
    export default calculate