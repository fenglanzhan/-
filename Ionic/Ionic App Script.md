## Ionic App Script

### 前言

> 这算个翻译内容，但是作为六级没过的人，我以后再逐渐整理吧。。原本是因为最近使用ionic开发的时候各种痛苦，觉得应该是一些配置有问题，尤其是修改刷新的时候，总是各种出错，弄来弄去结果大都是因为缓存没有清理，我非常非常痛苦。。。但是当我开始看这个配置的时候，我觉得并没有什么用。。就这样吧。。

ionic app script是启动并快速运行ionic应用的帮助脚本（减少配置过载）

获取最新版本的`@ionic/app-scripts`，运行

```
npm install @ionic/app-scripts@latest --save-dev // 也可以简写npm i @ionic/app-scripts@latest -D
```

## 默认配置

ionic starts已经预先做了大量的默认配置用于快速构建app，包括：

- Multi-core processing tasks in parallel for faster builds
- 并行多核处理任务，来快速构建
- In-memory file transpiling and bundling
- 内存中的文件转换和绑定
- Transpiling source code to ES5 JavaScript
- 将源代码编译成ES5标准的js
- Ahead of Time (AoT) template compiling
- AoT模板编译
- Just in Time (JiT) template compiling
- JiT模板编译
- Template inlining for JiT builds
- 用于JiT构建的内联模板
- Bundling modules for faster runtime execution
- 为加快运行时间的打包模块
- Treeshaking unused components and dead-code removal
- 摇树优化(webpack中的优化方案)，删除未使用的组件和废代码
- Generating CSS from bundled component Sass files
- 从打包的组件sass文件中成成css
- Autoprefixing vendor CSS prefixes
- 自动添加css前缀
- Minifying JavaScript files
- 缩小js文件
- Compressing CSS files
- 压缩css文件
- Copying `src` static assets to `www`
- 将src的讲台资源复制到ww文件
- Linting source files
- 检验源文件
- Watching source files for live-reloading
- 实时监控源文件并重新加载(应该是热更新)

上面列表中有点多，而且每一项任务都需要相当多的开发时间。ionic app script旨在使完成常见任务更容易，name开发人员就可以专注于构建自己的app，而不是构建脚本。

请注意，Ionic Frameworks的源代码是由模块组成，可以有任何打包器或者构建工具来打包。但是，该项目的目标是提供简单的脚本，是构建ionic应用更加容易，同时还允许开发人员进一步配置构建过程

### npm Scripts - npm脚本

Ionic App Scripts更喜欢从npm脚本来执行，而不是依赖外部任务运行器。package.json文件中预先配置了Ionic的npm脚本。例如，这是每个启动器的npm脚本的默认设置：

```json
"scripts": {
    "ionic:build": "ionic-app-scripts build",
    "ionic:serve": "ionic-app-scripts serve"
  },
```

运行`package.json`中`scripts`属性中的`build`脚本，启动下面的命令

```
npm run build
```

## Environments - 环境

你可以直接在你的ts文件中使用node风格的语法，比如process.env.MY_VAR，而且当应用打包时，它会根据下面的优先顺序进行替换

- 如果变量存在于当前运行的环境中，它会被替换为那个值
- 如果变量没有在当前运行的环境中定义，会从`.env.dev`或者`.env.prod`文件中读取用于开发构建或者发布构建，一般位于app的根目录中
- 如果变量都不存在，会被设置为`undefined`

为了充分使用这个应用，需要一个带有一下声明的`src/declarations.d.ts`文件：

```
declara var process: { 
	env: {
		[key: string]: string | undefined
		}
}
```

