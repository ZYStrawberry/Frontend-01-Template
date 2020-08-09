import {createElement, Text, Wrapper} from "./createElement";
// import {Carousel} from "./carousel.view";

import {Timeline, Animation} from "./animation.js"
import {ease, linear} from "./cubicBezier.js"

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
        let timeline = new Timeline;
        let nextpic = () => {
            // 先计算出下一张的位置
            let nextPosition = (position + 1) % this.data.length;
            
            // 一次移动两张
            let current = children[position];
            let next = children[nextPosition];
          
            let currentAnimation = new Animation(current.style, "transition", -100 * position, -100-100*position, 500, 0, ease, v => `translateX(${v}%)`);
            let nextAnimation = new Animation(next.style, "transition", 100 - 100 * nextPosition, -100*nextPosition, 500, 0, ease, v => `translateX(${v}%)`);

            timeline.add(currentAnimation)
            timeline.add(nextAnimation)

            timeline.start()

            // transition生效需要时间，所以需要加个setTimeout时间间隔
            position = nextPosition
            
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

// console.log(Carousel)
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

