var parser = require("./parser.js")

module.exports = function(source, map){
    let tree = parser.parseHTML(source)

    // console.log("tree",JSON.stringify(tree))
    // console.log(tree.children)
    // console.log("my loader id running>>>>>>",this.resourcePath)
    
    let template = null;
    let script = null;

    for(let node of tree.children){
        if(node.tagName == 'template'){
            template = node.children.filter(e => e.type != "text")[0];
        }
        
        if(node.tagName == 'script'){
            script = node.children[0].content
        }
    }

    // let createCode = "";
    console.log("template", template)

    let visit = (node) => {
        if(node.type === 'text'){
            return JSON.stringify(node.content);
        }
        let attrs = {};
        for(let attribute of node.attributes){
            attrs[attribute.name] = attribute.value;
        }

        let children = node.children.map(node => visit(node));
        return `createElement("${node.tagName}", ${JSON.stringify(attrs)}, ${children})`
    }
 

    let r = `
import {createElement, Text, Wrapper} from "./createElement";
export class Carousel {
    setAttribute(name, value){
        this[name] = value
    }
    render() {
        return ${visit(template)};
    }
    mountTo(parent){
        this.render().mountTo(parent)
    }
}`;

console.log(r)
    return r;
}

// [ { type: 'element',
//     children: [ [Object], [Object], [Object] ],
//     attributes: [ [Object], [Object] ],
//     tagName: 'template' },
//   { type: 'element',
//     children: [ [Object] ],
//     attributes: [ [Object], [Object] ],
//     tagName: 'script' } ]