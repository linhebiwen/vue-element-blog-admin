const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  // 部署应用包时的基本 URL
  publicPath: isProduction ? '/' : '/',
  // 生产环境构建文件的目录
  outputDir: 'dist',
  // 静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'assets/',
  // 生成的 index.html 的输出路径 
  indexPath: 'index.html',
  // 生成的静态资源在它们的文件名中包含hash 以便更好的控制缓存
  filenameHashing: false,
  // 在 multi-page 模式下构建应用。每个“page”应该有一个对应的 JavaScript 入口文件
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Blog',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
  },
  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。
  lintOnSave: true,
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
  // 该对象将会被 webpack-merge 合并入最终的 webpack 配置。
  // configureWebpack: config => {
  //   if (process.env.NODE_ENV === 'production') {
  //     // 为生产环境修改配置...
  //   } else {
  //     // 为开发环境修改配置...
  //   }
  // },
  // css配置
  css: {
    // 文件名中的 .module
    modules: false,
    // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)
    extract: isProduction,
    // 是否为 CSS 开启 source map
    sourceMap: false,
    // 向 CSS 相关的 loader 传递选项
    // loaderOptions: {}
  },
  // dev 环境配置
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    // 指向开发环境 API 服务器
    proxy: {
      '/': {
        target: 'http://localhost:3001',
        ws: false,
        changeOrigin: true
        // pathRewrite: {}
      }
    }
    // 第三方插件选项
    // pluginOptions: {}
  },
  // 编译vue-echarts
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]
}