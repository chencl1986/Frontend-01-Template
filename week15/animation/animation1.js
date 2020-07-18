//
class TimeLine {
  constructor() {
    this.animation = [];
  }

  tick() {
    let t = Date.now() - this.startTime;

    for (const animation of this.animation) {
      if (t > this.animation.duration + this.animation.delay) {
        continue;
      }
      let {
        object,
        property,
        template,
        start,
        end,
        timingFunction,
        delay,
      } = animation;
      object[property] = template(timingFunction(start, end)(t - delay));
    }

    requestAnimationFrame(() => {
      this.tick();
    });
  }

  start() {
    this.startTime = Date.now();
    this.tick();
  }

  add(animation) {
    this.animation.push(animation);
  }
}

//
class Animation {
  constructor(
    object,
    property,
    template,
    start,
    end,
    duration,
    delay,
    timingFunction,
  ) {
    this.object = object;
    this.template = template;
    this.property = property;
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.delay = delay || 0;
    this.timingFunction =
      timingFunction ||
      ((start, end) => {
        return (t) => {
          return start + (t / duration) * (end - start);
        };
      });
  }
}

let el = document.getElementById('el');
let tl = new TimeLine();

tl.add(
  new Animation(
    el.style,
    'transform',
    (v) => {
      return `translate(${v}px)`;
    },
    0,
    200,
    5000,
  ),
);

tl.start();

/* 

let animation = new Animation(object, property, start, end, duration, delay, timingFunction)
let animation2 = new Animation(object2, property2, start, end, duration, delay, timingFunction)

let timeLine = new TimeLine
timeLine.add(animation)
timeLine.add(animation2)

timeLine.start()
timeLine.pause()
timeLine.resume()
timeLine.stop()

setTimeout
setInterval
requestAnimationFrame

 */
