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

/* // 函数声明
function* foo() {
  yield 1;
  yield 2;

  var i = 3;
  while (true) {
    yield i++;
  }
}

// 函数表达式
var o = function* foo(params) {}; */

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

(async function* foo() {
  var i = 0;
  while (true) {
    console.log(i++);
    yield i;
    await sleep(1000);
  }
})();

var g = foo();
g.next().next().next().next().next();

void async function () {
  var g = foo();
  console.log(await g.next());
}
*/

/* var x = 0;
function foo() {
  var o = {x: 1};
  x = 2;
  with (o) {
    var x = 3;
  }
  console.log(x);
}

foo();
console.log(x); */

/* var x = 0;
function foo() {
  var o = {x: 1};
  x = 2;
  with (o) {
    x = 3;
  }
  console.log('inner', x);
}

foo();
console.log('outer', x); */

/* var x = 0;
function foo() {
  var o = {x: 1};
  x = 2;
  if (false) {
    var x = 3;
  }
  console.log('inner', x);
}

foo();
console.log('outer', x); */

/* var x = 0;
function foo() {
  var o = {x: 1};
  x = 2;

  if (false) {
    var x = 3;
  }

  console.log('inner', x);
}

foo();
console.log('outer', x); */

/* void (function foo() {
  foo2();
  console.log(i);

  return;
  var i = 1;
  function foo2() {
    console.log(2);
  }
})();
 */

/* var cls1 = 0;
function foo() {
  cls1 = 2; // Cannot access 'cls1' before initialization
  class cls1 {}
  // class cls1 {} // Identifier 'cls1' has already been declared
}

foo();
console.log(cls1);
 */

/* function foo() {
  console.log(this);
  return {a: 1};
}

foo();
new foo(); */
