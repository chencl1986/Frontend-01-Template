let dragable = document.getElementById('dragable');
let baseX = 0;
let baseY = 0;

dragable.addEventListener('mousedown', () => {
  let startX = event.clientX;
  let startY = event.clientY;

  let move = (event) => {
    /* let x = baseX + event.clientX - startX;
    let y = baseY + event.clientY - startY;
    dragable.style.transform = `translate(${x}px, ${y}px)`; */

    let range = nearest(event.clientX, event.clientY);
    range.insertNode(dragable)
  };

  let up = (event) => {
    baseX = baseX + event.clientX - startX;
    baseY = baseY + event.clientY - startY;

    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', up);
  };

  // document绑定的事件，在浏览器外部，如控制台中，也会继续触发
  document.addEventListener('mousemove', move);
  document.addEventListener('mouseup', up);
});

let ranges = [];

let container = document.getElementById('container');

for (let i = 0; i < container.childNodes[0].textContent.length; i++) {
  let range = document.createRange();
  range.setStart(container.childNodes[0], i);
  range.setEnd(container.childNodes[0], i);
  console.log(range.getBoundingClientRect());
  ranges.push(range);
}

function nearest(x0, y0) {
  let nearestRange = null;
  let distance = Infinity;

  for (const range of ranges) {
    let {x, y} = range.getBoundingClientRect();
    let d = (x0 - x) ** 2 + (y0 - y) ** 2;

    if (d < distance) {
      nearestRange = range;
      distance = d;
    }
  }

  return nearestRange;
}

document.addEventListener('selectstart', (event) => {
  event.preventDefault();
});
