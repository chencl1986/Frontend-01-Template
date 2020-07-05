let dragable = document.getElementById('dragable');
let baseX = 0;
let baseY = 0;

dragable.addEventListener('mousedown', () => {
  let startX = event.clientX;
  let startY = event.clientY;

  let move = (event) => {
    let x = baseX + event.clientX - startX;
    let y = baseY + event.clientY - startY;
    dragable.style.transform = `translate(${x}px, ${y}px)`;
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
