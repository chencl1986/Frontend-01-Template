const http = require('http');
const fs = require('fs');
const path = require('path');
const unzip = require('unzipper');

// Create an HTTP server
const server = http.createServer((req, res) => {
  console.log(req.url);
  /* let matched = req.url.match(/\/\?filename=([^&]+)/);
  let filename = matched && matched[1];
  const filePath = path.resolve(__dirname, `../server/public/${filename}`);
  const writeStream = fs.createWriteStream(filePath); */
  const writeStream = unzip.Extract({path: '../server/public'});
  req.pipe(writeStream);
  /* // data事件等同于pipe
  req.on('data', (trunk) => {
    writeStream.write(trunk);
  });
  req.on('end', (trunk) => {
    writeStream.end(trunk);
  }); */
  req.on('end', () => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('okay');
  });
});

server.listen(8081);
