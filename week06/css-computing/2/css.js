const css = require('css');
let rules = []; // 储存CSS规则

// 添加CSS规则
module.exports.addCSSRule = function addCSSRule(text) {
  const ast = css.parse(text);
  console.log(JSON.stringify(ast));
  rules.push(...ast.stylesheet.rules);
};

// 计算CSS
module.exports.computeCSS = function computeCSS(element) {
  console.log(rules);
  console.log('compute CSS for Element', element);
};
