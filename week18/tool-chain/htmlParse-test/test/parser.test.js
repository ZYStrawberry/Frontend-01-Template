import {parseHTML} from "../src/parser.js"
let assert = require("assert")

it('parse a single element', ()=>{
    let doc = parseHTML("<div></div>");
    let div = doc.children[0]

    assert.equal(div.tagName, "div");
    assert.equal(div.children.length, 0);
    assert.equal(div.tagName, "div");
    assert.equal(div.type, "element");
    assert.equal(div.attributes.length, 0);

})

it('parse a single element with text content', ()=>{
    let doc = parseHTML("<div>hello</div>");
    let text = doc.children[0]

    console.log(text)
    assert.equal(text.content, "hello");
    assert.equal(text.content, "hello");
    assert.equal(text.length, 2);

})