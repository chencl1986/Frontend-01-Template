const path = require('path');

// https://webpack.js.org/concepts/
module.exports = {
  entry: path.resolve(__dirname, './main.js'),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          // https://github.com/babel/babel-loader
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
                // https://babeljs.io/docs/en/babel-plugin-transform-react-jsx/
                '@babel/plugin-transform-react-jsx',
                {
                  pragma: 'createElement', // 不配置此处的话，JSX会默认转换为React.createElement
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.view/,
        use: {
          loader: require.resolve('./myloader.js'),
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
