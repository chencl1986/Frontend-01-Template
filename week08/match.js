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

  for (let index = 0; index < selectors.length; index++) {
    const selector = selectors[index];

    if (selector.startsWith('#')) {
      if (
        !(selector.substr(1, selector.length) === element.getAttribute('id'))
      ) {
        return false;
      }
    } else if (selector.startsWith('.')) {
      if (!classNameSet.has(selector.substr(1, selector.length))) {
        return false;
      }
    } else if (selector.startsWith('[')) {
      if (selector.match('=')) {
        // 此处可以加入属性选择器的多种类型判断
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
    } else {
      if (!(selector === element.tagName.toLocaleLowerCase())) {
        return false;
      }
    }
  }

  // 没有中断循环则表示匹配成功
  return true;
}

// 查找每个层级的元素
function recursionElement(prevElement, element, selectorArr, selectorIndex) {
  /* console.log(
    prevElement,
    element,
    element.parentNode,
    selectorArr[selectorIndex],
    selectorIndex,
  ); */

  if (selectorArr[selectorIndex] === '>') {
    const isMatchedParent = matchElement(element, selectorArr[++selectorIndex]);
    if (!isMatchedParent) {
      return false;
    }
    if (
      element.parentNode.nodeName === '#document' ||
      selectorIndex === selectorArr.length - 1
    ) {
      return isMatchedParent;
    }
    return recursionElement(
      element,
      element.parentNode,
      selectorArr,
      ++selectorIndex,
    );
  }

  if (selectorArr[selectorIndex] === '+') {
    const isMatchedAdjacent = matchElement(
      prevElement.previousElementSibling,
      selectorArr[++selectorIndex],
    );
    if (!isMatchedAdjacent) {
      return false;
    }
    if (
      element.parentNode.nodeName === '#document' ||
      selectorIndex === selectorArr.length - 1
    ) {
      return isMatchedAdjacent;
    }
    return recursionElement(
      element,
      element.parentNode,
      selectorArr,
      ++selectorIndex,
    );
  }

  const isMatched = matchElement(element, selectorArr[selectorIndex]);
  /* console.log(
    element,
    element.parentNode,
    selectorArr[selectorIndex],
    selectorIndex,
    isMatched,
  ); */

  if (!selectorIndex && !isMatched) {
    return false;
  }

  if (element.parentNode.nodeName === '#document') {
    return isMatched;
  }

  if (isMatched) {
    if (selectorIndex === selectorArr.length - 1) {
      return isMatched;
    }
    return recursionElement(
      element,
      element.parentNode,
      selectorArr,
      ++selectorIndex,
    );
  }
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

// console.log('\n简单选择器测试：');
// match('*', document.getElementById('id'), true);
// match('#id', document.getElementById('id'), true);
// match('.class', document.getElementById('id'), true);
// match('[data-test]', document.getElementById('id'), true);
// match('[data-test="testValue"]', document.getElementById('id'), true);

// console.log('\n复合选择器测试：');
// match(
//   'div#id.class[data-test="testValue"]',
//   document.getElementById('id'),
//   true,
// );

// console.log('\n复杂选择器之后代选择器测试：');
// match('div *', document.getElementById('id'), true);
// match('body * #id.class', document.getElementById('id'), true);
// match('div #id.class', document.getElementById('id'), true);
// match('body div #id.class', document.getElementById('id'), true);
// match('body #id.class', document.getElementById('id'), true);
// match('div div #id.class', document.getElementById('id'), false);
// match('div #id.class[data-test]', document.getElementById('id'), true);
// match('body div #id.class[data-test]', document.getElementById('id'), true);
// match('div div #id.class[data-test]', document.getElementById('id'), false);
// match(
//   'div #id.class[data-test="testValue"]',
//   document.getElementById('id'),
//   true,
// );
// match(
//   'div div#id.class[data-test="testValue"]',
//   document.getElementById('id'),
//   true,
// );
// match(
//   'body div #id.class[data-test="testValue"]',
//   document.getElementById('id'),
//   true,
// );
// match(
//   'div div #id.class[data-test="testValue"]',
//   document.getElementById('id'),
//   false,
// );

// console.log('\n复杂选择器之子代选择器测试：');
// match('body > div > #id.class', document.getElementById('id'), true);
// match('body > #id.class', document.getElementById('id'), false);

console.log('\n复杂选择器之相邻兄弟选择器测试：');
match(
  'body > #AdjacentSibling + #id.class',
  document.getElementById('id'),
  true,
);
match('body div + #id.class', document.getElementById('id'), false);
match('body + #id.class', document.getElementById('id'), false);

// console.log('\n测试不同元素：');
// match('div #id.class', document.querySelector('.class1'), false);
// match('body div #id.class', document.querySelector('.class1'), false);
// match('div div #id.class', document.querySelector('.class1'), false);
// match('div #id.class[data-test]', document.querySelector('.class1'), false);
// match(
//   'body div #id.class[data-test]',
//   document.querySelector('.class1'),
//   false,
// );
// match('div div #id.class[data-test]', document.querySelector('.class1'), false);
