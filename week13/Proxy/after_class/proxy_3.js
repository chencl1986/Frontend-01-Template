let handlers = [];

let object = {
  a: 1,
  b: 2,
};

function reactive(obj) {
  return new Proxy(obj, {
    get(obj, prop) {
      console.log(obj, prop);
      return obj[prop];
    },
    set(obj, prop, val) {
      obj[prop] = val;
      // 每次执行set的时候，会把所有的handler都执行
      for (const handler of handlers) {
        handler();
      }
      return obj[prop];
    },
  });
}

function effect(handler) {
  // console.log(handler);
  handler();
  handlers.push(handler);
}

let dummy; // 保存proxy.a的结果
let proxy = reactive(object);

// 执行了effect，同时执行了handler，读取了proxy.a
effect(() => (dummy = proxy.a));
console.log(dummy);

// 赋值时会执行set，也就执行了effect中定义的handler
proxy.a = 2;

console.log(dummy);
