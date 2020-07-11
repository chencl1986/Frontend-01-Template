const path = require('path');

// https://webpack.js.org/concepts/
module.exports = {
  entry: './main.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
                '@babel/plugin-transform-react-jsx',
                {
                  pragma: 'create', // 不配置此处的话，JSX会默认转换为React.createElement
                },
              ],
            ],
          },
        },
      },
    ],
  },
  mode: 'development',
  optimization: {
    minimize: false,
  },
};
