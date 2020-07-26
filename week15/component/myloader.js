var parser = require("./parser.js")

module.exports = function(source, map){
    let tree = parser.parseHTML(source)

    // console.log("tree",JSON.stringify(tree))
    // console.log(tree.children[1].children[0].content)
    // console.log("my loader id running>>>>>>",this.resourcePath)
    
    let template = null;
    let script = null;

    for(let node of tree.children){
        // console.log("node",node)
        if(node.tagName == "tamplate"){
            // console.log("children", node.children)
            template = node.children.filter(e => e.type != "text")[0];
            // console.log("template", template)
        }
        
        if(node.tagName == "script"){
            script = node.children[0].content
        }
    }

    // let createCode = "";
    // console.log("template", template)

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
export calss Carousel {
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