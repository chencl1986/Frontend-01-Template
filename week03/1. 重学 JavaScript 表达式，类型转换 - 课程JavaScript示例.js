function cls1(s) {
  console.log('cls1', s);
}

function cls2(s) {
  console.log('cls2', s);
  return cls1;
}

console.log(new cls2()); // function cls1
console.log(new cls2()); // function cls1
console.log(new new cls2()()); // cls1 {}
console.log(new new cls2()()); // cls1 {}

var o = {x: 1};

console.log(o.x + 2);
console.log(delete o.x); // true
console.log(delete 1); // true

class Reference {
  constructor(object, property) {
    this.object = object;
    this.property = property;
  }
}

class foo {
  constructor() {
    this.b = 1;
  }
}

console.log(new foo()['b']); // 1
console.log(new (foo()['b'])()); // 报错

for (var index = 0; index < 10; index++) {
  var button = document.createElement('button');
  button.innerHTML = index;
  document.body.appendChild(button);
  // IIFE 立即执行的函数表达式
  (function (i) {
    button.onclick = function () {
      console.log(i);
    };
  })(index);
  void (function (i) {
    button.onclick = function () {
      console.log(i);
    };
  })(index);
}

function foo1() {
  console.log(1);
  return false;
}

function foo2() {
  console.log(2);
}

foo1() && foo2();
foo1() || foo2();
