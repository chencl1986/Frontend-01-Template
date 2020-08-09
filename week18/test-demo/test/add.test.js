var assert = require('assert');
var mod = require('../src/add');

/* describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
}); */

// import add from '../src/add';
// import assert from 'assert';

describe('add', function () {
  it('add(3 + 4) should be 7', function () {
    assert.equal(mod.add(3, 4), 7);
  });
});

// ava
// import {add} from '../src/add';
// import test from 'ava';
/* var {test} = require('ava');
var mod = require('../dist/add');

test('foo', (t) => {
  if (mod.add(3, 4) === 7) {
    t.pass();
  }
}); */
