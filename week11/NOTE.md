# 每周总结

## 红绿灯
一个路口的红路灯，会按照绿灯亮10秒，黄灯亮2秒，红灯亮5秒的顺序无限循环。JavaScript代码来控制这个红绿灯。


## 寻路算法
两种搜索：深搜、广搜

寻路算法使用的是广搜，先找一层，再通过这一层展开。
深搜和递归比较像

已知一个起点，终点，要从起点走到终点，找到一条最佳路径。
格子有三种状态：白色，没有走过的格子；
紫色，通过蓝色格子展开的格子；
蓝色，已经占有的格子；

#### 步骤一：能够从起点走到终点，判断是否能走通。

`
<style>
    .cell {
        display:inline-block;
        width:6px;
        height:6px;
        background-color: #ccc;
        border-bottom:solid 1px white;
        border-right:solid 1px white;
        vertical-align: middle;
    }
    #container{
        width:701px;
    }
</style>
<div id="container"></div>
<button onclick="localStorage.map = JSON.stringify(map)">save</button>
 
<script>
    var map = localStorage.map ? JSON.parse(localStorage.map) : new Array(10000).fill(0);
    let container = document.getElementById("container");
    for(let y = 0; y < 100; y++) {
        for(let x = 0; x < 100; x++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
 
            if(map[y * 100 + x] === 1)
                cell.style.backgroundColor = 'orange';
 
            cell.addEventListener("mouseover", () => {
                if(mouse) {
                    if(clear) {
                        cell.style.backgroundColor = '';
                        map[y * 100 + x] = 0;
                    } else {
                        cell.style.backgroundColor = 'orange';
                        map[y * 100 + x] = 1;
                    }
                }
                     
            })
 
            container.appendChild(cell);
        }
    }
    let mouse = false;
    let clear = false;
 
    document.addEventListener('mousedown', e => {
        mouse = true
        clear = (e.which === 3);
    })
    document.addEventListener('mouseup', ()=> mouse = false)
 
    document.addEventListener('contextmenu', e => e.preventDefault())
 
    function sleep(t){
        return new Promise(function(resolve){
            setTimeout(resolve, t);
        });
    }    
    
    async function findPath(map, start, end) {
        // 怕map被污染
        map = map.slice()
        // 起始点先入队列
        let queue = [start]

        async function insert([x,y]){
            // 出界了不能push
            if(x >= 100 || y >= 100 || x < 0 || y < 0)
                return ;
            // 遇到障碍了，不能push
            if(map[100*y+x] !== 0)
                return ;

            // push之前标记一下节点
            map[100*y+x] = 2
            container.children[100*y+x].style.backgroundColor = 'lightgreen';

            await sleep(5)
            queue.push([x,y])
        }

        // 只要队列长度不为0，就把它的上下左右push进去
        while(queue.length) {
            // shift() 方法用于把数组的第一个元素从其中删除,并返回第一个元素的值。
            let [x,y] = queue.shift()
            // console.log(x,y)
            // 找到终点了
            if(x == end[0] && y == end[1]){
                return true;
            }
            // 删掉一个节点，加入四个节点
            await insert([x-1,y])
            await insert([x+1,y])
            await insert([x,y-1])
            await insert([x,y+1])
        }

        return false;
        
    }
</script>
`

#### 步骤二：找到起点到终点的路径

`async function findPath(map, start, end) {
        // 怕map被污染
        map = map.slice()
        // 起始点先入队列
        let queue = [start]

        async function insert([x,y],pre){
            // 出界了不能push
            if(x >= 100 || y >= 100 || x < 0 || y < 0)
                return ;
            // 遇到障碍了，不能push
            if(map[100*y+x] !== 0)
                return ;

            // push之前标记一下节点
            // pre 是上一个节点的坐标
            map[100*y+x] = pre
            container.children[100*y+x].style.backgroundColor = 'lightgreen';

            await sleep(1)
            queue.push([x,y])
        }

        // 只要队列长度不为0，就把它的上下左右push进去
        while(queue.length) {
            // shift() 方法用于把数组的第一个元素从其中删除,并返回第一个元素的值。
            let [x,y] = queue.shift()
            // console.log(x,y)
            // 找到终点了
            if(x == end[0] && y == end[1]){
                let path = []
                while(x !== start[0] || y !== start[1]){
                    path.push([x,y])
                    container.children[100*y+x].style.backgroundColor = 'pink';
                    [x,y] = map[y*100 + x]
                } 
                return path;
            }
            // 删掉一个节点，加入 上下左右 四个节点
            await insert([x-1,y],[x,y])
            await insert([x+1,y],[x,y])
            await insert([x,y-1],[x,y])
            await insert([x,y+1],[x,y])
        }

        return null;
        
    }
`

#### 步骤三：优化最佳路径

`
            // 加上左上，右上，左下，右下 四个节点
            
            await insert([x-1,y-1],[x,y])
            await insert([x+1,y-1],[x,y])
            await insert([x-1,y+1],[x,y])
            await insert([x+1,y+1],[x,y])

            // 8个点加起来的整体的形状是正方形的
            // 所以 lightgreen 的走向总是有直角在的
`



