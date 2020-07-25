var parser = require("./parser.js")

module.exports = function(source, map){
    let tree = parser.parseHTML(source)
    console.log(tree)
    console.log(tree.children[1].children[0].content)
    // console.log("my loader id running>>>>>>",this.resourcePath)
    return "";
}