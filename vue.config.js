module.exports = {
  publicPath: "/",
  // outputDir: 在npm run build 或 yarn build 时 ，生成文件的目录名称
  outputDir: "dist",
  //用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: "assets",
  devServer: {
    //这里是设置前端访问的ip 端口
    host: "localhost",
    port: 8888, // 端口号
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器
    //proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    // 配置多个代理
    proxy: {
      //这里就是说
      //比如你用ajax 访问了一个“/api/index_category” 就相当于http://localhost:4000/index_category
      "/api": {
        target: "http://localhost:4000",// 要访问的接口域名
        ws: true,// 是否启用websockets
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          '^/api': '' //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
        }
      }
    }
  }
};