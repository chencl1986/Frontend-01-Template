//
class TimeLine {
  constructor() {
    this.animation = [];
    this.requestID = null;
    this.tick = () => {
      let t = Date.now() - this.startTime;

      let animations = this.animation.filter(
        (animation) => !animation.finished,
      );

      for (const animation of animations) {
        let {
          object,
          property,
          template,
          start,
          end,
          duration,
          delay,
          timingFunction,
        } = animation;

        let progression = timingFunction((t - delay) / duration); // 0-1之间的数字

        if (t > animation.duration + animation.delay) {
          progression = 1;
          animation.finished = true;
        }

        let value = start + progression * (end - start);

        object[property] = template(value);
      }

      if (animations.length) {
        this.requestID = requestAnimationFrame(this.tick);
      }
    };
  }

  pause() {
    this.pauseTime = Date.now();
    if (this.requestID !== null) {
      cancelAnimationFrame(this.requestID);
    }
  }

  resume() {
    this.startTime += Date.now() - this.pauseTime;
    this.tick();
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
    this.timingFunction = timingFunction;
  }
}

let linear = (t) => t;
let ease = cubicBezier(0.24, 0.1, 0.25, 1);

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
    0,
    linear,
  ),
);

tl.start();

document.getElementById('pause-btn').addEventListener('click', () => {
  tl.pause();
});

document.getElementById('resume-btn').addEventListener('click', () => {
  tl.resume();
});

// document.getElementById('el2').style.transform = 'translateX(200px)';

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
