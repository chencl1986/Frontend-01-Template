// const css = require('css');
// 创建一个唯一的文件结束标识字符
const EOF = Symbol('EOF'); // EOF: End OF File
// const layout = require('./layout');
// 存储当前token数据
let currentToken = null;
// 存储当前属性数据
let currentAttribute = null;
// 存储当前文本节点
let currentTextNode = null;
// 创建栈来生成DOM树
let stack = [
  {
    type: 'document', // 根节点默认为document
    children: [],
  },
];
let rules = []; // 储存CSS规则

// 添加CSS规则
function addCSSRule(text) {
  const ast = css.parse(text);
  rules.push(...ast.stylesheet.rules);
}

// 匹配选择器和元素算法
function match(element, selector) {
  // 由于之后要使用selector和element.attributes对比，防止它们为undefined
  if (!selector || !element.attributes) {
    return false;
  }

  // id选择器判断
  if (selector.charAt(0) === '#') {
    // 抽取当前元素的id属性值
    const attr = element.attributes.filter((attr) => attr.name === 'id')[0];

    // 对比当前元素的id属性值和选择器是否相等
    if (attr && attr.value === selector.replace('#', '')) {
      return true;
    }
  }

  // 类名选择器判断
  else if (selector.charAt(0) === '.') {
    // 抽取当前元素的class属性值
    // 标签的class属性可为空格分隔，实际需要增加此判断，此处略过
    const attr = element.attributes.filter((attr) => attr.name === 'class')[0];

    // 对比当前元素的class属性值和选择器是否相等
    if (attr && attr.value === selector.replace('.', '')) {
      return true;
    }
  }

  // 元素选择器判断
  else {
    if (element.tagName === selector) {
      return true;
    }
  }

  return false;
}

// 选择器优先级计算
function specificity(selector) {
  // 优先级计算用数组，分别代表[内联样式, ID选择器, 类名选择器, 标签选择器]
  // 此处未实现复合选择器，如div.cls#id
  // https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity
  // https://drafts.csswg.org/selectors-3/#specificity
  let priority = [0, 0, 0, 0];
  const selectorParts = selector.split(' ');

  for (const part of selectorParts) {
    if (part.charAt(0) === '#') {
      priority[1] += 1;
    } else if (part.charAt(0) === '.') {
      priority[2] += 1;
    } else {
      priority[3] += 1;
    }
  }

  return priority;
}

// 选择器优先级对比
function compare(sp1, sp2) {
  // 内联样式对比
  if (sp1[0] - sp2[0]) {
    return sp1[0] - sp2[0];
  }
  // ID选择器对比
  if (sp1[1] - sp2[1]) {
    return sp1[1] - sp2[1];
  }
  // 类名选择器对比
  if (sp1[2] - sp2[2]) {
    return sp1[2] - sp2[2];
  }
  // 标签选择器对比
  return sp1[3] - sp2[3];
}

// 计算CSS
function computeCSS(element) {
  // 获取父元素序列
  // 此时的stack中存放了当前元素的所有父元素
  // 使用slice方法将stack复制一份，避免之后的操作影响到stack
  // 在计算CSS时，要从当前元素向父级逐级查找，如匹配dev dev #myid
  // 因此将stack反转一下方便处理。
  var elements = stack.slice().reverse();

  // 为当前元素增加computedStyle属性，存储计算后的样式
  if (!element.computedStyle) {
    element.computedStyle = {};
  }

  for (const rule of rules) {
    // 选择器在rule中的存储为字符串，直接用空格拆拆分
    // 为了保持和elements一样的顺序，需要reverse
    const selectorParts = rule.selectors[0].split(' ').reverse();

    // 如果当前元素不是当前选择器选中的元素，则跳过
    if (!match(element, selectorParts[0])) {
      continue;
    }

    let matched = false; // 标识选择器与元素父级是否匹配
    let j = 1; // 记录匹配到的选择器索引

    for (let i = 0; i < elements.length; i++) {
      // 逐级匹配当前选择器和父级
      if (match(elements[i], selectorParts[j])) {
        j++;
      }

      // 此时选择器与元素父级可匹配
      if (j >= selectorParts.length) {
        matched = true;
      }

      // 如果选择器与元素父级可匹配
      if (matched) {
        // 此时要把样式加入元素的属性中
        const sp = specificity(rule.selectors[0]);
        const computedStyle = element.computedStyle;

        // 合并所有属性
        for (const declaration of rule.declarations) {
          // 由于需要处理属性优先级等操作，需要以对象形式保存computedStyle
          if (!computedStyle[declaration.property]) {
            computedStyle[declaration.property] = {};
          }

          // 如果
          if (!computedStyle[declaration.property].specificity) {
            computedStyle[declaration.property].value = declaration.value;
            computedStyle[declaration.property].specificity = sp;
          } else if (
            compare(computedStyle[declaration.property].specificity, sp) < 0
          ) {
            computedStyle[declaration.property].value = declaration.value;
            computedStyle[declaration.property].specificity.sp;
          }
        }
      }
    }
  }
}

