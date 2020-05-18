// 创建一个唯一的文件结束标识字符
const EOF = Symbol('EOF'); // EOF: End OF File
// 存储当前token数据
let currentToken = null;
// 存储当前属性数据
let currentAttribute = null;

// 进行token输出方法
function emit(currentToken) {
  if (currentToken.type !== 'text') {
    console.log(currentToken);
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
  }

  // 用EOF表示文件已结束
  state = state(EOF);
};
