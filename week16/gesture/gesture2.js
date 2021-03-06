let element = document.body;
let context = Object.create(null);
let MOUSE_SYMBOL = Symbol('move');

if (document.ontouchstart !== null)
  element.addEventListener('mousedown', () => {
    context[MOUSE_SYMBOL] = Object.create(null);
    start(event, context[MOUSE_SYMBOL]);
    let mousemove = (event) => {
      move(event, context[MOUSE_SYMBOL]);
    };

    let mouseend = (event) => {
      end(event, context[MOUSE_SYMBOL]);
      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseend);
    };

    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseend);
  });

element.addEventListener('touchstart', (event) => {
  for (const touch of event.changedTouches) {
    context[touch.identifier] = Object.create(null);
    start(touch, context[touch.identifier]);
  }
});

element.addEventListener('touchmove', (event) => {
  for (const touch of event.changedTouches) {
    move(touch, context[touch.identifier]);
  }
});

element.addEventListener('touchend', (event) => {
  for (const touch of event.changedTouches) {
    end(touch, context[touch.identifier]);
    delete context[touch.identifier];
  }
});

element.addEventListener('touchcancel', (event) => {
  for (const touch of event.changedTouches) {
    cancel(touch, context[touch.identifier]);
    delete context[touch.identifier];
  }
});

// tap
// pan -- panstart panmove panend
// flick
// press -- pressstart pressend

let start = (point, context) => {
  context.startX = point.clientX;
  context.startY = point.clientY;
  context.isTap = true;
  context.isPan = false;
  context.isPress = false;
  context.timeoutHandler = setTimeout(() => {
    if (context.isPan) {
      return;
    }
    context.isTap = false;
    context.isPan = false;
    context.isPress = true;
    console.log('pressstart');
  }, 500);
};

let move = (point, context) => {
  let dx = point.clientX - context.startX;
  let dy = point.clientY - context.startY;
  // console.log('move');

  if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
    context.isTap = false;
    context.isPan = true;
    context.isPress = false;
    console.log('panstart');
  }

  if (context.isPan) {
    console.log('pan');
  }
};

let end = (point, context) => {
  if (context.isPan) {
    console.log('panend');
  }
  if (context.isTap) {
    console.log('tap');
  }
  if (context.isPress) {
    console.log('pressend');
  }
  clearTimeout(context.timeoutHandler);
};

let cancel = (point, context) => {
  console.log('cancel');
  clearTimeout(context.timeoutHandler);
};
