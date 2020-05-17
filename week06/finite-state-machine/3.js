function match(string) {
  let foundA = false;
  let foundB = false;
  let foundC = false;
  let foundD = false;
  let foundE = false;

  for (const char of string) {
    if (char === 'a') {
      // 查找到a
      foundA = true;
    } else if (foundA && char === 'b') {
      // 在已查找到a的前提下，查找到b
      foundB = true;
    } else if (foundB && char === 'c') {
      // 在已查找到ab的前提下，查找到c
      foundC = true;
    } else if (foundC && char === 'd') {
      // 在已查找到abc的前提下，查找到d
      foundD = true;
    } else if (foundD && char === 'e') {
      // 在已查找到abcd的前提下，查找到e
      foundE = true;
    } else if (foundE && char === 'f') {
      // 在已查找到abcde的前提下，查找到f
      return true;
    } else {
      // 如果没有匹配到abcdef，则重置当前状态
      foundA = false;
      foundB = false;
      foundC = false;
      foundD = false;
      foundE = false;
    }
  }

  return false;
}

console.log(match('I am groot'));
console.log(match('This is not groot'));
console.log(match('I am bruce'));
console.log(match('I am abner'));
console.log(match('This is abcde'));
console.log(match('This is abcdef'));
