\##  angular-cli参数笔记

\### ng new 创建项目

使用：usage: ng new \<name> [options]

\1. arguments:

​     name: 项目名称

\2. options

   \- --collection (-c)：要使用的原理图表集合(具体不知道有什么用)

   \- --directory：指定创建项目的文件

   \- --dryRun (-d)：运行命令但是不做任何修改(创建的项目是空的，话说到底用来干嘛呢)

   \-  --experimental-ivy：试验性参数，指定是否使用IVY渲染引擎来创建新应用

   \- --force (-f)：强制覆盖文件

   \-   --inline-style (-s)：指定是否在ts文件中写样式

   \- --inline-template (-t)：指定是否在ts文件中写模板

   \- --new-project-root：新项目创建路径

   \- --prefix (-p)：指定生成元素标签的前缀

   \- --routing：默认生成一个路由模块 

   \- --skip-git (-g)：不初始化git仓库 

   \- --skip-install：跳过安装依赖库

   \- --skip-tests (-S)：不创建测试文件

   \- --style：指定css文件的扩展名(例如：--style=scss) 

   \-   --verbose (-v)：输出日志添加更多细节

   \- --view-encapsulation：指定视图的封装策略(默认使用Emulated)

\### ng serve 运行项目

使用：ng serve <project> [options]

\1. arguments:

​     project：启动的项目名称

\2. options:

   \- --aot：使用预编译来构建Build using Ahead of Time compilation.

   \- 

   \- --port：指定监听的端口

   \- --open (-o)：在默认浏览器中打开url，默认打开localhost:4200O

   \- --optimization：启动构建输出的优化

   \- --prod：设置为生产模式

   \- -- progress：构建时将进度记录到控制台

   \- --proxy-config：代理配置文件

   \- --watch：根据修改来重新构建(会输出修改的文件)

   \- --host：监听的host

   \- --poll： Enable and define the f ile watching poll time period in milliseconds.

   \- --live-reload：Whether to reload the page on change, using live-reload.

   \- --base-href：Base url for the application being built.

   \- --browser-target：Target to serve.

   \- --common-chunk：Use a separate bundle containing code used across multipe bundles.

   \- --configuration (-c)：使用指定的配置文件

   \- --deploy-url：文件部署的url

   \- --disable-host-check：Don't verify connected clients a re part of allowed hosts.

   \- --eval-source-map：Output in-file eval sourcemaps.

   \- --hmr：Enable hot module replacement.

   \- --hmr-warning

​         Show a warning when the --hmr option is enabled.

   \- --public-host

​         Specify the URL that the browser client will use.

   \- -- serve-path

​          The pathname where the app will be served.

   \- --serve-path-default-warning

​         Show a warning when deploy-url/base-href use unsupported serve path values.

   \- --source-map

​         Output sourcemaps.

   \- --ssl

​         Serve using HTTPS.

   \- --ssl-cert

​         SSL certificate to use fo r serving HTTPS.

   \- --ssl-key

​         SSL key to use for serving HTTPS.

   \- --vendor-chunk

​         Use a separate bundle containing only vendor libraries.

   \- --vendor-source-ma p

​         Resolve vendor packages sourcemaps.

   \- --verbose

​         Adds more details to output logging.