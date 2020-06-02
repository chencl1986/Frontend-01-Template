const images = require('images');

function render(viewport, element) {
  console.log(element);
  if (element.style) {
    let img = images(element.style.width, element.style.height);

    if (element.style['background-color']) {
      let color = element.style['background-color'] || 'rgb(0,0,0)';
      console.log(color);
      color.match(/rgb\((\d+),(\d+),(\d+)\)/);
      console.log(Number(RegExp.$1), Number(RegExp.$2), Number(RegExp.$3));
      img.fill(Number(RegExp.$1), Number(RegExp.$2), Number(RegExp.$3));
      viewport.draw(img, element.style.left || 0, element.style.top || 0);
    }
  }
}

module.exports = render;