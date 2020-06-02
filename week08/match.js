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
  // console.log(selectors, classNameSet);

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
function recursionElement(element, selectorArr, selectorIndex) {
  const isMatched = matchElement(element, selectorArr[selectorIndex]);
  // console.log(element, selectorArr, selectorIndex, isMatched);

  // 当已遍历完选择器，读取当前的匹配结果
  if (selectorIndex === selectorArr.length - 1) {
    return isMatched;
  }

  // 如果未遍历完选择器，且当前选择器可匹配当前元素，则继续遍历其父级
  if (isMatched) {
    return recursionElement(element.parentNode, selectorArr, ++selectorIndex);
  }

  return false;
}

function match(selector, element) {
  // 将选择器拆分
  const selectorArr = selector.split(' ').reverse();
  const result = recursionElement(element, selectorArr, 0);
  console.log(selector, element, result);

  return result;
}

// console.log('简单选择器测试：');
// match('#id', document.getElementById('id'));
// match('.class', document.getElementById('id'));
// match('[data-test]', document.getElementById('id'));
// match('[data-test="testValue"]', document.getElementById('id'));

// console.log('复合选择器测试：');
// match('div#id.class[data-test="testValue"]', document.getElementById('id'));

// console.log('复杂选择器之后代选择器测试：');
// match('div #id.class', document.getElementById('id'));
// match('body #id.class', document.getElementById('id'));
// match('body div #id.class', document.getElementById('id'));
// match('div div #id.class', document.getElementById('id'));
// match('div #id.class[data-test]', document.getElementById('id'));
// match('body div #id.class[data-test]', document.getElementById('id'));
// match('div div #id.class[data-test]', document.getElementById('id'));
// match('div #id.class[data-test="testValue"]', document.getElementById('id'));
// match('div div#id.class[data-test="testValue"]', document.getElementById('id'));
// match(
//   'body div #id.class[data-test="testValue"]',
//   document.getElementById('id'),
// );
// match(
//   'div div #id.class[data-test="testValue"]',
//   document.getElementById('id'),
// );

// console.log('测试不同元素：');
// match('div #id.class', document.querySelector('.class1'));
// match('body div #id.class', document.querySelector('.class1'));
// match('div div #id.class', document.querySelector('.class1'));
// match('div #id.class[data-test]', document.querySelector('.class1'));
// match('body div #id.class[data-test]', document.querySelector('.class1'));
// match('div div #id.class[data-test]', document.querySelector('.class1'));
