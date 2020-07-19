// import {Carousel} from "./carousel.view";

// 这里的方法名和webpack.config.js里的pragma配置要保持一致
function createElement(Cls, attributes, ...children){
    // console.log(arguments)
    // console.log(attributes) 没有attributes的时候为null
    let o;

    if(typeof Cls === "string"){
        o = new Wrapper(Cls)
    } else {
        o = new Cls({
            timer:{}
        })
    }
    
    for(let name in attributes){
        // property 和 attribute 等效
        // o[name] = attributes[name]

        // property 和 attribute 不等效
        o.setAttribute(name, attributes[name])
    }
    // console.log(children)

    for(let child of children){
        // 处理文字
        if(typeof child === "string"){
            child = new Text(child)
            console.log(child)
        }

        o.appendChild(child)
        // o.children.push(child)
    }
    return o;
}
class Text{
    constructor(text){
        this.children = [];
        this.root = document.createTextNode(text);
    }

    mountTo(parent){
        parent.appendChild(this.root);
    }
}

class Wrapper{
    constructor(type){
        // console.log(config)
        this.children = [];
        this.root = document.createElement(type);
    }

    setAttribute(name, value){ // attribute
        this.root.setAttribute(name, value)
    }

    appendChild(child){ // children
        this.children.push(child)
    }

    mountTo(parent){
        parent.appendChild(this.root);
        // console.log(this.children)
        for(let child of this.children){
            child.mountTo(this.root)
        }
    }
}

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

    render(){
        return <article>
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

let component = <MyComponent>
    <div>text text text </div>
</MyComponent>
console.log(component)

component.mountTo(document.body)



// component.setAttribute("id", "a")

