// 匹配当前元素
function matchElement(element, selector) {
  // console.log(element, selector);
  // 实际需要校验一下选择器是否符合规范，此处先忽略，默认选择器都是正确的
  if (selector === '*') {
    return true;
  }

  const selectors = selector.match(/^(\w+)|(\.\w+)|(#\w+)|(\[.+\])/g) || [];
  // 处理了类名不规范的情况，如收尾有空格，类名之间间隔了多个空额
  const classNameSet = new Set(
    element.getAttribute('class')
      ? element.getAttribute('class').trim().replace(/\s+/, ' ').split(' ')
      : [],
  );

  // 循环匹配当前选择器列表
  for (let index = 0; index < selectors.length; index++) {
    const selector = selectors[index];

    // 匹配ID选择器
    if (selector.startsWith('#')) {
      if (
        !(selector.substr(1, selector.length) === element.getAttribute('id'))
      ) {
        return false;
      }
    }
    // 匹配类名选择器
    else if (selector.startsWith('.')) {
      if (!classNameSet.has(selector.substr(1, selector.length))) {
        return false;
      }
    }
    // 匹配属性选择器
    else if (selector.startsWith('[')) {
      if (selector.match('=')) {
        // 此处可以加入属性选择器的多种类型判断，来不及补充了
        const matchedAttr = selector.match(/\[(.+)=\"(.+)\"\]/) || [];

        if (element.getAttribute(matchedAttr[1]) !== matchedAttr[2]) {
          return false;
        }
      } else {
        const matchedAttr = selector.match(/\[(.+)\]/) || [];

        if (typeof element.getAttribute(matchedAttr[1]) !== 'string') {
          return false;
        }
      }
    }
    // 匹配标签选择器
    else {
      if (!(selector === element.tagName.toLocaleLowerCase())) {
        return false;
      }
    }
  }

  // 没有中断循环则表示匹配成功
  return true;
}

// 递归匹配所有在当前元素之前的兄弟元素
function matchGeneralSiblingElement(element, selector) {
  const isMatched = matchElement(element, selector);

  // 如果已匹配到，则返回结果
  if (isMatched) {
    return isMatched;
  }

  // 如果已经查找到第一个元素，则返回结果
  if (!element.previousElementSibling) {
    return isMatched;
  }

  // 如果未匹配到，且当前元素不是第一个，则继续查找
  return matchGeneralSiblingElement(element.previousElementSibling, selector);
}

// 查找每个层级的元素
function recursionElement(prevElement, element, selectorArr, selectorIndex) {
  // 子代选择器
  if (selectorArr[selectorIndex] === '>') {
    // 用下一个选择器匹配当前元素
    const isMatchedParent = matchElement(element, selectorArr[++selectorIndex]);

    // 如果匹配失败则返回结果
    if (!isMatchedParent) {
      return isMatchedParent;
    }

    // 如果已完成匹配，则返回结果
    if (
      element.parentNode.nodeName === '#document' ||
      selectorIndex === selectorArr.length - 1
    ) {
      return isMatchedParent;
    }

    // 如果无法结束匹配，则继续匹配父级元素
    return recursionElement(
      element,
      element.parentNode,
      selectorArr,
      ++selectorIndex,
    );
  }

  // 相邻兄弟选择器
  if (selectorArr[selectorIndex] === '+') {
    // 用下一个选择器匹配前一个兄弟元素
    const isMatchedAdjacent = matchElement(
      prevElement.previousElementSibling,
      selectorArr[++selectorIndex],
    );

    // 如果匹配失败则返回结果
    if (!isMatchedAdjacent) {
      return isMatchedAdjacent;
    }

    // 如果已完成匹配，则返回结果
    if (
      element.parentNode.nodeName === '#document' ||
      selectorIndex === selectorArr.length - 1
    ) {
      return isMatchedAdjacent;
    }

    // 如果无法结束匹配，则继续匹配父级元素
    return recursionElement(
      element,
      element.parentNode,
      selectorArr,
      ++selectorIndex,
    );
  }

  // 通用兄弟选择器
  if (selectorArr[selectorIndex] === '~') {
    // 用下一个选择器匹配前递归匹配所有当前元素之前的兄弟元素
    const isMatchedGeneral = matchGeneralSiblingElement(
      prevElement.previousElementSibling,
      selectorArr[++selectorIndex],
    );

    // 如果匹配失败则返回结果
    if (!isMatchedGeneral) {
      return isMatchedGeneral;
    }

    // 如果已完成匹配，则返回结果
    if (
      element.parentNode.nodeName === '#document' ||
      selectorIndex === selectorArr.length - 1
    ) {
      return isMatchedGeneral;
    }

    // 如果无法结束匹配，则继续匹配父级元素
    return recursionElement(
      element,
      element.parentNode,
      selectorArr,
      ++selectorIndex,
    );
  }

  // 匹配当前元素
  const isMatched = matchElement(element, selectorArr[selectorIndex]);
  // 第一个元素无法匹配，则返回false
  if (!selectorIndex && !isMatched) {
    return isMatched;
  }

  // 已匹配玩所有元素，则返回结果
  if (element.parentNode.nodeName === '#document') {
    return isMatched;
  }

  // 后代选择器
  if (isMatched) {
    // 若当前已匹配到最后一个选择器，则返回结果
    if (selectorIndex === selectorArr.length - 1) {
      return isMatched;
    }
    // 若当前元素已匹配，则使用下一个选择器匹配其父级
    return recursionElement(
      element,
      element.parentNode,
      selectorArr,
      ++selectorIndex,
    );
  }

  // 若当前元素未匹配，则继续用当前选择器匹配其父级
  return recursionElement(
    element,
    element.parentNode,
    selectorArr,
    selectorIndex,
  );
}

// 选择器匹配
function match(selector, element, realResult) {
  // 将选择器拆分
  const selectorArr = selector.split(' ').reverse();
  const result = recursionElement(null, element, selectorArr, 0);
  // realResult仅用来校验匹配结果
  console.log(
    realResult === result ? '测试OK' : '测试Fail',
    selector,
    element,
    result,
  );

  return result;
}

console.log('\n简单选择器测试：');
match('*', document.getElementById('id'), true);
match('#id', document.getElementById('id'), true);
match('.class', document.getElementById('id'), true);
match('[data-test]', document.getElementById('id'), true);
match('[data-test="testValue"]', document.getElementById('id'), true);

console.log('\n复合选择器测试：');
match(
  'div#id.class[data-test="testValue"]',
  document.getElementById('id'),
  true,
);

console.log('\n复杂选择器之后代选择器测试：');
match('div *', document.getElementById('id'), true);
match('body * #id.class', document.getElementById('id'), true);
match('div #id.class', document.getElementById('id'), true);
match('body div #id.class', document.getElementById('id'), true);
match('body #id.class', document.getElementById('id'), true);
match('div div #id.class', document.getElementById('id'), false);
match('div #id.class[data-test]', document.getElementById('id'), true);
match('body div #id.class[data-test]', document.getElementById('id'), true);
match('div div #id.class[data-test]', document.getElementById('id'), false);
match(
  'div #id.class[data-test="testValue"]',
  document.getElementById('id'),
  true,
);
match(
  'div div#id.class[data-test="testValue"]',
  document.getElementById('id'),
  true,
);
match(
  'body div #id.class[data-test="testValue"]',
  document.getElementById('id'),
  true,
);
match(
  'div div #id.class[data-test="testValue"]',
  document.getElementById('id'),
  false,
);

console.log('\n复杂选择器之子代选择器测试：');
match('body > div > #id.class', document.getElementById('id'), true);
match('body > #id.class', document.getElementById('id'), false);

console.log('\n复杂选择器之相邻兄弟选择器测试：');
match(
  'body > #AdjacentSibling + #id.class',
  document.getElementById('id'),
  true,
);
match('body div + #id.class', document.getElementById('id'), true);
match('body + #id.class', document.getElementById('id'), false);

console.log('\n复杂选择器之通用兄弟选择器测试：');
match(
  'body > #GeneralSibling ~ #id.class',
  document.getElementById('id'),
  true,
);
match('body div ~ #id.class', document.getElementById('id'), true);
match('body ~ #id.class', document.getElementById('id'), false);

console.log('\n测试不同元素：');
match('div #id.class', document.querySelector('.class1'), false);
match('body div #id.class', document.querySelector('.class1'), false);
match('div div #id.class', document.querySelector('.class1'), false);
match('div #id.class[data-test]', document.querySelector('.class1'), false);
match(
  'body div #id.class[data-test]',
  document.querySelector('.class1'),
  false,
);
match('div div #id.class[data-test]', document.querySelector('.class1'), false);
