# Webpack 4

## 什么是webpack？

1. 什么是webpack：模块打包器

2. 用处

   一般来说，前端开发html文件可能会引用很多js文件，而且js文件之间有依赖关系，引用顺序有先后，同时对于ES6+等新的语法，less，sass等css预处理都不能很好的解决，此时我们需要一个工具来处理这些问题。  webpack就是用于处理这些的问题的。webpack会把项目当成一个整体，通过一个入口文件例如index.js，从这个文件开始找到项目所有的依赖文件并开始处理，最后打包成一个(或多个)浏览器可以识别的js文件。

## 一个简单的打包例子

1. 准备工作
   创建项目，npm init创建package.json(npm init -y可一次性生成)

2. 安装webpack
   安装`webapck`时把`webpack-cli`也装上是因为在`webpack4.x`版本后webpack模块把一些功能分到了`webpack-cli`模块，所以两者都需要安装。安装命令：

   ```
   npm i webpack webpack-cli -g // 全局安装webpack和webpack-cli模块
   npm install webpack webpack-cli --save-dev // 本地项目，简写--save-dev为-D
   ```

   ```
   上述命令可采用简写，install可简写为i,--global可简写为-g,--save-dev可简写为-D(这个命令是用于把配置添加到package.json的开发环境配置列表中，后面会提到)，--save可简写为-S，同时国内我们可以采用cnpm。
   ```

3. 新建文件
   新建`src`和`dist`文件夹

   - index.html--放在dist文件夹中
   - hello.js--放在src文件夹中
   - index.js--放在src文件中

   `Index.html`文件中的html代码，作用：引入我们打包后的js文件

   ```
   
   ```

4. 通过配置文件使用webpack
   配置`webpack.config.js`文件，命令行webpack会首先自动寻找文件名为`webpack.config.js`文件，自动引用配置选项

5. 使用package.json集成命令

   > 注：package.json中的`script`会按你设置的命令名称 来执行对应的命令。

   使用`npm run` 加配置命令即可执行

## 构建本地服务器

1. webpack-dev-server配置本地服务器
   webpack提供一个可选的本地开发服务器，基于node.js构建，是一个单独的组件，在webpack中进行配置之前需要单独安装它作为项目的依赖

   ```
   npm i webpack-dev-server -D
   ```

   devServer作为webpack配置选项中的一项，以下是它的一些配置选项：

   - `contentBase`：设置服务器所读取文件的目录，当前我们设置为"./dist"
   - `port`：设置端口号，默认为`8080`
   - `inline`：设置为`true`，当源文件修改时会自动刷新页面
   - `historyApiFallback`：设置为`true`，所有跳转将指向`index.html`

2. Source Map调试配置
   打包生成对应于打包文件的.map文件，使得编译后的代码可读性更高，更易于调试

## Loaders

loaders是webpack最强大的功能之一，通过不同的loader，webpack可以调用外部的脚本或者工具，实现对不同格式的文件处理，例如将`scss`转化为`css`，将ES6、ES7等语法转化为当前浏览器能识别的语法，将JSX转化为js等多项功能

Loaders需要单独安装并且需要在`webpack.config.js`中的`module`配置项进行配置：

- `test`：用以匹配loaders所处理文件的拓展名的正则表达式（必须）
- `loader`：loader的名称（必须）
- `include/exclude`：手动添加必须处理的文件（文件夹）或者屏蔽不需要处理的文件（文件夹）（可选）
- `options`：为loaders日工额外的设置选项（可选）

1. 配置css-loader
   如果需要加载一个css文件，需要安装配置`style-loader`和`css-loader`

   ```
   npm i style-loader css-loader -D
   ```

