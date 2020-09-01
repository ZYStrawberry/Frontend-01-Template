
// 这里的方法名和webpack.config.js里的pragma配置要保持一致

<<<<<<< HEAD
function createElement(Cls, attributes, ...children){
=======
export function createElement(Cls, attributes, ...children){
>>>>>>> 73c0067c17bf3b0ca1f40281dfefe7f478f3f47c
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
<<<<<<< HEAD
=======
            
            if(typeof child === "object" && child instanceof Array){
                visit(child)
                continue
            }
>>>>>>> 73c0067c17bf3b0ca1f40281dfefe7f478f3f47c
            // 处理文字
            if(typeof child === "string"){
                child = new Text(child)
                console.log(child)
            }
<<<<<<< HEAD
            if(typeof child === "object" && child instanceof Array){
                visit(child)
            }

=======
>>>>>>> 73c0067c17bf3b0ca1f40281dfefe7f478f3f47c
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