<!-- 2020-04-18 -->

# Unicode Blocks 字符集 （ 集合了世界各国的字符 ）
    A 65 码点
    a 97 

    ·参考网站：https://www.fileformat.info/info/unicode/block/index.htm
        Basic Latin	U+0000 —— U+007F	(128个ASCII字符）

    · unicode官网：https://home.unicode.org/emoji/emoji-frequency/


# inputElement:
<!-- http://www.fileformat.info/info/unicode/category/index.htm -->
    
    ·WhiteSpace:: 
        <TAB> Character Tabulation (U+0009) 制表符 打字机时代 4位/8位
        <VT> Line Tabulation (U+000B)
        <FF> Form Feed (U+000C)
        <SP> Space  (U+00020)
        <NBSP> No-Break Space (&nbsp;) (U+000A0)
        <ZWNBSP> zero width no-break space (U+FEFF)
        <USP> any other Unicode "space_Swparator" code point

        
        BOM(BIt order mask)?

    ·LineTerminator（换行）:
        <LF>
        <CR>
        <LS>
        <PS>


    ·Comment（注释）:
        单行注释     //
        多行注释：/*  */

    ·Token :: 
        ·Punctuator
        ·IdentifierName
           
            Identifier
            Keywords； 变量名(不能包含关键字)、属性名(能包含关键字)
                undefined不是关键字  null不能被定义

            Future reserved Keywords: enum


         
        ·Literal (NumericLiteral,StringLiteral) 
            
            Number 
                定义：
                NumericLiteral ::
                    DecimalLiteral 
                    BinaryIntegerLiteral            OctalIntegerLiteral
                    HexIntegerLiteral

                    
                IEEE 754 Double Foalt
                    sign(1)
                    Exponent(11)
                    Fraction()
                Grammar
                    0b111
                    0O10
                    0xff
                    12.3E10
                    .3
                    0.
                    .0

                Math.abs(0.1+0.2-0.3) <= Nunber.EPSILON

            String
                character
                Code Point 
                Encoding(编码)
                    a  97 01100001

                    ASCII

                    Unicode
                        utf-8 utf-16 utf-32

                    UCS U+0000 - U+FFFF

                    GB (国标 - 汉字)
                        GB2312
                        GBK(GB13000)
                        GB18030

                    ISO-8859 ()

                    BIG5

function UTF8_Encoding(){
    
}

                ·grammar

                    转义 \x10 、\u000A
                    \b \t \n \v \f \r \" \' \\
            
            Boolean
                true false
            
            Null

            Undefined


        除号和正则











