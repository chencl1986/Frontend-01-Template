import {cubicBezier} from './cubicBezier';

export class TimeLine {
  constructor(config = {loop: false}) {
    this.animations = [];
    this.requestID = null;
    this.state = 'inited';
    // 增加配置，例如运行时是触发事件等
    this.config = config;
    this.tick = () => {
      let t = Date.now() - this.startTime;

      let animations = this.animations.filter(
        (animation) => !animation.finished,
      );

      // 当所有动画都为finished状态时，表示动画已经运行完成，触发全部停止事件
      if (!animations.length) {
        this.config.onAllStop && this.config.onAllStop();
        // 如果设置了loop为true，则表示要循环播放，此时运行restart
        if (this.config.loop) {
          this.restart();
        }
      }
      for (const animation of animations) {
        let {
          object,
          property,
          template,
          duration,
          delay,
          timingFunction,
          addTime,
          key,
        } = animation;

        // 处理delay>0时，progression为负数导致delay未生效的问题
        // 考虑到timingFunction可能存在一些处理，因此还是把v设置为0，再传入timingFunction处理
        let time = (t - delay - addTime) / duration;
        let progression = timingFunction(time < 0 ? 0 : time); // 0-1之间的数字

        if (t > duration + delay + addTime) {
          progression = 1;
          animation.finished = true;
          // 触发播放完成事件，并传入key值，告知是哪段动画停止了。
          this.config.onStop && this.config.onStop(key);
        }

        // 如果time<0，说明还在delay中，不需要设置样式
        // 如果animations中存在多个相同元素，如果真在delay中的动画被设置style的时候会覆盖正在运行的动画
        if (time >= 0) {
          let value = animation.valueFromProgression(progression);
          object[property] = template(value, time);
        }
      }

      if (animations.length) {
        this.requestID = requestAnimationFrame(this.tick);
      }
    };
  }

  pause() {
    if (this.state !== 'playing') {
      return;
    }
    this.state = 'pause';
    this.pauseTime = Date.now();
    if (this.requestID !== null) {
      cancelAnimationFrame(this.requestID);
      // 触发暂停事件
      this.config.onPause && this.config.onPause();
    }
  }

  resume() {
    if (this.state !== 'pause') {
      return;
    }
    this.state = 'playing';
    this.startTime += Date.now() - this.pauseTime;
    this.tick();
    // 触发恢复播放事件
    this.config.onResume && this.config.onResume();
  }

  start() {
    if (this.state !== 'inited') {
      return;
    }
    this.state = 'playing';
    this.startTime = Date.now();
    this.tick();
    // 触发开始播放事件
    this.config.onStart && this.config.onStart();
  }

  restart() {
    if (this.state === 'playing') {
      this.pause();
    }
    // 将finished置为false，确保动画可以正常开始
    this.animations.forEach((animation) => {
      animation.finished = false;
    });
    this.requestID = null;
    this.state = 'playing';
    this.startTime = Date.now();
    this.pauseTime = null;
    this.tick();
    // 触发重新播放事件
    this.config.onRestart && this.config.onRestart();
  }

  add(animation, addTime) {
    this.animations.push(animation);
    animation.finished = false;
    if (this.state === 'playing') {
      animation.addTime =
        addTime !== void 0 ? addTime : Date.now() - this.startTime;
    } else {
      animation.addTime = addTime !== void 0 ? addTime : 0;
    }
  }
}

export class Animation {
  constructor(
    object,
    property,
    start,
    end,
    duration,
    delay,
    timingFunction,
    template,
    key, // 传入一个唯一的标识key，用来标识此段动画，可以用于调试或者事件判断等。
  ) {
    this.key = key;
    this.object = object;
    this.template = template;
    this.property = property;
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.delay = delay || 0;
    this.timingFunction = timingFunction;
  }

  valueFromProgression(progression) {
    return this.start + progression * (this.end - this.start);
  }
}

export class ColorAnimation {
  constructor(
    object,
    property,
    start,
    end,
    duration,
    delay,
    timingFunction,
    template,
    key,
  ) {
    this.key = key;
    this.object = object;
    this.template =
      template ||
      ((v) => {
        return `rgba(${v.r}, ${v.g}, ${v.b}, ${v.a})`;
      });
    this.property = property;
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.delay = delay || 0;
    this.timingFunction = timingFunction;
  }

  valueFromProgression(progression) {
    return {
      r: this.start.r + progression * (this.end.r - this.start.r),
      g: this.start.g + progression * (this.end.g - this.start.g),
      b: this.start.b + progression * (this.end.b - this.start.b),
      a: this.start.a + progression * (this.end.a - this.start.a),
    };
  }
}

export let linear = (t) => t;

export let ease = cubicBezier(0.24, 0.1, 0.25, 1);
