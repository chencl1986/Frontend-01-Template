function match(string) {
  let foundA = false;

  for (const char of string) {
    if (char === 'a') {
      // 查找到a
      foundA = true;
    } else if (foundA && char === 'b') {
      // 在已查找到a的前提下，查找到b
      return true;
    } else {
      // 如果没有匹配到ab，则重置当前状态
      foundA = false;
    }
  }

  return false;
}

console.log(match('I am groot'));
console.log(match('This is not groot'));
console.log(match('I am bruce'));
console.log(match('I am abner'));
