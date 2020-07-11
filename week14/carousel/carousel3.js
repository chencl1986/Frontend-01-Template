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

      current.style.transform = `translateX(${-100 - 100 * position}%)`;
      next.style.transform = `translateX(${-100 * nextPosition}%)`;

      position = nextPosition;

      setTimeout(nextPic, 3000);
    };
    nextPic();
  }
}

// create
let carousel = new Carousel();

// update
carousel.data = data;
carousel.render();

// mount
document.getElementById('container').appendChild(carousel.root);
