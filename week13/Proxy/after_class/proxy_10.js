let handlerMap = new Map();
let reactivityMap = new Map();
let usedReactivities = [];

function reactive(obj) {
  // 查询reactivityMap是否已经缓存过proxy
  // 如果有，则返回缓存的proxy
  if (reactivityMap.has(obj)) {
    return reactivityMap.get(obj);
  }

  let proxy = new Proxy(obj, {
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

  // 缓存proxy
  reactivityMap.set(obj, proxy);
  // 用于检测reactivityMap.get(obj)和reactivityMap.get(proxy)是否相等
  reactivityMap.set(proxy, proxy);

  return proxy;
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

let result; // 保存proxy.a的结果
let proxy = reactive({
  r: 0,
  g: 0,
  b: 0,
});

// 可以通过给proxy赋值，修改输入框的值，实现proxy到输入框的绑定
effect(() => {
  document.getElementById('r').value = proxy.r;
});
document.getElementById('r').addEventListener('input', function (event) {
  proxy.r = event.target.value;
});

effect(() => {
  document.getElementById('g').value = proxy.g;
});
document.getElementById('g').addEventListener('input', function (event) {
  proxy.g = event.target.value;
});

effect(() => {
  document.getElementById('b').value = proxy.b;
});
document.getElementById('b').addEventListener('input', function (event) {
  proxy.b = event.target.value;
});

effect(() => {
  document.getElementById(
    'color',
  ).style.backgroundColor = `rgb(${proxy.r},${proxy.g},${proxy.b})`;
});