// 进行token输出方法
function emit(currentToken) {
  let top = stack[stack.length - 1];

  // 为Token起始时，创建一个元素
  if (currentToken.type === 'startTag') {
    let element = {
      type: 'element',
      tagName: '',
      children: [],
      attributes: [],
    };
    element.tagName = currentToken.tagName;

    for (const prop in currentToken) {
      // 储存标签属性
      if (prop !== 'type' || prop !== 'tagName') {
        element.attributes.push({
          name: prop,
          value: currentToken[prop],
        });
      }
    }

    // 每次加载元素时，都进行一次CSS计算，避免全部加载后再计算造成的页面加载延迟
    // 即每次加载当前元素时，都会计算其之前元素的CSS
    // 最佳实践就是将CSS尽可能写在Header中
    computeCSS(element);

    // 将当前节点push到其父节点的children中
    top.children.push(element);
    // 将当前节点的parent属性指向其父节点，可用于计算CSS时逐级查找父元素序列。
    // 在当前实现中没有用到，因为直接在computeCSS方法中使用stack获取了。
    element.parent = top;

    // 处理非单标签
    if (!currentToken.isSelfClosing) {
      // 非单标签即入栈，等待接收其子节点
      stack.push(element);
    }
    currentTextNode = null;
  } else if (currentToken.type === 'endTag') {
    if (top.tagName !== currentToken.tagName) {
      // 实际浏览器遇到关闭标签不一致或缺失，也会进行处理
      throw new Error("Tag start end doesn't match");
    } else {
      // 遇到style标签时，执行添加CSS操作
      if (currentToken.tagName === 'style') {
        // addCSSRule(top.children[0].content);
      }
      // 此处只处理了第二代Layout方式，即Flex布局
      // 实际浏览器会根据当前的属性判断layout的运行位置，如果是处理第一代Layout，即正常流的盒模型的布局方式，通常会运行在startTag阶段，此处为处理方便，直接在endTag阶段进行处理
      // 由于layout时需要知道当前元素及其所有子元素的位置，因此在标签结束时运行
      // layout(top);
      // 当前节点处理完成之后，将当前节点出栈，等待处理其兄弟伙父节点
      stack.pop();
    }
    currentTextNode = null;
  } else if (currentToken.type === 'text') {
    // 如果当前没有节点则新建一个
    if (currentTextNode === null) {
      currentTextNode = {
        type: 'text',
        content: '',
      };
      top.children.push(currentTextNode);
    }
    // 存储文本内容
    currentTextNode.content += currentToken.content;
  }
}

// 初始状态
function data(char) {
  if (char === '<') {
    // 遇到 < 表示标签开始
    return tagOpen;
  } else if (char === EOF) {
    // 遇到EOF表示处理结束
    emit({
      type: 'EOF',
    });
    return;
  } else {
    // 文本内容，即标签内部内容
    emit({
      type: 'text',
      content: char,
    });
    // 不需要转换状态，继续按原状态处理
    return data;
  }
}

// 处理标签打开
function tagOpen(char) {
  if (char === '/') {
    // 遇到 / 表示标签结束
    return endTagOpen;
  } else if (char.match(/^[a-zA-Z]$/)) {
    // 此时已经确定读取到token，因此新建token
    currentToken = {
      type: 'startTag',
      tagName: '', // 初始名称为空
    };
    // 遇到字母则开始读取标签名称
    return tagName(char);
  } else {
    emit({
      type: 'text',
      content: char,
    });
    return;
  }
}

