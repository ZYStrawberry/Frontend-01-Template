import {createElement, Text, Wrapper} from "./createElement";
// import {Timeline, Animation} from "./animation.js"
// import {ease, linear} from "./cubicBezier.js"
// import {enableGesture} from "./gesture.js"


export class Panel {
    constructor(config){
        // console.log(config)
        this.children = [];
        this.attributes = new Map();
        this.properies = new Map();
    }

    setAttribute(name, value){ // attribute
        this[name] = value
        // this.root.setAttribute(name, value)
    }

    appendChild(child){ // children
        this.children.push(child)
    }

    render(){
    
        return <div class="panel" style="width:300px;border: 1px solid pink;">
            <h1 style="width:300px;background-color:pink;margin:0;">{ this.title }</h1>
            <div style="width:300px;border:1px solid pink;min-height:300px">
                {this.children}
            </div>
        </div>
    }

    mountTo(parent){
        this.render().mountTo(parent)
    }
}