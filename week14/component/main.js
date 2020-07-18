// import {Carousel} from "./carousel.view";

// 这里的方法名和webpack.config.js里的pragma配置要保持一致
function createElement(Cls, attributes, ...children){
    // console.log(arguments)
    let o = new Cls({
        timer:{}
    })
     
    for(let name in attributes){
        // o[name] = attributes[name]
        // property 和 attribute 不等效
        o.setAttributes(name, attributes[name])
    }
    // console.log(children)

    for(let child in children){
        console.log(child)
        o.appendChild(child)
    }
    console.log(o)
    return o;
}

class Div{
    constructor(config){
        this.children= [];
        this.root = document.createElement('div');
    }

    setAttributes(name, value){ // attribute
        this.root.setAttribute(name, value)
    }

    appendChild(child){ // child
        // console.log(child)
        this.children.push(child)
    }

    mountTo(parent){
        // console.log(parent)
        parent.appendChild(this.root);
        console.log(this.children)
        for(let child of this.children){
            child.mountTo(this.root)
        }
    }
}


let component = 
    <Div id="a" class="b" >
        <Div></Div>
        <Div></Div>
        <Div></Div>
    </Div>

// component.class = "c"
// console.log(document.body)
// console.log(component)
component.mountTo(document.body)



// component.setAttribute("id", "a")

