// const test = require('ava');
// var add = require('../src/add.js');

// test('foo', t => {
//     if(add.add(5,2) === 7)
//         t.pass();
// });
var add = require('../src/add.js');
var assert = require('assert');
// import add from '../src/add.js'
// import assert from 'assert'

describe('add', function () {
    it('add(5, 2) should be 7', function () {
        assert.equal(add.add(5, 2), 7);
        // assert.equal(add(5, 2), 7);
    });
});

