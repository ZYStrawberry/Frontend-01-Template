// 写一个正则表达式 匹配所有 Number 直接量
function number(val) {
    // 十进制 0  0. .0
    // 二进制 0B 0b
    // 十六进制 0X 0x
    // 八进制 0o 0O
    // 12.4E10  12.4e10
    // - +
    var par = '/ [0-1]+$ | [0-7]+$ | ([A-F][a-f][0-9])+$ | ^.?[0-9]+(\.?[0-9]+)?$ /g'
    return par.test(val)
}


// 写一个 UTF-8 Encoding 的函数
function UTF8Encoding(){

}



// 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号
function regularString(){

}
