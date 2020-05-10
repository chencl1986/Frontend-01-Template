const http = require('http');

// Returns content-type = text/plain
const server = http.createServer((req, res) => {
  console.log('connect');
  console.log(req.headers);
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('ok');
});

server.listen(8080);
/* 
const xhr = new XMLHttpRequest()
xhr.open('get', 'http://127.0.0.1:8080/')
xhr.send(null)
console.log(xhr.responseText); */
