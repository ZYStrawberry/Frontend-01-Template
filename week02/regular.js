   console.log(number('01010101'))
    console.log(regularString('01010101di\n\t\e\\d\d\dsdaascfax对不起我的好奇         dwaahdiah'))
// 写一个正则表达式 匹配所有 Number 直接量
    function number(val) {
        // 十进制 0  0. .0
        // 二进制 0B 0b
        // 十六进制 0X 0x
        // 八进制 0o 0O
        // 12.4E10  12.4e10
        // - +
        var par = /^(0B|0b)?[0-1]+$|^(0O|0o)?[0-7]+$|^(0X|0x)?([A-F][a-f][0-9])+$|^.?[0-9]+(\.?[0-9]+)?$|(\d+\.)/g
      
        return par.test(val)
    }


// 写一个正则表达式，匹配所有的字符串直接量
    function regularString(str){
        // "(?:[^"\\n\r])|
        // \\(?:['"\\bfnrtv])|
        // [^'"\\bfnrtv[0-9]xu\n\r\u2028\u2029]|
        // \\x[0-9a-fA-F]{2}|
        // \\u[0-9a-fA-F]{4}|
        // \\[\n\r\u2028\u2029]|\n\r)"

        var par = /"(?:[^"\\\n\r]|\\(?:['"\\bfnrtv])|[^'"\\\bfnrtv[0-9]xu\n\r\u2028\u2029]|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[\n\r\u2028\u2029]|\n\r)*"|'(?:[^"\\\n\r]|\\(?:['"\\bfnrtv])|[^'"\\\bfnrtv[0-9]xu\n\r\u2028\u2029]|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[\n\r\u2028\u2029]|\n\r)*'/g;
        return par.test(str)

    }
    
    // StringLiteral :: 

    // " 
        // SourceCharacter(源字符)不包含 " \ <LF><CR><LS><PS>
        //     <LS> 0x2028 
        //     <PS> 0x2029
        //      \ (' " \ b f n r t v )
                //1  SourceCharacter [^'"\\bfnrtv[0-9]xu<LF><CR><LS><PS>] 
                //2  0 [lookahead ∉ DecimalDigit]
                //3  (\x [0-9a-fA-F] {2} ) 
                //4  (\u [0-9a-fA-F]{4}     \u{ HexDigits but only if MV of HexDigits ≤ 0x10FFFF })
                    
        
            // \\[\n\r\u2028\u2029]|\n\r
            //  \  <LF>  <CR>[lookahead ≠ <LF>] <LS> <PS> <CR><LF>
    // " 

    //  '
    //     SourceCharacter 不包含 " \ <LF><CR><LS><PS>
    //     <LS> 
    //     <PS> 
    //     \ CharacterEscapeSequence 0 [lookahead ∉ DecimalDigit] HexEscapeSequence UnicodeEscapeSequence 
    //     \  <LF>  <CR>[lookahead ≠ <LF>] <LS> <PS> <CR><LF>
    //  ' 


            // LineContinuation :: 
            //     \ LineTerminatorSequence (行结束符序列)

            // EscapeSequence :: 
            //     CharacterEscapeSequence(字符转义序列) 0 [lookahead ∉ DecimalDigit] 
            //     HexEscapeSequence (十六进制转义序列)
            //     UnicodeEscapeSequence(Unicode转义序列)

            // LineTerminatorSequence::
            //     <LF> 
            //     <CR>[lookahead ≠ <LF>]
            //     <LS> 
            //     <PS> 
            //     <CR><LF>


// winter：https://github.com/wintercn/JSinJS/blob/master/source/LexicalParser.js 
// StringLiteral:
// /"(?:[^"\n\\\r\u2028\u2029]|
// \\(?:['"\\bfnrtv\n\r\u2028\u2029]|
// \r\n)|
// \\x[0-9a-fA-F]{2}|
// \\u[0-9a-fA-F]{4}|
// \\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029])*"|

// '(?:[^'\n\\\r\u2028\u2029]|
// \\(?:['"\\bfnrtv\n\r\u2028\u2029]|
// \r\n)|
// \\x[0-9a-fA-F]{2}|
// \\u[0-9a-fA-F]{4}|
// \\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029])*'/
