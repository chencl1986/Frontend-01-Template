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

// 已查找到c，开始查找第二个a
function foundC(char) {
  console.log('foundC', char);
  if (char === 'a') {
    // 在已查找到abc的前提下，查找到第二个a
    console.log('Using foundA2');
    return foundA2;
  }

  return start(char);
}

// 已查找到第二个a，开始查找第二个b
function foundA2(char) {
  console.log('foundA2', char);
  if (char === 'b') {
    // 在已查找到abca的前提下，查找到第二个b
    console.log('Using foundB2');
    return foundB2;
  }

  return start(char);
}

// 已查找到第二个b，开始查找x
function foundB2(char) {
  console.log('foundB2', char);
  if (char === 'x') {
    // 在已查找到abcab的前提下，查找到x
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
console.log(match('This is abcabe'));
console.log(match('This is abcabx'));
