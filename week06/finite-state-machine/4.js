function match(string) {
  // 初次循环时，使用start方法
  let state = start;

  for (const char of string) {
    console.log('Looping', char);
    /*
     * 每次循环都有可能替换掉处理状态的方法
     * 如果每个状态都符合
     * 最终会被替换为end方法
     */
    state = state(char);

    if (state === end) {
      return true;
    }
  }

  return false;
}

// 初始查询方法
function start(char) {
  console.log('start', char);
  if (char === 'a') {
    console.log('Using foundA');
    return foundA;
  }

  return start;
}

// 已查找到a，开始查找b
function foundA(char) {
  console.log('start', char);
  if (char === 'b') {
    // 在已查找到a的前提下，查找到b
    console.log('Using foundB');
    return foundB;
  }

  return start(char);
}

// 已查找到b，开始查找c
function foundB(char) {
  console.log('foundB', char);
  if (char === 'c') {
    // 在已查找到ab的前提下，查找到c
    console.log('Using foundC');
    return foundC;
  }

  return start(char);
}

// 已查找到c，开始查找d
function foundC(char) {
  console.log('foundC', char);
  if (char === 'd') {
    // 在已查找到abc的前提下，查找到d
    console.log('Using foundD');
    return foundD;
  }

  return start(char);
}

// 已查找到d，开始查找e
function foundD(char) {
  console.log('foundD', char);
  if (char === 'e') {
    // 在已查找到abcd的前提下，查找到e
    console.log('Using foundE');
    return foundE;
  }

  return start(char);
}

// 已查找到e，开始查找f
function foundE(char) {
  console.log('foundE', char);
  if (char === 'f') {
    // 在已查找到abcde的前提下，查找到f
    console.log('Using end');
    return end;
  }

  return start(char);
}

// 结束查询标志
function end(char) {
  console.log('end', char);
  return end;
}

console.log(match('I am groot'));
console.log(match('This is not groot'));
console.log(match('I am bruce'));
console.log(match('I am abner'));
console.log(match('This is abcde'));
console.log(match('This is abcdef'));
