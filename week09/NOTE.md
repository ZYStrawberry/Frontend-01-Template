# 每周总结

———————— 20200604 ————————

## 动画与绘制
### 1、Animation
- @keyframes定义   关键帧
- animation：使用

帧的概念：
液晶屏幕显示需要不断刷新，眼睛感觉不到刷新，会觉得画面是来连续的。
电子书的屏幕是不需要刷新的。
只要超过一秒60次以上的刷新，眼睛就感觉不到刷新，比较平滑。

#### animation
- animation-name 时间曲线
- animation-duration 动画的时长
- aanimation-timing-function 动画的时间曲线
- animation-delay 动画开始前的延迟
- animation-iteration-count 动画的播放次数
- animation-direction 动画的方向

#### transition
- transition-property 要变换的属性
- transition-duration 变换的时长
- transition-timing-function 时间曲线
- transition-delay 延迟

## 2、三次贝塞尔曲线 cubic-bezier(.73,-0.37,.77,1.21)
- cubic-bezier前两个参数和后两个是第一控制点/第二个控制点的坐标
- 网站链接：www.cubic-bezier.com

### 贝塞尔曲线的拟合
实现：ax^2+bx+c一元二次方程
v 是速度，g 重力加速度，t 时间

## 3、渲染
- 颜色
- 形状

#### 案例：使用webGL画的图形
main函数里就是通过位置（x,y）判断一个点是什么颜色
200*200=40000个点
GPU & CPU

### 3.1 颜色
太阳光、混合光、单色光（激光）
人眼的识别颜色

#### CMYK & RGB (颜色模式)
RGB三原色：红、绿、蓝
眼睛只能看到三种颜色，其他的都是脑子混合的
红绿色盲、皮皮虾（17种颜色？）

CMYK颜料里的颜色，打印的颜色
CMY：青、品红、黄 
K：黑


#### HSL& HSV (颜色模式)
- hue色度 saturation纯度 lightness亮度
- hue色度 saturation纯度 value色值


HSL是一种将RGB色彩模型中的点在圆柱坐标系中的表示法。这两种表示法试图做到比基于笛卡尔坐标系的几何结构RGB更加直观。
HSL即色相、饱和度、亮度（英语：Hue, Saturation, Lightness）。
色相（H）是色彩的基本属性，就是平常所说的颜色名称，如红色、黄色等。
饱和度（S）是指色彩的纯度，越高色彩越纯，低则逐渐变灰，取0-100%的数值。
明度（V），亮度（L），取0-100%。


HSV(Hue, Saturation, Value)是根据颜色的直观特性由A. R. Smith在1978年创建的一种颜色空间, 也称六角锥体模型(Hexcone Model)。
这个模型中颜色的参数分别是：色调（H），饱和度（S），明度（V）。


案例demo：使用hsl,按扭渐变

### 3.2 形状 https://www.w3.org/Graphics/SVG/
- data uri + svg

#### 作业：css property分类（去掉webkit、svg单独分出来、other是辅助性的）

#### 需要简单学习的部分：
- webGL
- svg


———————— 20200606 ————————
## 重学HTML

### 1、HTML的定义：XML & SGML

#### 1.1、DTD & XML namespace

DTD： https://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd

<!--================ Character mnemonic entities =========================-->

<!ENTITY % HTMLlat1 PUBLIC
   "-//W3C//ENTITIES Latin 1 for XHTML//EN"
   "xhtml-lat1.ent">
%HTMLlat1;

<!ENTITY % HTMLsymbol PUBLIC
   "-//W3C//ENTITIES Symbols for XHTML//EN"
   "xhtml-symbol.ent">
%HTMLsymbol;

<!ENTITY % HTMLspecial PUBLIC
   "-//W3C//ENTITIES Special for XHTML//EN"
   "xhtml-special.ent">
%HTMLspecial;


1、https://www.w3.org/TR/xhtml1/xhtml-lat1.ent
-nbsp （no-break-space)不换行空格 &nbsp;

2、https://www.w3.org/TR/xhtml1/xhtml-symbol.ent


3、https://www.w3.org/TR/xhtml1/xhtml-special.ent
需要转义，一定要记住的四个
- quot 双引号 "\u0022"
- amp &
- lt <
- gt >

#### 1.2、namespace

### 2、HTML标签——语义

#### 模仿网址: http://static001.geekbang.org/static/time/quote/World_Wide_Web-Wikipedia.html
- aside 非主体的东西，main之外的不重要的东西，并不是指侧边栏。
- main

有序ol & 无序ul & 自定义dd
- 有序：有关系，上下文连接的
- 无序：改变顺序没关系的。对语句的理解没有关系

引用文章名<cite></cite>、
引用文章内容<quote></quote>
<time></time>
<data></data>
<address></address>
<samp><pre></pre></samp>

嵌套关系标准：https://html.spec.whatwg.org/multipage/parsing.html/#tree-construction

### 3、合法元素
### 4、字符引用

## 重学DOM
### 1、导航类操作
### 2、修改操作
### 3、高级操作

