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
      console.log(obj, prop, val);
      return (obj[prop] = val);
    },
  });
}

let proxy = reactive(object);

// 此时会触发set
proxy.a = 1;
