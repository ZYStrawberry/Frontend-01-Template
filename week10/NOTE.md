# 每周总结（待完善）
# 2020-06-11

**面试题：把一个元素的所有子元素逆序。12345 => 54321**
## 1、Range API
- 用range切割style标签
```
var fragment= range.extractContents();
range.insertNode(document.createTextNode('aaa'))
```

## 2、CSSOM
**需要更改css的时候都可以用cssom，但是并不是必须用。**
- document.styleSheets
- CSSStyleSheet
- CSSStyleSheet.prototype
- StyleSheet


```data
<link rel="stylesheet" title="x" href="data:text/css,p%7Bcolor:blue%7D">
```
### 其他普通rule 和 At-Rule

```
window.getComputedStyle(elt, pseudoElt);
- elt想要获取的元素
- pseudoElt可选，伪元素
```


## 3、cssom view


## 4、window
- window.scroll

**图片优化：**
webp > webGL = svg > jpg > png > gif

**参考链接**：https://developer.mozilla.org/en-US/docs/Web/API

# 2020-06-13
## tictactoe井字棋——6步走
### 规则
- 棋盘： 3 X 3方格
- 双方分别持有圆圈和叉两种棋子
- 双方交替落子
- 率先连成三子直线的一方获胜

### 实现
- 第一步：通过js 画一个棋盘 初始化9个方格
- 第二步：添加点击事件
- 第三步：交替落棋
- 第四步：判断输赢
- 第五步：智能化，预判输赢
- 第六步：智能交替，我方落棋，计算机自动落棋。


```
<html>
    <head>
        <title>TicTacToe井字棋</title>
    </head>
    <style>
        #box{
            width:350px;
        }

        #box div{
            width:100px;
            height:100px;
            background-color: pink;
            vertical-align: middle;
            display: inline-block;
            border:1px solid #fff;

            line-height: 100px;
            font-size: 50px;
            text-align: center;
            color:#fff;
        }
    </style>

    <body>
        <div id="box"></div>

        <script>
            let pattern = [
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ];

            let type = 2;

            // 第一步：初始化9个方格
            function show(){
                let box = document.getElementById('box')
                box.innerHTML = "";

                for(let i = 0; i < 3;i++){
                    for(let j = 0;j < 3;j++){
                        let div = document.createElement('div')

                        div.innerHTML = pattern[i][j]==2?"X":
                            pattern[i][j] == 1?"O":''

                        // 第二步：添加点击事件
                        div.addEventListener('click',()=>move(j,i));

                        box.appendChild(div)
                    }
                }
            
            }
            show(pattern)

            // 落棋
            function move(x,y){
                // x,y 的坐标和 i,j是相反的

                // 有值的时候不能再点击覆盖
                if(pattern[y][x] !== 0){
                    return false;
                }
                // 赋值
                pattern[y][x] = type

                if(check(pattern, type)){
                    alert(type == 2?"X is winner" : "O is winner")
                }
                // 交替落子
                type = 3 - type
                // 刷新显示
                show()

                if(willwin(pattern,type)){
                    console.log(type == 2?"X will winner" : "O will winner")
                }

                computerMove(pattern, type)

            }

            function computerMove(pattern, type){
                let p = bestChoice(pattern, type)
                if(p.point){
                    // 赋值
                    pattern[p.point[1]][p.point[0]] = type;
                
                }

                type = 3 - type;
                // 刷新显示
                show();
            }

            // 判断胜负
            // 用xy抽象?
            function check(pattern, type){
                // 3横3竖2斜 分成4类
                {// 横
                    for(let i = 0; i < 3;i++){
                        let win = true;
                        for(let j = 0;j < 3;j++){
                            if(pattern[i][j] !== type){
                                win = false;
                                break;
                            }
                            
                        }
                        if(win){
                            return true;
                        }
                    }
                }
                {// 竖
                    for(let i = 0; i < 3;i++){
                        let win = true;
                        for(let j = 0;j < 3;j++){
                            if(pattern[j][i] !== type){
                                win = false;
                                break;
                            }
                            
                        }
                        if(win){
                            return true;
                        }
                    }
                }
                {// xy相等的斜
                        let win = true;
                        for(let j = 0;j < 3;j++){
                            if(pattern[j][j] !== type){
                                win = false;
                                break;
                            }
                        }
                        if(win){
                            return true;
                        }
                }
                {// x=2-y的斜
                    let win = true;
                        for(let j = 0;j < 3;j++){
                            if(pattern[2-j][j] !== type){
                                win = false;
                                break;
                            }
                        }
                        if(win){
                            return true;
                        }
                }
                return false;
            }

            // 复制
            function clone(pattern){
                return JSON.parse(JSON.stringify(pattern))
            }


            function willwin(pattern, type){
                // 遍历所有的空位置
                for(let i = 0; i < 3;i++){
                    for(let j = 0;j < 3;j++){
                        if(pattern[i][j] !== 0){
                            continue
                        }

                        let tmp = clone(pattern);
                        tmp[i][j] = type;
                        if(check(tmp,type)){
                            return [j,i];
                        }
                    }
                }
                return null;
            }

            // 棋谱
            let openings = new Map();

            openings.set([
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ].toString() + "1",{
                point:[1,1],
                result:0
            })

            // openings.set([
            //     [0,0,0],
            //     [0,0,0],
            //     [0,0,0]
            // ].toString() + "1",{
            //     point:[1,1],
            //     result:0
            // })

            function bestChoice(pattern, type){
                if(openings.has(pattern.toString() + type)){
                    return openings.get(pattern, type)
                }

                let point = willwin(pattern, type);
                if(point){
                    return {
                        point:point,
                        result:1
                    }
                }

                //默认自己是输的 -1输，0平，1赢
                let result = -1;
                for(let i = 0; i < 3;i++){
                    for(let j = 0;j < 3;j++){
                        if(pattern[i][j] !== 0){
                            continue
                        }

                        let tmp = clone(pattern);
                        tmp[i][j] = type;

                        // 看对手的bestChoice
                        // 递归
                        let opp = bestChoice(tmp, 3-type)
                        //对手的result 和我的是相反的
                        if( - opp.result >= result){
                            point = [j,i];
                            result = -opp.result;
                        }
                    }
                }

                return {
                    point:point,
                    result:point ? result : 0
                }
            }

            
        </script>
    </body>

</html>
```

