## Angular 4.0 架构详解

[angular架构](https://angular.cn/generated/images/guide/architecture/overview2.png)

### 主要内容

- module
- component
- template
- metadata
- data binding
- directive
- service
- DI

### module

带有@NgModule装饰器的类

对于新建页面，如果不使用懒加载，都要在`@NgModule中先声明后使用`

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
@ngModule({
    imports: [ BrowserModule ],
    providers: [ LoggerService ],
    entryComponents: [],
    declarations: [AppComponent]
})
```

#### 属性：

1. imports：[]，该模块所需导入的其他模块

2. exports：[]

3. providers：Provider[]，该模块所需要的服务（如果在根模块中声明，全应用杰克使用此服务）

4. declarations：属于该模块的组件、指令和管道

5. entryConponents：[]，定义该模块中要变异的组件集，以便可以动态加载到视图中  

   对于在这里列出的每个组件，Angular 都会为其创建一个 `ComponentFactory`，并将其保存到 `ComponentFactoryResolver` 中。

   Angular 会自动把模块的 `bootstrap`（引导模块）和路由定义中引用的组件添加到 `entryComponents` 列表中。 该选项用于添加那些需要写代码来创建的组件，比如 `ViewContainerRef.createComponent()`。

6. bootstrap：[]，当该模块引导时需要进行引导的组件。列在这里的所有组件都会自动添加到`entryComponets`中
   指定根组件，Angular创建它并插入`index.html`宿主页面  
   Angular应用通过引导根模块`AppModule`来启动。根模块引用了`entryComponent`。此外引导过程中还会创建`bootstrap`数组列出的组件，并把它们逐个插入到浏览器的DOM中

7. schemas：该模块允许使用的声明元素的schema（html架构）。元素和属性（无论是angular组件还是指令）都必须声明在schema中。  
   允许的取值包括`NO_ERRORS_SCHEMA`和`CUSTOM_ELEMENTS_SCHEMA`

8. id：string，该模块在`getModuleFactory`中的名字或唯一标识符。如果为`undefined`，该模块不会被注册进`getModuleFactory`

9. jit：boolean

根模块：用于启动应用的模块，常命名为`AppModule`

```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
   import: [
       BrowserModule
   ],
   export: [],
   declarations: [AppComponnet],
   bootstrap: [AppComponent],
   providers: []
})
export class AppModule {
]}
```



目前实际开发中，前6项属性经常出现（ionic）。`id`和`jit`很少使用。

Material Design和Ionic都是模块。

模块可以在应用启动时立即加载，也可以由路由器进行异步的懒加载。

#### 常用模块

| NgModule            | 导入自               | 用处                                                         |
| ------------------- | -------------------- | ------------------------------------------------------------ |
| BrowserModule       | @angular/core        | 需要在浏览器中运行应用；只能在根模块使用，不是特性模块，属于应用级别的模块 |
| CommonModule        | @angular/common      | NgIf和NgFor                                                  |
| FormsModule         | @angular/forms       | 需要构建模板驱动表单（包含NgModel）                          |
| ReactiveFormsModule | @angular/forms       | 需要构建响应式表单                                           |
| RouterModule        | @angular/router      | 需要使用路由功能，并且需要用到RouterLink，.forRoot()和.forChild()时 |
| HttpClientModule    | @angular/common/http | 需要和服务器通信                                             |

### component、template、metadata

### data-binding

### directive

### service

DI



