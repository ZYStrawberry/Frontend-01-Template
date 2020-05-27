let currentToken = null;
let currentAttribute = null;
let stack = [{
    type:"document",
    children:[]
}];
let currentTextNode = null; //文本节点
const css = require("css");  //引用css包

//加入一个新的函数，addCSSRules
//这里我们把css规则暂存到一个数组里
let rules = [];
function addCSSRules(text){
	var ast = css.parse(text); // 返回一个ast
    console.log(JSON.stringify(ast, null,  "   "));
    rules.push(...ast.stylesheet.rules);
               
}

function match(element, selector){
    if(!selector || !element.attributes){
        return false;
    }
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

function specificity(selector){
    var p = [0,0,0,0];
    var selectorParts = selector.split(" ");
    for(var part of selectorParts){
        if(part.charAt(0) == "#"){
            p[1] += 1;
        }else if(part.charAt(0) == "."){
            p[2] += 1;
        }else {
            p[3] += 1;
        }
    }
    return p;
}

function compare(sp1,sp2){
    if(sp1[0] - sp2[0]){
        return sp1[0] - sp2[0]
    }

    if(sp1[1] - sp2[1]){
        return sp1[1] - sp2[1]
    }

    if(sp1[2] - sp2[2]){
        return sp1[2] - sp2[2]
    }

    return sp1[3] - sp2[3]
}

function computeCSS(){
    var element = stack.slice().reverse();
    if(!element.computedStyle){
        element.computedStyle = {};
    }
    let matchd = false;
    for(let rule of rules){
        var selectorParts = rule.selector[0].split(" ").reverse();
        if(!match(element,selectorParts[0]))
            continue;
        var j = 1;
        for(var i = 0; i < customElements.length;i++){
            if(match(elements[i],selectorParts[j])){
                j++;
            }
        }
        if(j >= selectorParts.length){
            matchd = true
        }
        if(matchd){
            var sp = specificity(rule.selectors[0]);
            var computedStyle = element.computedStyle;
            for(var declaration of rul.declarations){
                if(!computedStyle[declaration.prperty])
                    computedStyle[declaration.prperty] = {}
                if(!computedStyle[declaration.prperty].specificity){
                    computedStyle[declaration.prperty].value = declaration.value
                    computedStyle[declaration.prperty].value = declaration.sp
                } else if(compare(computedStyle[declaration.property].specificity, sp) < 0){
                    computedStyle[declaration.property].specificity = sp;
                }   
            }
        }
    }
}

function emit(token){
    //if(token.type === "text"){
        //return;
    //}
    let top = stack[stack.length - 1];
    if(token.type == "startTag"){
        let element = {
            type:"element",
            children:[],
            attributes:[]
        };

        element.tagName = token.tagName;

        for(let p in token){
            if(p != "type" && p != "tagName"){
                //maaa a
                element.attributes.push({
                    name:p,
                    value:token[p]
                });
            }
        }

        computeCSS(element);

        top.children.push(element);
        //element.parent = top;  //新加子元素的栈顶
        
        if(!token.isSelfClosing){
            stack.push(element);
        }
        currentTextNode = null;
    } else if(token.type == "endTag"){
        if(top.tagName != token.tagName){
            throw new Error("Tag start end doesn't match!");
        } else {
            // 匹配上结束标签 就可以出栈
            if(top,tagName === "style"){
                addCSSRules(top.children[0].content)
            }
            stack.pop();
        }
        currentTextNode = null;
    } else if(token.type == "text"){

        if(currentTextNode == null){
            // 没有文本节点，直接新建一个文本节点
           currentTextNode = {
               type:'text',
               content:''
           }
           top.children.push(currentTextNode);
        }
        currentTextNode.content += token.content;
    }
}

const EOF = Symbol("EOF"); //EOF: End Of File

function data (c){
    //三种标签：开始<，结束EOF，自封闭
	if(c == "<"){
  		return tagOpen;
    } else if(c == EOF){
        emit({
            type:"EOF"
        });
     	return ;
    } else{
        emit({
            type:"text",
            content:c
        });
    	return data;
	}
}

function tagOpen(c){
	if(c == "/"){ //结束标志
    	return endTagOpen;
    } else if (c.match(/^[a-zA-Z]$/)){ //继续
        currentToken = {
            type:"startTag",
            tagName:""
        }
		return tagName(c);
    } else {
        emit({
            type:"text",
            content:c
        });
    	return ;
    }      
}



function tagName(c){
	if(c.match(/^[\t\n\f ]$/)){
    	return beforeAttributeName;
    } else if(c == "/"){
    	return selfClosingStartTag;
    } else if(c.match(/^[a-zA-Z]$/)){
        currentToken.tagName += c;
    	return tagName;
    } else if(c == ">"){
        emit(currentToken);
    	return data;
    } else {
        currentToken.tagName += c;
    	return tagName;
    }
}

function beforeAttributeName(c){
	if(c.match(/^[\t\n\f ]$/)){ // 空格
    	return beforeAttributeName;
    } else if(c == ">" || c == "/" || c == EOF){
    	return afterAttributeName(c)
    } else if(c == "="){
    	//抛错
    } else {
        // 普通字符 是属性名
    	currentAttribute = {
            name:'',
            value:''
        }

        return attributeName(c)
    }
}

function  attributeName(c){
    if(c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF){
    	return afterAttributeName(c);
    }  else if(c == "="){
        // 已经获取到属性名 去获取属性值
    	return beforeAttributeName;
    	
    } else if(c == "\u0000"){
    	
    }else if(c == "\"" || c == "'" || c == "<"){
    	
    }else {
        // 不是特殊字符，就追加到属性名上
        currentAttribute.name += c;
        return attributeName;
    }
}

function beforeAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF){
    	return beforeAttributeValue;
    }  else if(c == "\""){
    	return doubleQuotedAttributeValue;
    }else if(c == "\'"){
    	return singleQuotedAttributeValue
    }else if( c == ">"){
        return data;
    } else {
       	// 获取属性值
        return UnquotedAttributeValue(c);
    }
}

