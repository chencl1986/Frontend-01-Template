/* {
  const a = 1;
  throw 1;
  let b = 2;
  b = function () {};
} */

/* for (let i = 0; i < 10; i++) {
  console.log(i); // index
}

for (let i = 0; i < 10; i++) {
  let i = 0;
  console.log(i); // always 0
}

// 每次循环相当于产生了两个嵌套的作用域
{
  let i = 0;
  {
    let i = 0;
    console.log(i);
  }
} */

/* for (var i = 0; i < 10; i++) {
  console.log(i);
}

for (i = 0; i < 10; i++) {
  var i;
  console.log(i);
}

for (i = 0; i < 10; i++) {
  console.log(i);
}
var i;

function run() {
  for (i = 0; i < 10; i++) {
    console.log(i);
  }
  return;
  var i = 0;
}
run() */

/* for (const key in {a: 1, b: 2}) {
  console.log(key);
} */

/* for (const p of [1, 2, 3]) {
  console.log(p);
}

function* g() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
}

for (const p of g()) {
  console.log(p);
} */

/* try {
  throw 2;
} catch (error) {
  var error; // 不会报错，而且能正常打印出2
  // let error; // SyntaxError: Identifier 'error' has already been declared
  console.log(error);
} finally {
  // 最终都会执行
} */

/* // 函数声明
function foo() {
  
}

// 函数表达式
var o = function foo(params) {
  
} */

/* // 类声明
class cls {
  
}

// 类表达式
var cls = class {
  
} */

/* // Generator函数声明
function* foo() {
  yield 1;
  yield 2;

  var i = 3;
  while (true) {
    yield i++;
  }
}

var gen = foo();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: 4, done: false }
console.log(gen.next()); // { value: 5, done: false }
console.log(gen.next()); // { value: 6, done: false }

// Generator函数表达式
var o = function* foo() {}; */

/* function sleep(timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}

void (async function () {
  var i = 0;
  while (true) {
    console.log(i++);
    await sleep(1000);
  }
})(); */

/* function sleep(timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}

async function* foo() {
  var i = 0;
  while (true) {
    console.log(i++); // i
    yield i;
    await sleep(1000);
  }
}

var g = foo();
g.next();
g.next();
g.next();
g.next();
g.next();

void (async function () {
  var g = foo();
  console.log(await g.next()); // { value: 1, done: false }
  console.log(await g.next()); // { value: 2, done: false }
  console.log(await g.next()); // { value: 3, done: false }
  console.log(await g.next()); // { value: 4, done: false }
  console.log(await g.next()); // { value: 5, done: false }
})();

void (async function () {
  var g = foo();
  for await (let e of g) {
    console.log(e); // 无限输出i
  }
})(); */

/* var x = 0;
function foo() {
  var o = {x: 1};
  x = 2;
  with (o) {
    var x = 3; // 改变了o.x的值
  }
  console.log(x); // 2，由于with内部有var声明，相当于在函数内部声明了一个x，因此打印了内部的x
  console.log(o); // { x: 3 }，with内部修改了o的属性
}

foo();
console.log(x); // 0，由于函数内部声明了变量x，外部的变量x不会被修改 */

/* var x = 0;
function foo() {
  var o = {x: 1};
  x = 2;
  with (o) {
    x = 3;
  }
  console.log('inner', x); // 2，函数内部没有var声明x，因此直接修改了外部变量x
  console.log(o); // { x: 3 }，with内部修改了o的属性
}

foo();
console.log('outer', x); // 2，函数内部没有var声明x，外部变量x被修改。 */

/* var x = 0;
function foo() {
  var o = {x: 1};
  x = 2;
  if (false) {
    var x = 3; // 即使代码不会运行，变量也会声明
  }
  console.log('inner', x); // 2
}

foo();
console.log('outer', x); // 0 */

/* var x = 0;
function foo() {
  var o = {x: 1};
  x = 2;
  console.log('inner', x); // 2
  return;
  var x = 3; // 即使代码不会运行，变量也会声明
}

foo();
console.log('outer', x); // 0 */

/* void (function foo() {
  foo2(); // 2，函数可被调用，因此输出2
  console.log(i); // undefined

  return;
  var i = 1; // 即使代码不会运行，变量也会声明
  function foo2() {
    console.log(2); // 2
  }
})(); */

/* var cls1 = 0;
function foo() {
  cls1 = 2; // Cannot access 'cls1' before initialization
  class cls1 {}
  class cls1 {} // Identifier 'cls1' has already been declared
}

foo();
console.log(cls1); */

/* var cls1 = 0;

function foo() {
  console.log(cls1);
  const cls1; // SyntaxError: Missing initializer in const declaration
} */

/* function foo() {
  console.log(this);
  return {a: 1};
}

foo(); // window or global
new foo(); // {a: 1} */

/* var o = [];
o[100] = 1;
console.log(o.length); // 101
console.log(Object.getOwnPropertyDescriptor(o, 'length')); // { value: 101, writable: true, enumerable: false, configurable: false } */

/* Object.setPrototypeOf(Object.prototype, {a: 1}); // TypeError: Immutable prototype object '#<Object>' cannot have their prototype set */
