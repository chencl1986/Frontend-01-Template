let element = document.body;

element.addEventListener('mousedown', () => {
  start(event);
  let mousemove = (event) => {
    move(event);
  };

  let mouseend = (event) => {
    end(event);
    document.removeEventListener('mousemove', mousemove);
    document.removeEventListener('mouseup', mouseend);
  };

  document.addEventListener('mousemove', mousemove);
  document.addEventListener('mouseup', mouseend);
});

element.addEventListener('touchstart', (event) => {
  for (const touch of event.changedTouches) {
    start(touch);
  }
});

element.addEventListener('touchmove', (event) => {
  for (const touch of event.changedTouches) {
    move(touch);
  }
});

element.addEventListener('touchend', (event) => {
  for (const touch of event.changedTouches) {
    end(touch);
  }
});

element.addEventListener('touchcancel', (event) => {
  for (const touch of event.changedTouches) {
    cancel(touch);
  }
});

let start = (point) => {
  console.log('start', point.clientX, point.clientY);
};

let move = (point) => {
  console.log('move', point.clientX, point.clientY);
};

let end = (point) => {
  console.log('end', point.clientX, point.clientY);
};

let cancel = (point) => {
  console.log('cancel');
};
