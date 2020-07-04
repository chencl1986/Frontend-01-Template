let handlerMap = new Map();
let usedReactivities = [];

let object = {
  a: 1,
  b: 2,
};

function reactive(obj) {
  return new Proxy(obj, {
    get(obj, prop) {
      usedReactivities.push([obj, prop]);
      return obj[prop];
    },
    set(obj, prop, val) {
      obj[prop] = val;
      console.log(handlerMap);
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

  // 遍历usedReactivities，并在handlerMap中存储
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

let dummy; // 保存proxy.a的结果
let proxy = reactive(object);

// 执行了effect，同时执行了handler，读取了proxy.a
// 读取的同时调用了get，将handler方法绑定到handlerMap上
// 相当于创建了一个监听，当proxy.a进行set时，会运行handler
effect(() => (dummy = proxy.a));
// console.log(dummy);

// 赋值时会执行set，也就执行了effect中定义的handler
// proxy.a = 2;
//
// console.log(dummy);
