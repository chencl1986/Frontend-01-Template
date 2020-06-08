let str = 'Syntax';

str += '\n\tSyntax';

/* str += '\n\t';

str += document
  .querySelector('#Syntax')
  .nextElementSibling.innerText.replace(/\n/g, ''); */

if (document.querySelector('#Usage_notes')) {
  str += '\n\tValues\n';

  Array.from(
    document.querySelector('#Usage_notes').nextElementSibling.nextElementSibling
      .children,
  ).forEach((ele, index) => {
    if (index % 2 === 1) {
      str += `\n\t\t\t${ele.innerText.replace(/(\n)+/g, '\t')}\n`;
    } else {
      str += `\t\t${ele.innerText}`;
    }
  });
} else if (document.querySelector('#Values')) {
  str += '\n\tValues\n';
  let isSwitchToNoteMode = 0;

  Array.from(
    document.querySelector('#Values').nextElementSibling.children,
  ).forEach((ele, index) => {
    if (
      ele.children &&
      ele.children.length &&
      ele.children[0].className === 'note'
    ) {
      isSwitchToNoteMode++;
    }
    const useIndex = isSwitchToNoteMode % 2 === 1 ? index + 1 : index;
    if (
      ele.children &&
      ele.children.length &&
      ele.children[0].className !== 'note'
    ) {
      if (useIndex % 2 === 1) {
        str += `\n\t\t\t${ele.innerText.replace(/(\n)+/g, '\t')}\n`;
      } else {
        str += `\t\t${ele.innerText}`;
      }
    }
  });
} else {
  str += '\n';
}

str += 'Specifications';

Array.from(
  (
    document.querySelector('#Specifications') ||
    document.querySelector('#Specification')
  ).nextElementSibling.querySelectorAll('tbody tr'),
).forEach((ele, index) => {
  Array.from(ele.children).forEach((ele, index) => {
    if (index === 0) {
      str += `\n\t${ele.innerText.replace('\n', '\n\t\t')}`;
    } else if (index === 1) {
      str += `\n\t\t\t${ele.innerText.replace('\n', '\t')}`;
    } else {
      str += `\n\t\t\t\t${ele.innerText.replace(/\n/g, '\t')}`;
    }
  });
});

// console.log(str);
copy(str);
