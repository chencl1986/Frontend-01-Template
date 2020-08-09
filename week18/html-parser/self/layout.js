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

  // 标识是否已自动设置了父级的宽度
  let isAutoMainSize = false;

  // 如果父元素没有设置宽度值，会根据子元素宽度撑开
  if (!style[mainSize]) {
    // 设置初始宽度为0
    elementStyle[mainSize] = 0;

    for (var i = 0; i < items.length; i++) {
      let item = items[i];
      // 自己加入的
      const itemStyle = getStyle(item);

      // 将所有子元素的宽度累加为当前元素的宽度
      if (itemStyle[mainSize] !== null || itemStyle[mainSize] !== void 0) {
        elementStyle[mainSize] = elementStyle[mainSize] + itemStyle[mainSize];
      }
    }

    // 标识已完成宽度的自动计算
    isAutoMainSize = true;
  }

  // 计算子元素Layout
  var flexLine = []; // 表示子元素的当前行
  var flexLines = [flexLine]; // 表示元素的所有行
  var mainSpace = elementStyle[mainSize]; // 元素在当前行排版之后的剩余空间
  var crossSpace = 0; // 存储每一行的交叉轴尺寸

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const itemStyle = getStyle(item);

    // 如果当前子元素没有设置主轴尺寸，则默认为0
    if (itemStyle[mainSize] === null || itemStyle[mainSize] === undefined) {
      itemStyle[mainSize] = 0;
    }

    // 子元素设置了flex属性，代表其可伸缩，必然可以放在当前行中，则将其放置进当前行
    if (itemStyle.flex) {
      flexLine.push(item);
    }

    // 如果父元素设置了不换行，则强制将子元素放入当前行
    else if (style.flexWrap === 'nowrap' && isAutoMainSize) {
      // 计算剩余空间
      mainSpace -= itemStyle[mainSize];

      // 将父元素交叉轴高度设置为子元素的交叉轴高度
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== void 0) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
      }

      // 将子元素放入当前行
      flexLine.push(item);
    } else {
      // 如果子元素超出了父元素宽度，则将子元素宽度设置为父元素宽度
      if (itemStyle[mainSize] > style[mainSize]) {
        itemStyle[mainSize] = style[mainSize];
      }

      // 如果当前子元素宽度已经超过剩余空间
      if (mainSpace < itemStyle[mainSize]) {
        // 创建新行之前，将当前行的剩余宽度和交叉轴高度写入当前行
        flexLine.mainSpace = mainSpace;
        flexLine.crossSpace = crossSpace;

        // 创建一个新行
        flexLine = [];
        // 将新行存入当前布局中
        flexLines.push(flexLine);
        // 为新行添加元素
        flexLine.push(item);

        // 重置当前行宽度
        mainSpace = style[mainSize];
        // 重置当前行的交叉轴尺寸
        crossSpace = 0;
      } else {
        // 如果未超出当前剩余宽度，则将当前子元素存入当前行
        flexLine.push(item);
      }

      // 当前父元素的交叉轴高度为当前子元素和父元素高度的最大值
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== void 0) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
      }

      // 当前的剩余宽度需要扣除当前子元素的宽度
      mainSpace -= itemStyle[mainSize];
    }
  }

  // 由于在循环过程中，是在创建新行之前，将当前行的剩余宽度和交叉轴高度写入当前行
  // 在循环结束后，需要存储一次最后一行的剩余宽度和交叉轴高度
  flexLine.mainSpace = mainSpace;
  // flexLine.crossSpace = crossSpace;

  // 如果是不可换行切自动计算宽度
  if (style.flexWrap === 'nowrap' || isAutoMainSize) {
    // 若父级交叉轴高度存在，则将当前交叉轴高度设置为父级高度，否则设置为当前行的交叉轴高度
    flexLine.crossSpace =
      style[crossSize] !== undefined ? style[crossSize] : crossSpace;
  } else {
    // 若是可换行，则设置为当前行交叉轴高度
    flexLine.crossSpace = crossSpace;
  }

  // 在单行的情况下，会出现mainSpace为负。
  // 即子元素在排满当前行之后，没有生育空间
  // 此时需要对子元素进行缩放
  if (mainSpace < 0) {
    // 计算当前的缩放比例，由于mainSpace为负，scale必然小于0
    const scale = style[mainSize] / (style[mainSize] - mainSpace);
    // 设置当前排版位置初始值
    let currentMain = mainBase;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemStyle = getStyle(item);

      // 设置flex属性的元素，在子元素超出父级宽度之后，都会被设置为0
      if (itemStyle.flex) {
        itemStyle[mainSize] = 0;
      }

      // 其他元素则按比例缩放
      itemStyle[mainSize] = itemStyle[mainSize] * scale;

      // 设置当前元素的排版位置
      itemStyle[mainStart] = currentMain;
      // 设置当前元素排版的结束位置
      itemStyle[mainEnd] =
        itemStyle[mainStart] + mainSign * itemStyle[mainSize];
      // 设置下一个元素的排版起始位置
      currentMain = itemStyle[mainEnd];
    }
  }

  // 多行的情况
  else {
    flexLines.forEach((items) => {
      // 当前行剩余空间
      let mainSpace = items.mainSpace;
      // 当前行flex总值，用于计算剩余宽度中，flex属性元素的排版比例
      let flexTotal = 0;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        let itemStyle = getStyle(item);

        if (itemStyle.flex !== null && itemStyle.flex !== void 0) {
          // 计算flex总值
          flexTotal += itemStyle.flex;
          continue;
        }
      }

      // 需要计算flex元素宽度
      if (flexTotal > 0) {
        let currentMain = mainBase;

        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          let itemStyle = getStyle(item);

          // 为有flex属性的元素设置宽度
          if (itemStyle.flex) {
            // 按照当前元素在总flex中的比例设置其宽度
            itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;
          }

          // 设置当前元素的排版位置
          itemStyle[mainStart] = currentMain;
          // 设置当前元素排版的结束位置
          itemStyle[mainEnd] =
            itemStyle[mainStart] + mainSign * itemStyle[mainSize];
          // 设置下一个元素的排版起始位置
          currentMain = itemStyle[mainEnd];
        }
      } else {
        // 如果没有flex属性元素，此时还会有剩余空间，justifyContent属性就会被触发，进行方向排版
        if (style.justifyContent === 'flex-start') {
          // 设置当前排版位置初始值
          var currentMain = mainBase;
          // 设置元素的间距初始值
          var step = 0;
        }
        if (style.justifyContent === 'flex-end') {
          // 设置当前排版位置初始值
          var currentMain = mainSpace * mainSign + mainBase;
          // 设置元素的间距初始值
          var step = 0;
        }
        if (style.justifyContent === 'center') {
          // 设置当前排版位置初始值
          var currentMain = (mainSpace / 2) * mainSign + mainBase;
          // 设置元素的间距初始值
          var step = 0;
        }
        if (style.justifyContent === 'space-between') {
          // 设置当前排版位置初始值
          var currentMain = mainBase;
          // 设置元素的间距初始值
          var step = (mainSpace / (items.length - 1)) * mainSign;
        }
        if (style.justifyContent === 'space-around') {
          // 设置元素的间距初始值
          var step = (mainSpace / items.length) * mainSign;
          // 设置当前排版位置初始值
          var currentMain = step / 2 + mainBase;
        }

        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          let itemStyle = getStyle(item);

          // 设置当前元素的排版位置
          itemStyle[mainStart] = currentMain;
          // 设置当前元素排版的结束位置
          itemStyle[mainEnd] =
            itemStyle[mainStart] + mainSign * itemStyle[mainSize];
          // 设置下一个元素的排版起始位置，元素之间有间隔，因此要加上step
          currentMain = itemStyle[mainEnd] + step;
        }
      }
    });
  }

  // 计算交叉轴尺寸
  // 对应设置了align-items、align-self属性
  var crossSpace;

  // 父元素未设置高度，即没有交叉轴尺寸
  if (!style[crossSize]) {
    crossSpace = 0;
    elementStyle[crossSize] = 0;

    // 根据当前各行高度自动撑开
    for (let i = 0; i < flexLines.length; i++) {
      elementStyle[crossSize] =
        elementStyle[crossSize] + flexLines[i].crossSpace;
    }
  } else {
    crossSpace = style[crossSize];

    for (let i = 0; i < flexLines.length; i++) {
      // 扣除每个元素的交叉抽尺寸
      crossSpace -= flexLines[i].crossSpace;
    }
  }

  // 反转交叉轴方向
  if (style.flexWrap === 'wrap-reverse') {
    crossBase = style[crossSize];
  } else {
    crossBase = 0;
  }

  // 计算每一行的交叉轴尺寸
  var lineSize = style[crossSize] / flexLines.length;

  var step;

  if (style.alignContent === 'flex-start') {
    // 设置当前排版位置初始值
    crossBase += 0;
    // 设置元素的间距初始值
    step = 0;
  }
  if (style.alignContent === 'flex-end') {
    // 设置当前排版位置初始值
    crossBase += crossSign * crossSpace;
    // 设置元素的间距初始值
    step = 0;
  }
  if (style.alignContent === 'center') {
    // 设置当前排版位置初始值
    crossBase += (crossSign * crossSpace) / 2;
    // 设置元素的间距初始值
    step = 0;
  }
  if (style.alignContent === 'space-between') {
    // 设置当前排版位置初始值
    crossBase += 0;
    // 设置元素的间距初始值
    step = crossSpace / (flexLines.length - 1);
  }
  if (style.alignContent === 'space-around') {
    // 设置元素的间距初始值
    step = crossSpace / flexLines.length;
    // 设置当前排版位置初始值
    crossBase += (crossSign * step) / 2;
  }
  if (style.alignContent === 'stretch') {
    // 设置当前排版位置初始值
    crossBase += 0;
    // 设置元素的间距初始值
    step = 0;
  }

  flexLines.forEach((items) => {
    var lineCrossSize =
      style.alignContent === 'stretch'
        ? items.crossSpace + crossSpace / flexLines.length
        : items.crossSpace;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      let itemStyle = getStyle(item);

      // alignSelf即设置单个元素的align，该属性优先级较高
      var align = itemStyle.alignSelf || style.alignItems;

      // stretch代表各行均匀分配
      if (itemStyle[crossSize] === null) {
        itemStyle[crossSize] = align === 'stretch' ? lineCrossSize : 0;
      }

      if (align === 'flex-start') {
        // 交叉轴高度起始位置
        itemStyle[crossStart] = crossBase;
        // 交叉轴高度终止位置
        itemStyle[crossEnd] =
          itemStyle[crossStart] + crossSign * itemStyle[crossSize];
      }

      if (align === 'flex-end') {
        // 交叉轴高度起始位置
        itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
        // 交叉轴高度终止位置
        itemStyle[crossStart] =
          itemStyle[crossEnd] - crossSign * itemStyle[crossSize];
      }

      if (align === 'center') {
        // 交叉轴高度起始位置
        itemStyle[crossStart] =
          crossBase + (crossSign * (lineCrossSize - itemStyle[crossSize])) / 2;
        // 交叉轴高度终止位置
        itemStyle[crossEnd] =
          itemStyle[crossStart] + crossSign * itemStyle[crossSize];
      }

      if (align === 'stretch') {
        // 交叉轴高度起始位置
        itemStyle[crossStart] = crossBase;
        // 交叉轴高度终止位置
        itemStyle[crossEnd] =
          crossBase +
          crossSign *
            (itemStyle[crossSize] !== null && itemStyle[crossSize] !== void 0
              ? itemStyle[crossSize]
              : lineCrossSize);

        // 元素交叉轴高度，stretch会改变元素在交叉轴方向的高度
        itemStyle[crossSize] =
          crossSign * (itemStyle[crossEnd] - itemStyle[crossStart]);
      }
    }

    // 每次循环后加上当前行的高度
    crossBase += crossSign * (lineCrossSize + step);
  });

  console.log(items);
}

module.exports = layout;
