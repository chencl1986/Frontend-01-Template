/* // 正0和负0的区分
function check(zero) {
  if (1 / zero === Infinity) {
    return 1;
  }
  if (1 / zero === -Infinity) {
    return -1;
  }
} */

/* // 判断数字符号
function sign(number) {
  if (number === 0) {
    if (1 / number === Infinity) {
      return 1;
    }
    if (1 / number === -Infinity) {
      return -1;
    }
  }

  if (number === Infinity) {
    return 1;
  }

  if (number === -Infinity) {
    return -1;
  }

  return number / Math.abs(number);
} */

/* // 直接取符号位读取符号，待完成
function sign(number) {
  const bytes = new Uint8Array(number);
  const memory = new Float64Array(bytes.buffer);
  console.log(memory);
  return memory[0];
}
console.log(sign(1));
console.log(sign(-1));
console.log(sign(0));
console.log(sign(-0));
console.log(sign(Infinity));
console.log(sign(-Infinity)); */

/* function foo() {
  console.log('new.target', new.target);
}

foo(); // undefined
new foo(); // [Function: foo]
const fakeObject = {};

Object.setPrototypeOf(fakeObject, foo.prototype);
fakeObject.constructor = foo;
foo.apply(fakeObject); // new.target为undefined
// instanceof通过原型链检查，一你吃无法判断fakeObject是被谁调用
console.log(fakeObject instanceof foo); // true */

/* class Parent {
  b = 2;

  method() {
    console.log('method');
  }

  constructor() {
    this.a = 1;
  }
}

class Child extends Parent {
  constructor() {
    super();
    console.log(this.a); // 1
    console.log(super.b); // undefined
    console.log(this.b); // 2
    console.log(super.method()); // method
  }
}

new Child();
 */

/* const name = 'Lee';

function foo() {
  console.log(arguments);
}

foo`hello ${name}`; // [Arguments] { '0': [ 'hello ', '' ], '1': 'Lee' } */

/* function cls1(s) {
  console.log(s);
}

function cls2(s) {
  console.log('2', s);
  return cls1;
}

console.log(new cls2()); // 2 undefined, [Function: cls1]
console.log(cls2('good')); // 2 good, [Function: cls1]
console.log(new cls2('good')); // 2 good, [Function: cls1]
console.log(new (cls2('good'))()); // 2 good, undefined, cls1 {}
console.log(new new cls2('good')()); // 2 good, undefined, cls1 {} */

/* var o = {x: 1};

console.log(o.x + 2); // 完全等效于1+2，加法时相当于寻找了Reference的值，即o.x为1，并进行了运算。
console.log(delete o.x); // true  // 返回的是Reference类型，相当于Object[key]
console.log(delete 1); // true

// Reference示例
class Reference {
  constructor(object, property) {
    this.object = object;
    this.property = property;
  }
} */

/* class foo {
  constructor() {
    this.b = 1;
  }
}
foo.b = function () {
  console.log('b');
};

console.log(new foo()['b']); // 1
// console.log(new (foo()['b'])()); // 报错
console.log(new foo['b']()); // foo.b {} */

/* var a = 1, b = 1, c = 1;

a
++
b
++
c;
console.log(a, b, c); // 1, 2, 2 */

// var a = 1, b = 1, c = 1;

// a/*
// */++
// b/*
// */++
// c;
// console.log(a, b, c); // 1, 2, 2

/* for (var index = 0; index < 10; index++) {
  var button = document.createElement('button');
  button.innerHTML = index;
  document.body.appendChild(button);
  // IIFE 立即执行的函数表达式
  (function (i) {
    button.onclick = function () {
      console.log(i);
    };
  })(index);
  // 使用void等价
  void (function (i) {
    button.onclick = function () {
      console.log(i);
    };
  })(index);
} */

/* function foo1() {
  console.log(1);
  return false;
}

function foo2() {
  console.log(2);
}

foo1() && foo2(); // 1
foo1() || foo2(); // 1, 2 */

/* function f() {
  console.log(1);
  return 1;
}

var a = (f(), 2, 3); // 1
console.log(a); // 3 */
