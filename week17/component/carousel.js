// enableGesture

export class Carousel {
    constructor(config){
        // console.log(config)
        this.children = [];
        this.attributes = new Map();
        this.properies = new Map();
    }

    setAttribute(name, value){ // attribute
        // this[name] = value
        this.root.setAttribute(name, value)

        if(name.match(/^on([\s\S]+)$/)){
            let eventName = RegExp.$1.replace(/^[/s/S]/, c=>c.toLowerCase());
            this.addEventListener(eventName, value)
        }

        if(name === "enableGesture") {
            enableGesture(this.root)
        }
    }

    appendChild(child){ // children
        this.children.push(child)
    }

    render(){
        let children = this.data.map(url => {
            let element = <img src={url} />
            element.addEventListener("dragstart", event => event.preventDefault())
            return element;
        })
        
        let root = <div class="carousel">
                        { children }
                    </div>

        let position = 0;

        let nextpic = () => {
            // 先计算出下一张的位置
            let nextPosition = (position + 1) % this.data.length;
            
            // 一次移动两张
            let current = children[position];
            let next = children[nextPosition];
          
            // 起始位置 0  100
            // ease 0s 可以用 none 代替
            current.style.transition = "ease 0s"
            next.style.transition = "ease 0s"

            current.style.transform = `translateX(${ -100 * position}%)`
            next.style.transform = `translateX(${100 -100 * nextPosition}%)`              


            // transition生效需要时间，所以需要加个setTimeout时间间隔
            setTimeout(() => {
                current.style.transition = ""; // "" means use css rules
                next.style.transition = "";
                 // 终点位置  -100 0
                current.style.transform = `translateX(${-100 -100 * position}%)`
                next.style.transform = `translateX(${-100 * nextPosition}%)`
                
                // 对数据的长度取余来实现循环
                // position+=1; 
                console.log(position)
                position = nextPosition
            },16);// 浏览器 一帧16ms
            
            // 循环
            setTimeout(nextpic, 2000)
        }

        // nextpic(); // 第一张没有了显示时间
        // 第一张显示2秒
        setTimeout(nextpic, 2000)
        
        return root;
    }

    mountTo(parent){
        this.render().mountTo(parent)
    }
}