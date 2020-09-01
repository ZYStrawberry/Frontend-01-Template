import { parseHTML } from "../src/parser.js"
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";
let assert = require("assert")

it('parse a single element', () => {
    let doc = parseHTML("<div></div>");
    let div = doc.children[0]
    // console.log(div)

    assert.equal(div.tagName, "div");
    assert.equal(div.children.length, 0);
    assert.equal(div.tagName, "div");
    assert.equal(div.type, "element");
    assert.equal(div.attributes.length, 2);

})

it('parse a single element with text content', () => {
    let doc = parseHTML("<div>hello</div>");
    let text = doc.children[0].children[0]

    // console.log(text)
    assert.equal(text.content, "hello");
    assert.equal(text.type, "text");

})

it('tag dismatch', () => {
    try {
        let doc = parseHTML("<div></vid>");
    } catch (e) {
        assert.equal(e.message, "Tag start end doesn't match!");
    }
})

it('text width <', () => {

    let doc = parseHTML("<div>a < b</div>");
    let text = doc.children[0].children[0];

    assert.equal(text.content, "a < b");
    assert.equal(text.type, "text");

})

it('with property', () => {

    let doc = parseHTML("<div id=a class='cls' data=\"abc\"></div>");
    let div = doc.children[0];

    let count = 0;

    for (let attr of div.attributes) {
        if (attr.name === "id") {
            count++;
            assert.equal(attr.value, "a");
        }
        if (attr.name === "class") {
            count++;
            assert.equal(attr.value, "cls");
        }
        if (attr.name === "data") {
            count++;
            assert.equal(attr.value, "abc");
        }
    }
    assert.ok(count === 3);

})

// double quoted
it('with  property 2', () => {

    let doc = parseHTML("<div id=a class='cls' data=\"abc\">");
    let div = doc.children[0];

    let count = 0;

    for (let attr of div.attributes) {
        if (attr.name === "id") {
            count++;
            assert.equal(attr.value, "a");
        }
        if (attr.name === "class") {
            count++;
            assert.equal(attr.value, "cls");
        }
        if (attr.name === "data") {
            count++;
            assert.equal(attr.value, "abc");
        }
    }
    assert.ok(count === 3);

})

it('with property 3', () => {

    let doc = parseHTML("<div id=a class='cls' data=\"abc\"/>");
    let div = doc.children[0];

    let count = 0;

    for (let attr of div.attributes) {
        if (attr.name === "id") {
            count++;
            assert.equal(attr.value, "a");
        }
        if (attr.name === "class") {
            count++;
            assert.equal(attr.value, "cls");
        }
        if (attr.name === "data") {
            count++;
            assert.equal(attr.value, "abc");
        }
    }
    assert.ok(count === 3);

})

it("script", () => {
    let content = `
    <div>anycode</div>
    <span>zhangying</span>
    /script>
    <script
    <
    </
    </s
    </sc
    </scr
    </scri
    </scrip
    </script`

    let doc = parseHTML(`<script>${content}</script>`);
    let text = doc.children[0].children[0];

    assert.equal(text.content, content);
    assert.equal(text.type, "text");
})

it('attribute width no value 1', () => {
    let doc = parseHTML("<div class />");
    let div = doc.children[0];

    let count = 0;

    for (let attr of div.attributes) {
        if (attr.name === "class") {
            count++;
            assert.equal(attr.value, "");
        }
    }
    assert.ok(count === 1);
})

it('attribute width no value 2', () => {
    let doc = parseHTML("<div class id/>");

    let div = doc.children[0];

    let count = 0;

    for (let attr of div.attributes) {
        if (attr.name === "id") {
            count++;
            assert.equal(attr.value, "");
        }
        if (attr.name === "class") {
            count++;
            assert.equal(attr.value, "");
        }
    }
    assert.ok(count === 2);
})

it('attribute width no value 3', () => {
    let doc = parseHTML("<div class id data/>");

    let div = doc.children[0];

    let count = 0;

    for (let attr of div.attributes) {
        if (attr.name === "id") {
            count++;
            assert.equal(attr.value, "");
        }
        if (attr.name === "class") {
            count++;
            assert.equal(attr.value, "");
        }
        if (attr.name === "data") {
            count++;
            assert.equal(attr.value, "");
        }
    }
    assert.ok(count === 3);
})

// copy
it('self closed single element', function () {
    let document = parseHTML('<div/>');
    let div = document.children[0];

    assert.equal(div.tagName, 'div');
    assert.equal(div.children.length, 0);
    assert.equal(div.type, 'element');
    assert.equal(div.attributes.length, 3);
});

it('uppercase tagname element', function () {
    let document = parseHTML('<DIV/>');
    let div = document.children[0];

    assert.equal(div.tagName, 'DIV');
    assert.equal(div.children.length, 0);
    assert.equal(div.type, 'element');
    assert.equal(div.attributes.length, 3);
});

it('multiple spaces single element', function () {
    let document = parseHTML('<div     />');
    let div = document.children[0];

    assert.equal(div.tagName, 'div');
    assert.equal(div.children.length, 0);
    assert.equal(div.type, 'element');
    assert.equal(div.attributes.length, 3);
});

it('empty tagname element', function () {
    let document = parseHTML('</>');
    let div = document.children[0];

    assert.equal(div.tagName, '');
    assert.equal(div.children.length, 0);
    assert.equal(div.type, 'element');
    assert.equal(div.attributes.length, 3);
});