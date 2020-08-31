
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
    let visit =  (children) =>{
        for(let child of children){
            // 处理文字
            if(typeof child === "string"){
                child = new Text(child)
                console.log(child)
            }
            if(typeof child === "object" && child instanceof Array){
                visit(child)
            }

            o.appendChild(child)
            // o.children.push(child)
        }
    }
    
    visit(children)
    return o;
}
export class Text{
    constructor(text){
        this.children = [];
        this.root = document.createTextNode(text);
    }

    mountTo(parent){
        parent.appendChild(this.root);
    }
}

export class Wrapper{
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

    addEventListener(){
        this.root.addEventListener(...arguments)
    }

    get style() {
        return this.root.style;
    }

    mountTo(parent){
        parent.appendChild(this.root);
        // console.log(this.children)
        for(let child of this.children){
            child.mountTo(this.root)
        }
    }
}