# 每周总结可以写在这里

# 重学css
## 选择器
### 选择器语法
1、简单选择器：
- *
- div svg|a
- .cls
- #id
- [attr=value]   （～ 、｜）
- :hover
- ::before

2、复合选择器
-  <简单选择器><简单选择器><简单选择器>
-  * 或者 div 必须写在最前面

3、复杂选择器
- <复合选择器><sp><复合选择器>
- <复合选择器>">"><复合选择器>
- <复合选择器>"~"<复合选择器>
- <复合选择器>"+"<复合选择器>
- <复合选择器>"||"<复合选择器>

BEM的css写法 block element???

### 选择器对优先级
- 简单选择器计数[行内，id，class，标签]
用一个四元数组表示：[0,2,1,1]
s = 0 * N^3 + 2 * N^2 + 1 * N^1 + 1

#### 练习：
- div#a.b .c[id=x]    属性标签和class一致
1、[0,1,3,1]
- #a:not(#b)    伪元素不计数
2、[0,2,0,0]  
- *.a                * 不计数
3、[0,0,1,1]
- div.a
4、[0,0,1,1]

### 伪类
1、链接/行为
- :any-link 所有的超链接'<a href=" ">'
- :link :visited
- :hover
- :active
- :focus
- :target  当hash里的锚点 # 等于target的时候

2、树结构
- :empty
- :nth-child()
- :nth-last-child()  
- :first-child :last-child :only-child

:last-child :only-child 浏览器要特殊处理，所以不推荐使用

3、逻辑型
- :not伪类
- :where :has

4、伪元素
::before
::after
::first-line(可用属性：font系列......)
是一个个渲染的

::first-letter  (可用属性：float、vertical-aligb、盒模型)



作业：编写一个match函数
function match(selector, element){
    return true
}

match("div #id.class", document.getElementById("id"))
