let data = [
  'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
  'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
  'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg',
  'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg',
];

class Carousel {
  constructor() {
    this.root = null;
    this.data = null;
  }

  render() {
    this.root = document.createElement('div');
    this.root.classList.add('carousel');

    for (const d of data) {
      let element = document.createElement('img');
      element.src = d;

      this.root.appendChild(element);
    }

    let position = 0;

    let nextPic = () => {
      let nextPosition = (position + 1) % this.data.length;
      let current = this.root.childNodes[position];
      let next = this.root.childNodes[nextPosition];

      current.style.transition = 'ease 0s';
      next.style.transition = 'ease 0s';

      current.style.transform = `translateX(${-100 * position}%)`;
      next.style.transform = `translateX(${100 - 100 * nextPosition}%)`;

      // 浏览器会自动合并量测CSS操作，因此需要用计时器等待下一帧的时候再执行。
      // 也可以用requestAnimationFrame(requestAnimationFrame(() => {}))
      setTimeout(() => {
        current.style.transition = ''; // means use css rule: ease 1s
        next.style.transition = '';

        // 终止位置
        current.style.transform = `translateX(${-100 - 100 * position}%)`;
        next.style.transform = `translateX(${-100 * nextPosition}%)`;

        position = nextPosition;
      }, 16);

      setTimeout(nextPic, 3000);
    };
    setTimeout(nextPic, 3000);
  }
}

// create
let carousel = new Carousel();

// update
carousel.data = data;
carousel.render();

// mount
document.getElementById('container').appendChild(carousel.root);
