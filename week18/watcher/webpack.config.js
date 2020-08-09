const path = require('path');

// https://webpack.js.org/concepts/
module.exports = {
  entry: path.resolve(__dirname, './src/a.js'),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          // https://github.com/babel/babel-loader
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  // 代码配置为不压缩
  mode: 'development',
  optimization: {
    minimize: false,
  },
};