function doubleQuotedAttributeValue(c){
    if(c == "\""){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if(c == "\u0000"){

    } else if(c == EOF){

    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue
    }
}

function singleQuotedAttributeValue(c){
    if(c == "\""){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if(c == "\u0000"){

    } else if(c == EOF){

    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue
    }
}

function afterQuotedAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/)){
    	return beforeAttributeName;
    } else if(c == "/"){
    	return selfClosingStartTag;
    } else if(c == ">"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken)
        return data;
    } else if(c == EOF){

    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue
    }
}

function UnquotedAttributeValue(c){
    // maaa=a中的最后一个a进来了
    if(c.match(/^[\t\n\f ]$/)){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return beforeAttributeName;
    } else if(c == "/"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    } else if(c == ">"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken)
        return data;
    } else if( c== "\u0000"){

    } else if(c == "\"" || c == "'" || c == "<" || c == "=" || c == "`"){

    } else if(c == EOF){

    } else {
        currentAttribute += c;
        return UnquotedAttributeValue;
    }
}

function selfClosingStartTag(c){
	if(c == ">"){
        currentToken.isSelfClosing = true;
        emit(currentToken)
        return data;
    } else if(c == "EOF"){
    	
    } else {
    
    }
}

function endTagOpen(c){
	if (c.match(/^[a-zA-Z]$/)){
		currentToken = {
            type:"endTag",
            tagName:""
        }
        return tagName(c); //结束标签
    } else if(c == ">"){ 
    	
    } else if(c == EOF){
    
    } else {
    
    }
}

function afterAttributeName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return afterAttributeName;
    } else if(c == "/"){ 
    	return selfClosingStartTag;
    } else if(c == "="){
        return beforeAttributeValue;
    } else if(c == ">"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data
    } else if(c == EOF){

    } else {
        currentToken[currentAttribute.name] = currentAttribute.value;
        currentAttribute = {
            name:"",
            value:""
        }
        return attributeName(c)
    }
}


module.exports.parseHTML = function parseHTML(html){
	console.log(html);
    let state = data;
    for(let c of html){
    	state = state(c);
    }
    state = start(EOF)
    console.log(stack[0])
}