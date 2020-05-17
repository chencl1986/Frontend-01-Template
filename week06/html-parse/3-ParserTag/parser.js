// 创建一个唯一的文件结束标识字符
const EOF = Symbol('EOF'); // EOF: End OF File
// 存储当前token数据
let currentToken = null;

// 初始状态
function data(char) {
  if (char === '<') {
    // 遇到 < 表示标签开始
    return tagOpen;
  } else if (char === EOF) {
    // 遇到EOF表示处理结束
    return;
  } else {
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
    // 遇到字母则开始读取标签名称
    return tagName(char);
  } else {
    return;
  }
}

function endTagOpen(char) {
  if (char.match(/^[a-zA-Z]$/)) {
    // 遇到字母则开始读取结束标签名称
    currentToken = {
      type: 'endTag',
      tagName: '',
    };

    return tagName(char);
  } else if (char === '>') {
  } else if (char === EOF) {
  } else {
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
  } else if (char.match(/^[a-zA-Z]$/)) {
    // 遇到字母表示此为标签名称，继续进行处理
    return tagName;
  } else if (char === '>') {
    // 遇到 > 表示处理完毕，进入初始状态判断
    return data;
  } else {
    // 默认状态为继续处理标签名
    return tagName;
  }
}

function beforeAttributeName(char) {
  if (char.match(/^[\t\n\f ]$/)) {
    // 遇到各种空格，表示需要继续等待处理属性名
    return beforeAttributeName;
  } else if (char === '/' || char === '>' || char === EOF) {
    // 遇到 > 表示处理完毕，进入初始状态判断
    return data;
  } else if (char === '=') {
    // 此处需要抛出错误
    return beforeAttributeName;
  } else {
    // 处理属性名
    return beforeAttributeName;
  }
}

function selfClosingStartTag(char) {
  if (char === '>') {
    // 遇到 > 表示处理完毕
    currentToken.isSelfClosing = true;
    // 进入初始状态判断
    return data;
  } else if (char === EOF) {
  } else {
  }
}

module.exports.parseHTML = function parseHTML(html) {
  let state = data;

  for (const char of html) {
    state = state(char);
  }

  // 用EOF表示文件已结束
  state = state(EOF);
};
