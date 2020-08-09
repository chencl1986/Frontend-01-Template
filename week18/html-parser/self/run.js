const {parseHTML} = require('../src/parser');

let document = parseHTML(`</`);
let div = document.children[0];
console.log(div);
console.log(div.attributes);
