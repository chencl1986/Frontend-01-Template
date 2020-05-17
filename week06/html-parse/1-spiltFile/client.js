const net = require('net');
const parser = require('./parser');

// TrunkedBodyParser状态名称转换
const TrunkedBodyParserStatusName = {
  0: 'WAITING_LENGTH',
  1: 'WAITING_LENGTH_LINE_END',
  2: 'READING_TRUNK',
  3: 'WAITING_NEW_LINE',
  4: 'WAITING_NEW_LINE_END',
};

// ResponseParser状态名称转换
const ResponseParserStatusName = {
  0: 'WAITING_STATUS_LINE',
  1: 'WAITING_STATUS_LINE_END',
  2: 'WAITING_HEADER_NAME',
  3: 'WAITING_HEADER_SPACE',
  4: 'WAITING_HEADER_VALUE',
  5: 'WAITING_HEADER_LINE_END',
  6: 'WAITING_HEADER_BLOCK_END',
  7: 'WAITING_BODY',
};

// 处理Body数据
class TrunkedBodyParser {
  constructor() {
    this.WAITING_LENGTH = 0;
    this.WAITING_LENGTH_LINE_END = 1;
    this.READING_TRUNK = 2;
    this.WAITING_NEW_LINE = 3;
    this.WAITING_NEW_LINE_END = 4;
    this.length = 0;
    this.content = [];
    this.isFinished = false;
    this.current = this.WAITING_LENGTH;
  }

  receiveChar(char) {
    // 一个Chunk的开头总是存储了其长度，在此处获取当前Chunk的长度
    if (this.current === this.WAITING_LENGTH) {
      // console.log('WAITING_LENGTH', char);
      if (char === '\r') {
        if (this.length === 0) {
          this.isFinished = true;
        }
        this.current = this.WAITING_LENGTH_LINE_END;
      } else {
        // 传入的长度是字符串，而存储的长度是数字，再次做转换
        this.length *= 16; // 在16进制的末位加一位，故乘以16
        this.length += parseInt(char, 16);
      }
    } else if (this.current === this.WAITING_LENGTH_LINE_END) {
      // 碰到\r表示读取长度完成
      if (char === '\n') {
        this.current = this.READING_TRUNK;
      }
    } else if (this.current === this.READING_TRUNK) {
      // 防止换行符被存储
      this.content.push(char);
      this.length--; // 处理完一个字符，长度减1

      // 读取完成
      if (this.length === 0) {
        this.current = this.WAITING_NEW_LINE;
      }
    } else if (this.current === this.WAITING_NEW_LINE) {
      if (char === '\r') {
        this.current = this.WAITING_NEW_LINE_END;
      }
    } else if (this.current === this.WAITING_NEW_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_LENGTH;
      }
    }
  }
}

// 利用状态机处理返回数据
class ResponseParser {
  constructor() {
    // 定义各个状态
    this.WAITING_STATUS_LINE = 0;
    this.WAITING_STATUS_LINE_END = 1;
    this.WAITING_HEADER_NAME = 2;
    this.WAITING_HEADER_SPACE = 3;
    this.WAITING_HEADER_VALUE = 4;
    this.WAITING_HEADER_LINE_END = 5;
    this.WAITING_HEADER_BLOCK_END = 6;
    this.WAITING_BODY = 7;

    // 当前状态
    this.current = this.WAITING_STATUS_LINE;
    this.statusLine = '';
    this.header = {};
    this.headerName = '';
    this.headerValue = '';
    this.bodyParser = null;
  }

  get isFinished() {
    return this.bodyParser && this.bodyParser.isFinished;
  }

  get response() {
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);

    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.header,
      body: this.bodyParser.content.join(''),
    };
  }

  // 接收数据
  receive(string) {
    for (let i = 0; i < string.length; i++) {
      this.receiveChar(string.charAt(i));
    }
  }

  // 处理单个字符
  receiveChar(char) {
    // 处理statusLine，如HTTP/1.1 200 OK
    if (this.current === this.WAITING_STATUS_LINE) {
      // 遇到换行，表示statusLine结束，就改变状态
      if (char === '\r') {
        this.current = this.WAITING_HEADER_LINE_END;
      } else if (char === '\n') {
        // 遇到\n，表示当前行结束，转换到下一个状态
        this.current = this.WAITING_HEADER_NAME;
      } else {
        // 存储statusLine
        this.statusLine += char;
      }
    }

    // 处理headerName
    // 如果无\r字符，直接出现了\n，也要切换状态
    else if (this.current === this.WAITING_STATUS_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME;
      }
    } else if (this.current === this.WAITING_HEADER_NAME) {
      if (char === ':') {
        this.current = this.WAITING_HEADER_SPACE;
      } else if (char === '\r') {
        // 如果在本应读取headerName的位置，读取到了换行符
        // 先切换到处理Header数据结尾的回车符状态，之后再切换到WAITING_BODY
        this.current = this.WAITING_HEADER_BLOCK_END;
        if (this.header['Transfer-Encoding'] === 'chunked') {
          // 初始化bodyParser
          this.bodyParser = new TrunkedBodyParser();
        }
      } else {
        this.headerName += char;
      }
    }

    // 处理headerValue
    else if (this.current === this.WAITING_HEADER_SPACE) {
      if (char === ' ') {
        this.current = this.WAITING_HEADER_VALUE;
      }
    } else if (this.current === this.WAITING_HEADER_VALUE) {
      if (char === '\r') {
        this.current = this.WAITING_HEADER_LINE_END;
        // 完成一个header属性接收后，存储数据
        this.header[this.headerName] = this.headerValue;
        this.headerName = '';
        this.headerValue = '';
      } else {
        this.headerValue += char;
      }
    }

    // 当前header行属性读取完成后，将进入读取下一行属性
    else if (this.current === this.WAITING_HEADER_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME;
      }
    }

    // 处理Header结尾的回车符
    else if (this.current === this.WAITING_HEADER_BLOCK_END) {
      // 碰到换行符，表示Header正式结束
      if (char === '\n') {
        // 此时开始等待Body的处理
        this.current = this.WAITING_BODY;
      }
    }

    // 处理body
    else if (this.current === this.WAITING_BODY) {
      this.bodyParser.receiveChar(char);
    }
  }
}