// 处理标签名称
function tagName(char) {
  if (char.match(/^[\t\n\f ]$/)) {
    // 当遇到各种空格，就表示开始等待处理属性名
    return beforeAttributeName;
  } else if (char === '/') {
    // 遇到 / 表示此为单标签关闭
    return selfClosingStartTag;
  } else if (char.match(/^[A-Z]$/)) {
    // 储存token名称
    currentToken.tagName += char;
    // 遇到字母表示此为标签名称，继续进行处理
    return tagName;
  } else if (char === '>') {
    // 检测到标签结束，则将标签输出
    emit(currentToken);
    // 遇到 > 表示处理完毕，进入初始状态判断
    return data;
  } else {
    currentToken.tagName += char;
    // 默认状态为继续处理标签名
    return tagName;
  }
}

function beforeAttributeName(char) {
  if (char.match(/^[\t\n\f ]$/)) {
    // 遇到各种空格，表示需要继续等待处理属性名
    return beforeAttributeName;
  } else if (char === '/' || char === '>' || char === EOF) {
    // 遇到/、>、EOF 表示处理完毕，进入初始状态判断
    return afterAttributeName(char);
  } else if (char === '=') {
    // 此处需要抛出错误
  } else {
    // 新增一个属性
    currentAttribute = {
      name: '',
      value: '',
    };
    // 处理属性名
    return attributeName(char);
  }
}

function attributeName(char) {
  if (
    char.match(/^[\t\n\f ]$/) ||
    char === '/' ||
    char === '>' ||
    char === EOF
  ) {
    // 遇到各种空格、/、>、EOF 表示处理完毕，进入初始状态判断
    return afterAttributeName(char);
  } else if (char === '=') {
    return beforeAttributeValue;
  } else if (char === '\u0000') {
  } else if (char === '"' || char === "'" || char === '<') {
  } else {
    currentAttribute.name += char;
    return attributeName;
  }
}

function beforeAttributeValue(char) {
  if (
    char.match(/^[\t\n\f ]$/) ||
    char === '/' ||
    char === '>' ||
    char === EOF
  ) {
    // 未检测到属性值，则继续等待
    return beforeAttributeValue;
  } else if (char === '"') {
    // 匹配双引号结束
    return doubleQuotedAttributeValue;
  } else if (char === "'") {
    // 匹配单引号结束
    return singleQuotedAttributeValue;
  } else if (char === '>') {
  } else {
    // 匹配无引号属性值
    return UnquotedAttributeValue(char);
  }
}

