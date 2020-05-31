const images = require('images');

function render(viewport, element) {
  if (element.style) {
    let img = images(element.style.width, element.style.height);

    if (element.style['background-color']) {
      // 在真实浏览器中，此处还需要实现shader
      let color = element.style['background-color'] || 'rgb(0,0,0)';
      color.match(/rgb\((\d+),(\d+),(\d+)\)/);
      // 此步骤为渲染
      img.fill(Number(RegExp.$1), Number(RegExp.$2), Number(RegExp.$3));
      // 此步骤为绘制
      viewport.draw(img, element.style.left || 0, element.style.top || 0);
    }
  }

  // 递归实现所有元素的绘制
  if (element.children) {
    for (const child of element.children) {
      render(viewport, child);
    }
  }
}

module.exports = render;