2. 配置sass

   ```
   snpm i sass-loader node-sass -D // 因为sass-loader依赖于node-sass，所以还要安装node-sass
   
   ```

   ## Babel

   Babel是一个编译JavaScript的平台，可以编译代码：

   - 使用最新的JS代码（es6、es7…）不用管新标准是否被当前使用的浏览器完全支持
   - 让你能使用基于JavaScript进行了拓展的语言，比如React的JSX

   1. Babel的安装与配置
      Babel实际是几个模块化的包，器核心功能位于成为`babel-core`的npm包中，webpack可以把其中不同的包整合在一起使用，对于每一个你需要的功能或者拓展，你都需要安装单独的包（用的最多是解析ES6的`babel-preset-env`包和解析JSX的`babel-preset-react`包）

      ```
      npm i bable-core babel-loader - babel-preset-env -D// babel-preset-env的env表示是对当前环境的预处理，而不是像以前使用babel-preset-es2015只能针对某个环境
      ```

   2. 优化babel配置
      把babel的配置提取出来，放到根目录下的.babelrc文件下中，webpack可以自动调用.babelrc里面的babel配置选项

   ## 插件Plugin

   Plugins是用来拓展Webpack功能的，他们会在整个构建过程中生效，执行相关的任务。Loaders和Plugins经常被弄混，但是他们是完全不同的东西。Loaders是在打包构建过程中处理源文件的（JSX、Scss、Less、ts等），一次处理一个，插件并不会直接操作单个文件，它直接对整个构建过程起作用。

   1. 插件如何使用
      使用插件需要通过`npm`安装，然后在`webpack.config.js`中的`plugins`（一个数组）配置项中添加该插件的实例

   2. 自动生成html文件HtmlWebpackPlugin
      作用：动态生成index.html且自动引用打包后的js

   3. 清理/dist文件夹CleanWebpackPlugin
      在删掉dist文件夹之前，由于前面的代码示例遗留，导致我们的/dist文件夹比较会乱。webpack会生成文件，然后将这些文件放置在/dist文件夹中，但是webpack无法追踪到哪些文件是实际在项目中用到的

      通常在每次构建前清理/dist文件夹，是比较推荐的做法，因此只生成用到的文件。此时使用CleanWebpackPlugin插件

   4. 热更新HotModuleReplacementPlugin
      HMR可以在我们修改代码后自耦东刷新预览效果。
      方法：

      1. `devServer`配置项中添加`hot: true`参数
      2. 因为`HotModuleReplacementPlugin`是`webpack`模块自带的，所以引入`webpack`模块后，在plugins配置项中直接使用即可

   ## 项目优化及拓展

   1. 代码分离
      当前开发环境提倡模块化，webpack也是，我们前面的webpack.config.js配置文件，在项目复杂时，会混乱，所以最后将它拆分，方便管理：

      - 根目录下新建三个文件：webpack.common.js、webpack.dev.js、webpack.prod.js，分别代表公共配置文件、开发环境配置文件、生产环境（指项目上线时的环境）配置文件

      - 安装一个合并模块的插件

        ```
        cnpm i webpack-merge -D
        ```

      - 将`webpack.config.js`的代码查分到上述新建的三个文件，然后把`webpack.config.js`文件删除n

      > 注：说道`package.json`文件，顺便就多提几句，因为也许有些朋友可能对我们安装模块时加的`-D`、`-S`或`-g`命令存在一些疑惑，因为不知道什么时候加什么尾缀。 其实这个`package.json`文件是用于我们安装依赖的，可以把它当成一份依赖安装说明表，就是如果我们把项目上传或者发给其他的开发同事，肯定不会把`/node_modules`文件夹也发送过去，因为这太大了，不现实也没必要。 开发同事只需要有这份`package.json`文件，然后`npm install`就可以把我们所需要的依赖都安装下来，但前提是`package.json`文件上有记录，这就是安装模块时加上`-D`,`-S`命令的原因。 `-D`的全称是`--save-dev`指开发环境时需要用到的依赖，会记录在`package.json`文件中的`devDependencies`选项中，而`-S`是`--save`是指生产环境也就是上线环境中需要用到的依赖，会记录在`package.json`文件中的`dependencies`选项中，`-g`的全称是`--global`指安装全局命令，就是我们在本电脑的任何项目中都能使用到的命令，比如安装`cnpm`这个淘宝镜像命令就会用到`-g`命令。 所以我们在安装模块时一定不要忘了加上对应的尾缀命令，让我们的模块有迹可循，否则其他的开发同事接手你的项目的话，会不会下班后（放学后）在门口等你就不知道了。

   2. 多入口多出口
      `webpack.config.js`中`entry`有三种写法，字符串、数组、对象，平时用的多的是对象的方法

   3. 增加css前缀、分离css、消除冗余css、分离图片

      1. 增加css前缀

         ```
         cnpm i postcss-loader autoprefixer -D
         ```

         安装postcss-loader和autoprefixer模块，项目根目录下新建postcss.config.js文件：

         ```
         module.exports = {
             plugins: [
                 require('autoprefixer') // 引用auroprefixer模块
             ]
         }
         ```

      2. 分离css
         虽然webpack的理念是吧css和js全部打包到同一个文件中，也可以css分离出来。

         ```
         cnpm i extract-text-webpack-plugin@next -D // @next是为了安装最新的
         ```

         > 经读友提示（感谢热心读友）：现在`webpack4.x`版本分离css方法可采用`mini-css-extract-plugin`插件，具体使用方式可[参考这里](https://link.juejin.im/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fmini-css-extract-plugin)，套路一样的

      3. 消除冗余css

         ```
         cnpm i purifycss-webpack purify-css glob -D//一般来说生产环境中注重优化代码，所以在prod.js中进行配置
         ```

         引入`clean-webpack-plugin`及`glob`插件

      4. 处理图片
         安装url-loader、file-loader，url-loader依赖于file-loader

         ```
         cnpm i url-loader file-loader -D
         ```

         背景图片变成了`base64`，因为webpack会自动优化图片，减少发送请求
         如果要变成路径：设置options选项，但是图片会不见，由于路径的问题，我们之前的图片路径在`../images`文件夹下，但是打包出来没有这个路径，图片和文件统计了，我们需要在webpack.common.js设置一个文件夹，但是如此处理../不见了，还是找不到图片，设置publicPath

      5. 压缩代码
         webpack4中打包时会自动压缩js代码，但是npm run dev运行服务器时，修改代码热更新很慢，因为修改后webpack又自动打包，导致在开发环境中效率低，所以需要把生产环境和开发环境区分开。`webpack.dev.js`代表开发环境的配置，`webpack.prod.js`代表生产环境的配置，这时我们只要在`package.json`文件中配置对应环境的命令即可

         ```json
         {
           ...
           "scripts": {
             "build": "webpack --config webpack.prod.js --mode production",
             "dev": "webpack-dev-server --open --config webpack.dev.js --mode development"
           },
           ...
           }
         }
         ```

         `--mode production`表示打包时是生产环境，会自行将js进行压缩，而`--mode development`表示当前是开发环境，不需要进行压缩。这同时也解决了之前一直遗留的警告问题：