function getStyle(element) {
  if (!element.style) {
    element.style = {};
  }

  // 提取每个元素的样式
  for (const prop in element.computedStyle) {
    const value = element.computedStyle.value;
    // 从computedStyle中把样式的key-value提取出来
    element.style[prop] = element.computedStyle[prop].value;

    // 为方便计算，将所有涉及到数值的参数转换为数字
    // 当样式是px为单位时，将其转换为数字
    if (element.style[prop].toString().match(/px$/)) {
      element.style[prop] = parseInt(element.style[prop]);
    }

    // 当样式的值是数字字符串时，将其转换为数字
    if (element.style[prop].toString().match(/^[0-9\.]+$/)) {
      element.style[prop] = parseInt(element.style[prop]);
    }
  }

  return element.style;
}

function layout(element) {
  // 如果当前元素没有样式，则不处理
  if (!element.computedStyle) {
    return;
  }

  // 对样式进行预处理，即将数值都转换为数字类型，方便处理
  let elementStyle = getStyle(element);

  // 如果不是Flex布局，则不进行处理
  if (elementStyle.display !== 'flex') {
    return;
  }

  // 过滤出元素类型节点，去除文本节点
  const items = element.children.filter(
    (element) => element.type === 'element',
  );

  // 将元素从小到大排列
  items.sort(function (a, b) {
    return (a.order || 0) - (b.order || 0);
  });

  const style = elementStyle;

  // 将宽高属性为auto或者空的值，设置为null
  // 方便之后统一进行判断
  ['width', 'height'].forEach((size) => {
    if (style[size] === 'auto' || style[size] === '') {
      style[size] = null;
    }
  });

  // 为部分属性设置默认值，也可以在parser中处理
  if (!style.flexDirection || style.flexDirection === 'auto') {
    style.flexDirection = 'row';
  }
  if (!style.alignItems || style.alignItems === 'auto') {
    style.alignItems = 'stretch';
  }
  if (!style.justifyContent || style.justifyContent === 'auto') {
    style.justifyContent = 'flex-start';
  }
  if (!style.flexWrap || style.flexWrap === 'auto') {
    style.flexWrap = 'nowrap';
  }
  if (!style.alignContent || style.alignContent === 'auto') {
    style.alignContent = 'stretch';
  }

  let mainSize, // 主轴Size属性
    mainStart, // 主轴起始方向
    mainEnd, // 主轴结束方向
    mainSign, // 拍板方向，若为横轴方向排版，从左往右则为正，从右往左则为负
    mainBase, // 排版的起点位置，若为横轴方向排版，从左向右则为容器宽度0位置，从右往左则为容器宽度width为100%的 位置
    // 下面5个为交叉轴的标识变量，含义与主轴相同
    crossSize,
    crossStart,
    crossEnd,
    crossSign,
    crossBase;

  if (style.flexDirection === 'row') {
    mainSize = 'width';
    mainStart = 'left';
    mainEnd = 'right';
    mainSign = +1;
    mainBase = 0;

    crossSize = 'height';
    crossStart = 'top';
    crossEnd = 'bottom';
  }
  if (style.flexDirection === 'row-reverse') {
    mainSize = 'width';
    mainStart = 'right';
    mainEnd = 'left';
    mainSign = -1;
    mainBase = style.width; // 此为容器宽度

    crossSize = 'height';
    crossStart = 'top';
    crossEnd = 'bottom';
  }
  if (style.flexDirection === 'column') {
    mainSize = 'height';
    mainStart = 'top';
    mainEnd = 'bottom';
    mainSign = +1;
    mainBase = 0;

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'right';
  }
  if (style.flexDirection === 'column-reverse') {
    mainSize = 'height';
    mainStart = 'bottom';
    mainEnd = 'top';
    mainSign = -1;
    mainBase = style.height;

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'right';
  }

  // wrap-reverse反转了交叉轴方向，需要把crossStart和crossEnd互换
  if (style.flexWrap === 'wrap-reverse') {
    const temp = crossStart;
    crossStart = crossEnd;
    crossEnd = temp;
    crossSign = -1;
  } else {
    crossBase = 0;
    crossSign = 1;
  }
}

module.exports = layout;
