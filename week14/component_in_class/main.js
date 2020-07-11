// require('./foo');
import './foo';

/* class Parent {
  constructor(config) {
    console.log('config', config);
    this.children = [];
    this.root = document.createElement('div');
  }
  // property
  set class(v) {
    console.log('Parent::class', v);
  }
  // property
  set id(v) {
    console.log('Parent::id', v);
  }
  // attribute
  setAttribute(name, value) {
    console.log(name, value);
    this.root.setAttribute(name, value);
  }
  // children
  appendChild(child) {
    console.log('Parent::appendChild', child);
    // child.mountTo(this.root);
    this.children.push(child);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
    for (const child of this.children) {
      child.mountTo(this.root);
    }
  }
} */

/* class Child {
  constructor(config) {
    console.log('config', config);
    this.children = [];
    this.root = document.createElement('div');
  }
  // property
  set class(v) {
    console.log('Parent::class', v);
  }
  // property
  set id(v) {
    console.log('Parent::id', v);
  }
  // attribute
  setAttribute(name, value) {
    console.log(name, value);
    this.root.setAttribute(name, value);
  }
  // children
  appendChild(child) {
    console.log('Parent::appendChild', child);
    // child.mountTo(this.root);
    this.children.push(child);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
    for (const child of this.children) {
      child.mountTo(this.root);
    }
  }
} */

class Div {
  constructor(config) {
    console.log('config', config);
    this.children = [];
    this.root = document.createElement('div');
    this.attributes = new Map();
    this.properties = new Map();
  }
  // property
  set class(v) {
    console.log('Parent::class', v);
  }
  // property
  set id(v) {
    console.log('Parent::id', v);
  }
  // attribute
  setAttribute(name, value) {
    console.log(name, value);
    this.attributes.set(name, value);
  }
  // property
  setProperty(name, value) {
    console.log(name, value);
    this.properties.set(name, value);
  }
  // children
  appendChild(child) {
    console.log('Parent::appendChild', child);
    // child.mountTo(this.root);
    this.children.push(child);
  }
  mountTo(parent) {
    // parent.appendChild(this.root);
    this.render().mountTo(parent);
    for (const child of this.children) {
      // child.mountTo(this.root);
      child.mountTo(this.slot);
    }
  }
  render() {
    this.slot = <div></div>;

    return (
      <article>
        <h1>{this.attributes.get('title')}</h1>
        <h2>{this.properties.get('title')}</h2>
        <header>I'm a header</header>
        {this.slot}
        <footer>I'm a footer</footer>
      </article>
    );
  }
}

// 处理文字
class Text {
  constructor(text) {
    this.children = [];
    this.root = document.createTextNode(text);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
    for (const child of this.children) {
      child.mountTo(this.root);
    }
  }
}

class Wrapper {
  constructor(type) {
    console.log('type', type);
    this.children = [];
    this.root = document.createElement(type);
  }
  // property
  set class(v) {
    console.log('Parent::class', v);
  }
  // property
  set id(v) {
    console.log('Parent::id', v);
  }
  // attribute
  setAttribute(name, value) {
    console.log(name, value);
    this.root.setAttribute(name, value);
  }
  // children
  appendChild(child) {
    console.log('Parent::appendChild', child);
    // child.mountTo(this.root);
    this.children.push(child);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
    for (const child of this.children) {
      this.slot.appendChild(child);
      // child.mountTo(this.root);
    }
  }
}

function create(Div, attributes, ...children) {
  let o;

  if (typeof Div === 'string') {
    o = new Wrapper(Div);
  } else {
    o = new Div({
      config: 'configTest',
      timer: {},
    });
  }

  console.log(arguments);

  for (const name in attributes) {
    // o[name] = attributes[name];
    o.setAttribute(name, attributes[name]);
  }
  console.log(children);

  for (const child of children) {
    if (typeof child === 'string') {
      child = new Text(child);
    }
    o.appendChild(child);
  }

  return o;
}

/* let component = (
  <Parent
    id='a'
    class='b'
    style='width: 100px;height: 100px;background: green;'
  >
    <Child>a</Child>
    <Child>b</Child>
    <Child>c</Child>
  </Parent>
); */

/* let component = (
  <Div id='a' class='b' style='width: 100px;height: 100px;background: green;'>
    <Div>a</Div>
    <Div>b</Div>
    <Div>c</Div>
    <div></div>
    <p></p>
  </Div>
); */
let component = (
  <Div title='I am a title'>
    <span>text text text</span>
  </Div>
);
component.class = 'c';
component.id = 'e';
// component.setAttribute('id', 'a');
console.log(component);
component.mountTo(document.body);
