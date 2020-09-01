import {createElement, Text, Wrapper} from "./createElement";
// import {Timeline, Animation} from "./animation.js"
// import {ease, linear} from "./cubicBezier.js"
// import {enableGesture} from "./gesture.js"


export class ListView {
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

    getAttribute(name){ 
        return this[name];
    }

    appendChild(child){ // children
        this.children.push(child)
    }

    render(){
        let data = this.getAttribute('data');
        return <div class="list-view" style="width:300px;">
            {
                data.map(this.children[0])
            }
        </div>
    }

    mountTo(parent){
        this.render().mountTo(parent)
    }
}