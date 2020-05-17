// 创建一个唯一的文件结束标识字符
const EOF = Symbol('EOF'); // EOF: End OF File

function data(char) {
  if (char === EOF) {
    console.log('End OF File');
  }
  return data;
}

module.exports.parseHTML = function parseHTML(html) {
  let state = data;

  for (const char of html) {
    state = state(char);
  }

  // 用EOF表示文件已结束
  state = state(EOF);
};
