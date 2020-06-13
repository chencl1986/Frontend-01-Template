var treeStr = `${
  document.querySelector('.titlebar-container .title').innerText
}\n\tDescription`;
var propertiesStr = '';
var constructorStr = '';
var wikiArticle = document.querySelector('#wikiArticle');
var index = 0;
var resolveTitle = true;
var resolveAttr = '';
var lastResolveAttr = '';
var resolveStr = {
  Properties: '',
  Constructor: '',
  Methods: '',
  Events: '',
};
var attrs = {
  Properties: true,
  Constructor: true,
  Methods: true,
  Events: true,
};

while (index < wikiArticle.children.length) {
  var ele = wikiArticle.children[index];
  const tagName = ele.tagName.toLowerCase();
  const attr = ele.getAttribute('id');

  if (resolveTitle && tagName === 'p') {
    treeStr += `\n\t\t${ele.innerText}`;
  }

  if (tagName === 'h2') {
    if (attrs[attr]) {
      resolveTitle = false;
      resolveAttr = attr;
      lastResolveAttr = '';
      resolveStr[attr] = `\n\t${ele.innerText}`;
    }
  }

  if (tagName === 'h3') {
    if (lastResolveAttr) {
      resolveStr[lastResolveAttr] += `\n\t\t${ele.innerText}`;
    }
  }

  if (tagName === 'p') {
    if (lastResolveAttr) {
      resolveStr[lastResolveAttr] += `\n\t\t\t${ele.innerText}`;
    }
  }

  if (tagName === 'dl') {
    if (resolveAttr) {
      Array.from(ele.children).forEach((child) => {
        if (child.tagName.toLowerCase() === 'dt') {
          if (child.children) {
            Array.from(child.children).forEach((c, i) => {
              if (!i) {
                resolveStr[resolveAttr] += `\n\t\t${c.innerText}`;
              } else {
                if (c.innerText) {
                  resolveStr[resolveAttr] += `\n\t\t\t${c.innerText}`;
                }
              }
            });
          } else {
            resolveStr[resolveAttr] += `\n\t\t${child.innerText}`;
          }
        } else {
          if (child.innerText.match('\n\n')) {
            resolveStr[resolveAttr] += `\n\t\t\t${child.innerText.replace(
              '\n\n',
              '\n\t\t\t',
            )}`;
          } else if (child.innerText.match('\n')) {
            resolveStr[resolveAttr] += `\n\t\t\t${child.innerText.replace(
              '\n',
              '\n\t\t\t',
            )}`;
          } else {
            resolveStr[resolveAttr] += `\n\t\t\t${child.innerText}`;
          }
        }
      });
      lastResolveAttr = resolveAttr;
      resolveAttr = '';
    }

    if (lastResolveAttr) {
      Array.from(ele.children).forEach((child) => {
        if (child.tagName.toLowerCase() === 'dt') {
          if (child.children) {
            Array.from(child.children).forEach((c, i) => {
              if (!i) {
                resolveStr[lastResolveAttr] += `\n\t\t\t${c.innerText}`;
              } else {
                if (c.innerText) {
                  resolveStr[lastResolveAttr] += `\n\t\t\t\t${c.innerText}`;
                }
              }
            });
          } else {
            resolveStr[lastResolveAttr] += `\n\t\t\t${child.innerText}`;
          }
        } else {
          if (child.innerText.match('\n\n')) {
            resolveStr[lastResolveAttr] += `\n\t\t\t\t${child.innerText.replace(
              '\n\n',
              '\n\t\t\t\t',
            )}`;
          } else if (child.innerText.match('\n')) {
            resolveStr[lastResolveAttr] += `\n\t\t\t\t${child.innerText.replace(
              '\n',
              '\n\t\t\t\t',
            )}`;
          } else {
            resolveStr[lastResolveAttr] += `\n\t\t\t\t${child.innerText}`;
          }
        }
      });
    }
  }

  index++;
}

treeStr += resolveStr.Constructor;
treeStr += resolveStr.Properties;
treeStr += resolveStr.Methods;
treeStr += resolveStr.Events;

treeStr += '\n\tSpecifications';

Array.from(
  (
    document.querySelector('#Specifications') ||
    document.querySelector('#Specification')
  ).nextElementSibling.querySelectorAll('tbody tr'),
).forEach((ele, index) => {
  Array.from(ele.children).forEach((ele, index) => {
    if (index === 0) {
      if (ele.innerText !== 'Specification') {
        treeStr += `\n\t\t${ele.innerText.replace('\n', '\n\t\t\t')}`;
      }
    } else if (index === 1) {
      if (ele.innerText !== 'Status') {
        treeStr += `\n\t\t\t\t${ele.innerText.replace('\n', '\t')}`;
      }
    } else {
      if (ele.innerText !== 'Comment') {
        treeStr += `\n\t\t\t\t\t${ele.innerText.replace(/\n/g, '\t')}`;
      }
    }
  });
});

console.log(treeStr);
copy(treeStr);