// 创建请求
class Request {
  // method, url = host + port + path
  // body: k/v
  // headers

  constructor(options) {
    this.method = options.method || 'GET';
    this.host = options.host;
    this.path = options.path || '/';
    this.port = options.port || 80;
    this.body = options.body || {};
    this.headers = options.headers || {};

    if (!this.headers['Content-Type']) {
      this.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    if (this.headers['Content-Type'] === 'application/json') {
      this.bodyText = JSON.stringify(this.body);
    }

    if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      this.bodyText = Object.keys(this.body)
        .map((key) => `${key}=${encodeURIComponent(this.body[key])}`)
        .join('&');
      this.headers['Content-Length'] = this.bodyText.length;
    }
  }

  // 生成发送请求的字符串
  toString() {
    return `${this.method} ${this.path} HTTP/1.1\r
Host: 127.0.0.1\r
${Object.keys(this.headers)
  .map((key) => `${key}: ${this.headers[key]}`)
  .join('\r\n')}\r\n\r
${this.bodyText}\r\n\r\n`;
  }

  open(method, url) {}

  send(connection) {
    return new Promise((resolve, reject) => {
      const parser = new ResponseParser();

      if (connection) {
        connection.write(this.toString());
      } else {
        connection = net.createConnection(
          {
            host: this.host,
            port: this.port,
          },
          () => {
            console.log('connected to server!');
            connection.write(this.toString());
          },
        );

        // 数据是分包接收，因此要等待完全受到数据后再处理
        connection.on('data', (data) => {
          // 将每个数据包传入ResponseParser处理
          parser.receive(data.toString());
          if (parser.isFinished) {
            resolve(parser.response);
          }
          connection.end();
        });

        connection.on('end', () => {
          console.log('disconnected from server');
        });

        connection.on('error', (err) => {
          console.error(err);
          reject(err);
          connection.end();
        });
      }
    });
  }
}

void (async function () {
  let request = new Request({
    method: 'POST',
    host: '127.0.0.1',
    port: '8080',
    path: '/',
    body: {
      name: 'winter',
    },
  });

  const response = await request.send();
  console.log(response);
  // 将HTML字符串处理成DOM树
  const dom = parser.parseHTML(response.body);
})();

/* // 测试toString方法
const client = net.createConnection(
  {
    host: '127.0.0.1',
    port: 8080,
  },
  () => {
    // 'connect' listener.
    console.log('connected to server!');
    const request = new Request({
      method: 'POST',
      host: '127.0.0.1',
      path: '/',
      port: 8080,
      headers: {
        ['X-Foo2']: 'customer',
      },
      body: {
        name: 'winter',
      },
    });
    console.log(request);
    console.log(request.toString());
    client.write(request.toString());
    // https://tools.ietf.org/html/rfc2616
    // client.write('POST / HTTP/1.1\r\n');
    // client.write('Host: 127.0.0.1\r\n');
    // client.write('Content-Type: application/x-www-form-urlencoded\r\n');
    // client.write('Content-Length: 11\r\n');
    // client.write('\r\n');
    // client.write('name=winter\r\n');
    // client.write('\r\n');
    //     client.write(
    //       `POST / HTTP/1.1\r
    // Host: 127.0.0.1\r
    // Content-Type: application/x-www-form-urlencoded\r
    // Content-Length: 11\r\n\r
    // name=winter\r\n\r\n`,
    //     );
    // console.log(request.toString());
    // client.write(request.toString());
  },
);
client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});
client.on('end', () => {
  console.log('disconnected from server');
});
client.on('error', (err) => {
  console.log(err);
  client.end();
}); */

/* // 创建一个简单的连接
const client = net.createConnection(
  {
    host: '127.0.0.1',
    port: 8080,
  },
  () => {
    // 'connect' listener.
    console.log('connected to server!');
    // https://tools.ietf.org/html/rfc2616
    // client.write('POST / HTTP/1.1\r\n');
    // client.write('Host: 127.0.0.1\r\n');
    // client.write('Content-Type: application/x-www-form-urlencoded\r\n');
    // client.write('Content-Length: 11\r\n');
    // client.write('\r\n');
    // client.write('name=winter\r\n');
    // client.write('\r\n');
    client.write(
      `POST / HTTP/1.1\r
Host: 127.0.0.1\r
Content-Type: application/x-www-form-urlencoded\r
Content-Length: 11\r\n\r
name=winter\r\n\r\n`,
    );
    // console.log(request.toString());
    // client.write(request.toString());
  },
);
client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});
client.on('end', () => {
  console.log('disconnected from server');
});
client.on('error', (err) => {
  console.log(err);
  client.end();
}); */
