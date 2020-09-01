import {createElement, Text, Wrapper} from "./createElement";
// import {Timeline, Animation} from "./animation.js"
// import {ease, linear} from "./cubicBezier.js"
// import {enableGesture} from "./gesture.js"


export class TabPanel {
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

    select(i) {
        for(let view of this.childViews){
            view.style.display = "none";
        }
        this.childViews[i].style.display = "";

        for(let view of this.titleViews){
            view.classList.remove('selected');
        }
        this.titleViews[i].classList.add("selected");
   }

    render(){
        this.childViews = this.children.map(child => <div style="width:300px;min-height:300px">{child}</div>);
        this.titleViews =  this.children.map((child, i) => <span onClick={()=>this.select(i)} 
            style="width:300px;font-size:14px;padding:5px 10px;border:1px solid #0f0;background-color:pink;min-height:300px">{child.getAttribute("title") || ""}</span>);
        
        setTimeout(() => this.select(0), 16);

        return <div class="tab-panel" style="width:300px;">
            <h1 style="width:300px;margin:0;">{this.titleViews}</h1>
            <div style="border: 1px solid #f00;">
                {this.childViews}
            </div>
        </div>
    }

    mountTo(parent){
        this.render().mountTo(parent)
    }
}