let object = {
  a: 1,
  b: 2,
};

let proxy = new Proxy(object, {
  get(obj, prop, receiver) {
    console.log(obj, prop);
    // 可以通过修改get的返回值，修改从外部获取到的属性值
    return obj[prop] + 3;
  },
  defineProperty(...args) {
    console.log(args);
    return Object.defineProperty(...args);
  },
});

// 获取proxy.a，等同于获取了object.a，会同时运行get方法
// 由于get方法的返回值被修改，此时获取到的值都比原值加了3
console.log(proxy.a);
console.log(proxy.b);
// 运行Object.defineProperty，会触发proxy中定义的defineProperty
Object.defineProperty(proxy, 'a', {value: 10});