提示：如果在项目中安装了`@types/node`，这个声明可能会冲突。详细内容请看[#3541](https://github.com/ionic-team/ionic-cli/issues/3541)

## Custom Configuration - 通用设置

在很多情况下，ionic提供的默认设置涵盖了开发人员所需的大部分场景；但是Ionic App Scripts确实提供很多中方法来配置和覆盖每个不同人物的默认值。注意，Ionic始终对自定义配置中的未设置任何属性值应用默认值。意思就是你没有设置，那么默认使用ionic提供的默认值

[默认配置文件](https://github.com/ionic-team/ionic-app-scripts/tree/master/config)

### package.json -  配置

ionic项目使用`package.json`文件来做配置。有一个可以使用的很方便的配置属性。下面是项目中package.json中config属性的自定义设置通用配置文件示例。

```
"config": {
    "ionic_cleancss": "./config/cleancss.config.js"
  },
```

### Command-line Flags  - 命令行标志

还记得我们如何从项目的`package.json`文件的`scripts`属性中实际运行`ionic-app-scripts`的么？当然我们也可以为每个脚本添加命令行标志，或者使用这些自定义标志来创建新的脚本。例如：

```
"scripts": {
    "build": "ionic-app-scripts build --webpack ./config/webpack.dev.config.js",
    "minify": "ionic-app-scripts minify --cleancss ./config/cleancss.config.js",
  },
```

相同的命令行标志也可以应用于`npm run`命令，例如：

```
npm run build --webpack ./config/webpack.dev.config.js
```

### Overriding Config Files - 覆盖配置文件

| Config File | package.json 配置 | Cmd-line Flag         |
| ----------- | ----------------- | --------------------- |
| CleanCss    | `ionic_cleancss`  | `--cleancss` or `-e`  |
| Copy        | `ionic_copy`      | `--copy` or `-y`      |
| Generator   | `ionic_generator` | `--generator` or `-g` |
| NGC         | `ionic_ngc`       | `--ngc` or `-n`       |
| Sass        | `ionic_sass`      | `--sass` or `-s`      |
| TSLint      | `ionic_tslint`    | `--tslint` or `-i`    |
| UglifyJS    | `ionic-Uglifyjs`  | `--uglifyjs` or `-u`  |
| Watch       | `ionic_watch`     | `--watch`             |
| Webpack     | `ionic_webpack`   | `--webpack` or `-w`   |

### Overriding Config Values - 覆盖配置值

| Config Values                    | package.json Config                   | Cmd-line Flag                  | Defaults                       | Details                                                      |
| -------------------------------- | ------------------------------------- | ------------------------------ | ------------------------------ | ------------------------------------------------------------ |
| root directory                   | `ionic_root_dir`                      | `--rootDir`                    | `process.cwd()`                | The directory path of the Ionic app                          |
| src directory                    | `ionic_src_dir`                       | `--srcDir`                     | `src`                          | The directory holding the Ionic src code                     |
| www directory                    | `ionic_www_dir`                       | `--wwwDir`                     | `www`                          | The deployable directory containing everything needed to run the app |
| build directory                  | `ionic_build_dir`                     | `--buildDir`                   | `build`                        | The build process uses this directory to store generated files, etc |
| temp directory                   | `ionic_tmp_dir`                       | `--tmpDir`                     | `.tmp`                         | Temporary directory for writing files for debugging and various build tasks |
| ionic-angular directory          | `ionic_angular_dir`                   | `--ionicAngularDir`            | `ionic-angular`                | ionic-angular directory                                      |
| ionic-angular entry point        | `ionic_angular_entry_point`           | `--ionicAngularEntryPoint`     | `index.js`                     | entry point file for ionic-angular                           |
| source map type                  | `ionic_source_map_type`               | `--sourceMapType`              | `source-map`                   | Chooses the webpack `devtool` option. `eval` and `source-map` are supported |
| generate source map              | `ionic_generate_source_map`           | `--generateSourceMap`          | `true`                         | Determines whether to generate a source map or not           |
| tsconfig path                    | `ionic_ts_config`                     | `--tsconfig`                   | `{{rootDir}}/tsconfig.json`    | absolute path to tsconfig.json                               |
| app entry point                  | `ionic_app_entry_point`               | `--appEntryPoint`              | `{{srcDir}}/app/main.ts`       | absolute path to app's entrypoint bootstrap file             |
| app ng module path               | `ionic_app_ng_module_path`            | `--appNgModulePath`            | `{{srcDir}}/app/app.module.ts` | absolute path to app's primary `NgModule`                    |
| app ng module class              | `ionic_app_ng_module_class`           | `--appNgModuleClass`           | `AppModule`                    | Exported class name for app's primary `NgModule`             |
| clean before copy                | `ionic_clean_before_copy`             | `--cleanBeforeCopy`            | `false`                        | clean out existing files before copy task runs               |
| output js file                   | `ionic_output_js_file_name`           | `--outputJsFileName`           | `main.js`                      | name of js file generated in `buildDir`                      |
| output css file                  | `ionic_output_css_file_name`          | `--outputCssFileName`          | `main.css`                     | name of css file generated in `buildDir`                     |
| bail on lint error               | `ionic_bail_on_lint_error`            | `--bailOnLintError`            | `null`                         | Set to `true` to make stand-alone lint commands fail with non-zero status code |
| enable type checking during lint | `ionic_type_check_on_lint`            | `--typeCheckOnLint`            | `null`                         | Set to `true` to enable [type checking](https://palantir.github.io/tslint/usage/type-checking) during lint |
| write AoT files to disk          | `ionic_aot_write_to_disk`             | `--aotWriteToDisk`             | `null`                         | Set to `true` to write files to disk for debugging           |
| print webpack dependency tree    | `ionic_print_webpack_dependency_tree` | `--printWebpackDependencyTree` | `null`                         | Set to `true` to print out a dependency tree after running Webpack |
| parse deeplink config            | `ionic_parse_deeplinks`               | `--parseDeepLinks`             | `true`                         | Parses and extracts data from the `@IonicPage` decorator     |
| convert bundle to ES5            | `ionic_build_to_es5`                  | `--buildToEs5`                 | `true`                         | Convert bundle to ES5 for production deployments             |
| default watch timeout            | `ionic_start_watch_timeout`           | `--startWatchTimeout`          | `3000`                         | Milliseconds controlling the default watch timeout           |
| choose the polyfill              | `ionic_polyfill_name`                 | `--polyfillName`               | `polyfills`                    | Change with polyfills.modern or polyfills.ng (all options)[<https://github.com/driftyco/ionic/tree/master/scripts/polyfill>] |
| enable linting                   | `ionic_enable_lint`                   | `--enableLint`                 | `true`                         |                                                              |

### Ionic Environment Variables -  ionic环境变量

这些环境变量自动设置为Node的process.env属性。这些变量在自定义配置文件中很有用，例如自定义`webpack.config.js`文件。

| Environment Variable                  | Description                                                  |
| ------------------------------------- | ------------------------------------------------------------ |
| `IONIC_ENV`                           | Value can be either `prod` or `dev`.                         |
| `IONIC_ROOT_DIR`                      | The absolute path to the project's root directory.           |
| `IONIC_SRC_DIR`                       | The absolute path to the app's source directory.             |
| `IONIC_WWW_DIR`                       | The absolute path to the app's public distribution directory. |
| `IONIC_BUILD_DIR`                     | The absolute path to the app's bundled js and css files.     |
| `IONIC_TMP_DIR`                       | Temp directory for debugging generated/optimized code and various build tasks |
| `IONIC_NODE_MODULES_DIR`              | The absolute path to the `node_modules` directory.           |
| `IONIC_ANGULAR_DIR`                   | The absolute path to the `ionic-angular` node_module directory. |
| `IONIC_APP_SCRIPTS_DIR`               | The absolute path to the `@ionic/app-scripts` node_module directory. |
| `IONIC_SOURCE_MAP_TYPE`               | The Webpack `devtool` setting. `eval` and `source-map` are supported. |
| `IONIC_GENERATE_SOURCE_MAP`           | Determines whether to generate a sourcemap or not.           |
| `IONIC_TS_CONFIG`                     | The absolute path to the project's `tsconfig.json` file      |
| `IONIC_APP_ENTRY_POINT`               | The absolute path to the project's `main.ts` entry point file |
| `IONIC_APP_NG_MODULE_PATH`            | The absolute path to app's primary `NgModule`                |
| `IONIC_APP_NG_MODULE_CLASS`           | The exported class name for app's primary `NgModule`         |
| `IONIC_GLOB_UTIL`                     | The path to Ionic's `glob-util` script. Used within configs. |
| `IONIC_CLEAN_BEFORE_COPY`             | Attempt to clean existing directories before copying files.  |
| `IONIC_CLOSURE_JAR`                   | The absolute path ot the closure compiler jar file           |
| `IONIC_OUTPUT_JS_FILE_NAME`           | The file name of the generated javascript file               |
| `IONIC_OUTPUT_CSS_FILE_NAME`          | The file name of the generated css file                      |
| `IONIC_WEBPACK_FACTORY`               | The absolute path to Ionic's `webpack-factory` script        |
| `IONIC_WEBPACK_LOADER`                | The absolute path to Ionic's custom webpack loader           |
| `IONIC_BAIL_ON_LINT_ERROR`            | Boolean determining whether to exit with a non-zero status code on error |
| `IONIC_TYPE_CHECK_ON_LINT`            | Boolean determining whether to type check code during lint or not |
| `IONIC_AOT_WRITE_TO_DISK`             | `--aotWriteToDisk`                                           |
| `IONIC_PRINT_WEBPACK_DEPENDENCY_TREE` | boolean to print out a dependency tree after running Webpack |
| `IONIC_PARSE_DEEPLINKS`               | boolean to enable parsing the Ionic 3.x deep links API for lazy loading |
| `IONIC_BUILD_TO_ES5`                  | boolean to enable converting bundle to ES5 for production deployments |
| `IONIC_START_WATCH_TIMEOUT`           | Milliseconds controlling the default watch timeout           |

`process.env.IONIC_ENV`环境变量在检测是`prod`还是`dev`构建时十分有用，是由一些命令自动设置的。默认情况下，`build`和`serve`任务会使用开发环境（不包括AoT编译或者压缩）。需要强制`prod`，需要加`--prod`命令行标识。

`process.env.IONIC_ENV`环境变量可以被设置为`prod`来实现`--prod`构建，否则其他任何情况都使用`dev`构建。

## All Available Tasks - 所有可用任务

这些任务在`ionic-qpp-scripts`中都可用，可以添加到`npm`脚本或者任何`Node`命令中。

| Task       | Description                                                  |
| ---------- | ------------------------------------------------------------ |
| `build`    | A complete build of the application. It uses `development` settings by default. Use `--prod` to create an optimized build |
| `clean`    | Empty the `www/build` directory.                             |
| `cleancss` | Compress the output CSS with [CleanCss](https://github.com/jakubpawlowicz/clean-css) |
| `copy`     | Run the copy tasks, which by defaults copies the `src/assets/` and `src/index.html` files to `www`. |
| `lint`     | Run the linter against the source `.ts` files, using the `tslint.json` config file at the root. |
| `minify`   | Minifies the output JS bundle and compresses the compiled CSS. |
| `sass`     | Sass compilation of used modules. Bundling must have at least ran once before Sass compilation. |
| `watch`    | Runs watch for dev builds.                                   |

例如npm 脚本：

```
"scripts": {
    "minify": "ionic-app-scripts minify"
}
```

## 提示

1. webpack的`devtool`属性由`ionic-source-map-type`变量驱动。它默认值为`source-map`来获得最佳的source map。开发者可以通过将`iomic_source_map_type`设置为`eval`加快构建速度

2. 默认，`lint`命令在出错时不会以非零状态代码退出。要启动此功能，请在命令中传入`bailOnLintError true`。

   ```
   "scripts" : {
     ...
     "lint": "ionic-app-scripts lint"
     ...
   }
   ```

   ```
   npm run lint --bailOnLintError true
   ```

## The Stack

- [Ionic Framework](https://ionicframework.com/)
- [TypeScript Compiler](https://www.typescriptlang.org/)
- [Angular Compiler (NGC)](https://github.com/angular/angular/tree/master/modules/%40angular/compiler-cli)
- [Webpack Module Bundler](https://webpack.js.org/)
- Ionic Component Sass
- [Node Sass](https://www.npmjs.com/package/node-sass)
- [Autoprefixer](https://github.com/postcss/autoprefixer)
- [UglifyJS](https://lisperator.net/uglifyjs/)
- [CleanCss](https://github.com/jakubpawlowicz/clean-css)
- [TSLint](https://palantir.github.io/tslint/)

## Contrubuting

我们使用Node 6和NPM5进行贡献

### 发布一个版本

发布版本请执行以下步骤：

- 运行`npm run build`生成dist目录
- 运行`npm run test`以验证dist能够运行
- 临时勾选package.json版本
- 运行`npm run changelog`将最新添加内容附加到`changelog`中
- 手动验证并提交更改日志。通常，需要手动添加内容说明
- 将package.json版本还原为原始版本
- 运行npm版本不定以勾选版本并生成git标记
- 运行npm run github-release以创建github发布条目
- 运行npm publish将包发布到npm
- git push origin master-将更改推送到master

