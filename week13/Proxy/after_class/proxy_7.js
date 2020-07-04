let handlerMap = new Map();
let usedReactivities = [];

function reactive(obj) {
  // 每次都会返回一个新Proxy，此处需要优化
  return new Proxy(obj, {
    get(obj, prop) {
      // 将get获取的属性存入usedReactivities
      usedReactivities.push([obj, prop]);

      // 如果obj[prop]是个对象，绑定会失效
      // 修改obj[prop][childProp]时无法监听
      // 可以将obj[prop]用reactive再进行一次绑定
      if (typeof obj[prop] === 'object') {
        return reactive(obj[prop]);
      }

      return obj[prop];
    },
    set(obj, prop, val) {
      obj[prop] = val;

      // 调用set的时候，执行handlerMap中已绑定的handler
      if (handlerMap.get(obj)) {
        if (handlerMap.get(obj).get(prop)) {
          for (const handler of handlerMap.get(obj).get(prop)) {
            handler();
          }
        }
      }

      return obj[prop];
    },
  });
}

function effect(handler) {
  // 先清空
  usedReactivities = [];

  // 调用handler时，会运行dummy = proxy.a，即调用了proxy的get
  // 调用时会在usedReactivities存储当前访问的对象和属性
  handler();

  // 遍历调用get时存储的usedReactivities，并在handlerMap中存储
  for (const usedReactivity of usedReactivities) {
    let [obj, prop] = usedReactivity;

    // 每次添加handler的时候，将其按照对应的obj和prop保存
    if (!handlerMap.has(obj)) {
      handlerMap.set(obj, new Map());
    }

    if (!handlerMap.get(obj).has(prop)) {
      handlerMap.get(obj).set(prop, []);
    }

    handlerMap.get(obj).get(prop).push(handler);
  }
}

let object = {
  a: {x: 1},
};
let result; // 保存proxy.a的结果
let proxy = reactive(object);

// 执行了effect，同时执行了handler，读取了proxy.a
// 读取的同时调用了get，将handler方法绑定到handlerMap上
// 相当于创建了一个监听，当proxy.a进行set时，会运行handler
effect(() => {
  result = proxy.a.x;
});

proxy.a.x = 10;

console.log(result);
