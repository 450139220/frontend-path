const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts', // TypeScript 入口文件
  output: {
    filename: 'bundle.js', // 输出的 JavaScript 文件名
    path: path.resolve(__dirname, 'dist'), // 输出路径
  },
  resolve: {
    extensions: ['.ts', '.js'], // 解析的文件扩展名
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // 匹配 TypeScript 文件
        use: 'ts-loader', // 使用 ts-loader 转换 TypeScript
        exclude: /node_modules/, // 排除 node_modules 目录
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, 'dist'), // 提供静态文件的路径
    watchFiles: ['src/**/*'],
    hot: false, // 启用热更新
    liveReload: true,
    open: true, // 自动打开浏览器
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // 生成的 HTML 文件模板
    }),
  ],
};
