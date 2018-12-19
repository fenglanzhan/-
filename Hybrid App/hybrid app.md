hybrid是什么

hybrid更新和上线流程

hybrid和h5的区别

前端JS和客户端如何通讯 ？如分享这类客户端的功能

1. 混合开发，前端技术和客户端技术的混合开发

2. 特点

   1. 迭代更新速度快，无需审核(一般审核主要是app调用手机的一些权限，但是前端代码是没有调用手机权限的能力)
   2. 部分由前端开发，可以随时更新
   3. 体验流畅
   4. 双端共用一套代码

3. webview：app组件(app可以有，也可以没有)，可以加载h5页面(小型的浏览器内核)，渲染html页面

4. fiel协议

   1. 加载本地文件，快，http协议加载远程资源
   2. http协议，网络加载，与file相比，http协议慢
   3. file://+文件绝对路径
   4. hybrid只能用file协议，

5. 3种方式使用场景

   1. Hybrid：体验要求高，变化频繁，比如头条的新闻详情页
   2. 使用NA：体验要求极致，变化不频繁
   3. 使用H5：体验无要求，比如不常用的页面

6. Hybrid具体实现

   1. 前端做好静态页面，将文件交给客户端
   2. 客户端拿到前端静态页面，以文件形式存储在app中
   3. 客户端在webview中使用file协议加载静态页面
      ![image-20181213115423131](/Users/anitacao/Library/Application%20Support/typora-user-images/image-20181213115423131.png)
   4. 问题：如何更新静态文件

7. Hybrid更新上线流程

   1. 替换每个客户端的静态文件
   2. 只能客户端来进行替换：客户端可以更新文件，但是前端没有这个功能，只是运行在webbiew的静态文件，没办法检测更新自身文件
   3. 客户端去server端下载最新的静态文件，前端工程师来维护和开发server端存放的静态文件

8. 完整流程

   1. 设置版本号
   2. 将静态文件压缩成zip包，上传到服务器
   3. 客户端每次启动都去服务端检测版本号
   4. 如果服务器端版本号大于客户端版本号，下载最新的zip包
   5. 解压覆盖现有文件
   6. 加载最新的静态资源文件

9. hybrid和h5的区别
   hybrid开发成本高，运维成本高，但是体验更好，可快速迭代，无需app审核，适合产品功能稳定，体验要求高，迭代频繁；h5适合单次活动或不常用功能，体验要求不高(运营型)

10. 前端和客户端通信

    1. 遗留问题(这里的问题应该不是指单页应用，应该是内嵌在app中h5页面)

       1. 新闻类适合hybrid，前端如何获取新闻内容
       2. 不能用ajax：跨域问题，且速度慢（ionic框架的ajax请求）
       3. 可以让客户端来获取数据，js通讯拿到内容，再渲染；客户端可以提前获取

    2. JS和客户端通讯的基本形式-类似jsonp

       1. JS访问客户端，传递参数和回调函数
       2. 客户端通过回调函数返回内容

    3. schema协议简介和使用

       1. schema协议-前端和客户端通讯的约定
          ![image-20181213123942446](/Users/anitacao/Library/Application%20Support/typora-user-images/image-20181213123942446.png)

          ![image-20181213124121240](/Users/anitacao/Library/Application%20Support/typora-user-images/image-20181213124121240.png)

          ![image-20181213124221328](/Users/anitacao/Library/Application%20Support/typora-user-images/image-20181213124221328.png)

    4. schema使用的封装

    5. 内置上线

       ![image-20181213130144010](/Users/anitacao/Library/Application%20Support/typora-user-images/image-20181213130144010.png)

       ![image-20181213130551519](/Users/anitacao/Library/Application%20Support/typora-user-images/image-20181213130551519.png)






