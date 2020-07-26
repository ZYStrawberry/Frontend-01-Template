import {createElement, Text, Wrapper} from "./createElement";
import {Carousel} from "./carousel.view";


/*
class MyComponent{
    constructor(config){
        // console.log(config)
        this.children = [];
        // this.root = document.createElement('div');
    }

    setAttribute(name, value){ // attribute
        this.root.setAttribute(name, value)
    }

    appendChild(child){ // children
        this.children.push(child)
    }
    set title (child){
        this.properties.set('title', value)
    }

    render(){
        return <article>
            <h2>{this.properties.get('title')}</h2>
            <header>header</header>
            {this.slot}
            <footer>footer</footer>
        </article>
    }

    mountTo(parent){
        this.slot = <div></div>
        for(let child of this.children){
            debugger
            // child.mountTo(this.root)
            this.slot.appendChild(child)
        }
        console.log(this.render())
        this.render().mountTo(parent)
        // parent.appendChild(this.root);
        // console.log(this.children)
        
    }
}
*/

/*
class Carousel {
    constructor(config){
        // console.log(config)
        this.children = [];
        this.attributes = new Map()
        this.properies = new Map()
    }

    setAttribute(name, value){ // attribute
        this[name] = value
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
}*/


// let component = <div id="a" cls="b" style="width:100px;height:100px;background-color:lightgreen">
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                 </div>

// let component = <Div id="a" cls="b" style="width:100px;height:100px;background-color:lightgreen">
//                     <Div></Div>
//                     <Div></Div>
//                     <Div></Div>
//                 </Div>

// component.class = "c"

// let component = <div>text</div>

// let component = <div>{new Wraper('span')}</div>

// let component = <MyComponent>
//     <div>text text text </div>
// </MyComponent>

console.log(Carousel)
let component = <Carousel data={
    [
        "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
        "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
        "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
        "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
    ]
}>
</Carousel>
console.log(component)

component.mountTo(document.body)



// component.setAttribute("id", "a")

