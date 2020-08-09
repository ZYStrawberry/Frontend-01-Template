function match(element, selector){
    console.log(element)
    if(!selector || !element.attributes){
        return false;
    }

    console.log(selector)
    if(selector.charAt(0) == "#"){
        var attr = element.attributes.filter(attr => attr.name === "id")[0]
        if(attr && attr.value === selector.replace("#","")){
            return true;
        }else if(selector.charAt(0) == "."){
            var attr = element.attributes.filter(attr => attr.name === "id")[0]
            if(attr && attr.value === selector.replace(".","")){
                return true;
            }
        }else{
            if(element.tagName === selector){
                return true;
            }
        }
    }
}

module.exports = match;