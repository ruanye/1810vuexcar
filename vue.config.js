const path = require('path');
// 根目录 vue.config.js
// webpack 配置 跨域叫做webpack代理
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? 'www.baidu.com' : '/', // 访问文件的路径
  outputDir: 'dist123', // 打包出来的文件夹名字 默认是dist
  assetsDir: 'static', // 静态资源目录（css,img,js）
  // indexPath: 'a.html', // index.html的名字 默认是index.html
  productionSourceMap: false, // 是否生成soucemap 常用配置 配置为false之后不在生成map文件
  // 修改webpack默认配置
  chainWebpack: (config) => {
    // 设置别名
    config.resolve.alias
      .set('_c', path.resolve(__dirname, 'src/components'))
      .set('api', path.resolve(__dirname, 'src/api'));
  },
  // devServer: {
  //   proxy: 'http://localhost:3000',
  // },
};