function doubleQuotedAttributeValue(char) {
  if (char === '"') {
    // 如果遇到"则标识处理完成，并存储属性都Token
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if (char === '\u0000') {
  } else if (char === EOF) {
  } else {
    // 存储属性值，并且继续处理
    currentAttribute.value += char;
    return doubleQuotedAttributeValue;
  }
}

function singleQuotedAttributeValue(char) {
  if (char === "'") {
    // 如果遇到'则标识处理完成，并存储属性都Token
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if (char === '\u0000') {
  } else if (EOF) {
  } else {
    // 存储属性值，并且继续处理
    currentAttribute.value += char;
    return singleQuotedAttributeValue;
  }
}

// 处理完属性之后，等待处理下一个属性
function afterQuotedAttributeValue(char) {
  if (char.match(/^[\t\n\f ]$/)) {
    // 未检测到属性，等待处理下一个属性
    return beforeAttributeName;
  } else if (char === '/') {
    // 表示遇到了单标签的结束
    return selfClosingStartTag;
  } else if (char === '>') {
    // 遇到>表示处理完成，储存属性并且输出Token
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    // 等待下一个处理的字符
    return data;
  } else if (char === EOF) {
  } else {
    // 保存属性值
    currentAttribute.value += char;
    return doubleQuotedAttributeValue;
  }
}

// 处理无引号属性值
function UnquotedAttributeValue(char) {
  if (char.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return beforeAttributeName;
  } else if (char === '/') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return selfClosingStartTag;
  } else if (char === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    // 等待下一个处理的字符
    return data;
  } else if (char === '\u0000') {
  } else if (
    char === '"' ||
    char === "'" ||
    char === '<' ||
    char === '=' ||
    char === '`'
  ) {
  } else if (char === EOF) {
  } else {
    currentAttribute.value += char;

    return UnquotedAttributeValue;
  }
}

// in script
function scriptData(c) {
  if (c === '<') {
    return scriptDatLessThanSign
  } else {
    return scriptData
  }
}

// in script received <
function scriptDataLessThanSign(c) {
  if (c === '/') {
    return scriptDataEndTagOpen
  } else {
    emit({
      type: 'text',
      content: ''
    })
  }
}

// in script reseived </
function scriptDataEndTagOpen(c) {
  if (c === '/') {
    return scriptDataEndTagOpenS
  } else {
    return scriptData
  }
}

// in script reseived </sc
function scriptDataEndTagOpenS(c) {
  if (c === 's') {
    return scriptDataEndTagOpenC
  } else {
    emit({
      type: 'text',
      content: '</s'
    })
    return scriptData
  }
}

// in script reseived </sc
function scriptDataEndTagOpenC(c) {
  if (c === 'c') {
    return scriptDataEndTagOpenR
  } else {
    emit({
      type: 'text',
      content: '</sc'
    })
    return scriptData
  }
}

// in script reseived </sc
function scriptDataEndTagOpenR(c) {
  if (c === 'r') {
    return scriptDataEndTagOpenI
  } else {
    emit({
      type: 'text',
      content: '</scr'
    })
    return scriptData
  }
}

// in script reseived </sc
function scriptDataEndTagOpenI(c) {
  if (c === 'i') {
    return scriptDataEndTagOpenP
  } else {
    emit({
      type: 'text',
      content: '</scri'
    })
    return scriptData
  }
}

// in script reseived </sc
function scriptDataEndTagOpenP(c) {
  if (c === 'p') {
    return scriptDataEndTagOpenT
  } else {
    emit({
      type: 'text',
      content: '</scrip'
    })
    return scriptData
  }
}

// in script reseived </sc
function scriptDataEndTagOpenT(c) {
  if (c === 't') {
    return scriptDataEndTagEnd
  } else {
    emit({
      type: 'text',
      content: '</script'
    })
    return scriptData
  }
}

// in script reseived </sc
function scriptDataEndTagEnd(c) {
  if (c === ' ') {
    return scriptDatLessThanSign
  }
}

function afterAttributeName(char) {
  if (char.match(/^[\t\n\f ]$/)) {
    // 进入等待状态，等待读取下一个属性名
    return afterAttributeName;
  } else if (char === '/') {
    return selfClosingStartTag;
  } else if (char === '=') {
    return beforeAttributeValue;
  } else if (char === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    // 等待下一个处理的字符
    return data;
  } else if (char === EOF) {
  } else {
    // 收到一个普通字符，代表读取到了 属性，将当前属性保存
    currentToken[currentAttribute.name] = currentAttribute.value;
    // 新增一个属性
    currentAttribute = {
      name: '',
      value: '',
    };

    // 开始读取属性名
    return attributeName(char);
  }
}

function selfClosingStartTag(char) {
  if (char === '>') {
    // 遇到 > 表示处理完毕，同时此处是一个单标签结束，需要做标识
    currentToken.isSelfClosing = true;
    emit(currentToken);
    // 进入初始状态判断
    return data;
  } else if (char === EOF) {
  } else {
  }
}

function endTagOpen(char) {
  if (char.match(/^[a-zA-Z]$/)) {
    // 创建一个结束标签的Token
    currentToken = {
      type: 'endTag',
      tagName: '',
    };

    // 遇到字母则开始读取结束标签名称
    return tagName(char);
  } else if (char === '>') {
  } else if (char === EOF) {
  } else {
  }
}

module.exports.parseHTML = function parseHTML(html) {
  let state = data;

  for (const char of html) {
    state = state(char);
    if (stack[stack.length - 1].tagName === 'script') {
      state = scriptData
    }
  }

  // 用EOF表示文件已结束
  state = state(EOF);
  return stack[0];
};
