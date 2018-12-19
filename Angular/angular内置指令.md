## Angular内置指令

1. 属性型指令

   1. ngStyle：使用动态值给特定的`DOM`元素设置`CSS`属性

      ```
      // ts
      backcolor: string = 'red';
      // html
      <div [style.color]="yellow">hello world</div>
      <div [style.background-clor]="backColor">hello world</div>
      <div [style.font-size.px]="20">hello world</div>
      <div [ngStyle]="{color: 'white', 'background-color': 'blue', 'font-size.px': '20'}">
      ```

      **注意：`连字符-`不允许出现在对象的键名中，需要加上单引号**

   2. ngClass：动态设置和改变给定`DOM`元素的`CSS`类

      ```
      // .scss
      .bordered {
          border: 1px solid #ccc;
      }
      // .ts
      isBordered: boolean = true;
      // .html
      <div [ngClass]="{bordered: isBordered}">显示边框</div>
      ```

   3. ngSwitch：见结构型指令

2. 结构型指令

   1. ngFor：
      `*ngFor="let item of arrays"`

   2. ngIf：
      `*ngIf="expression"`

   3. ngSwitchCase和ngSwtichDefault：放置条件复杂的情况导致过多的使用`ngIf`  
      `[ngSwtich]`绑定目标（这个是属性型指令），`ngSwitchCase`列出可能值，`ngSwitchDefault`默认值

      ```html
      <div class="container" [ngSwitch]="mgAge">
      	<div *ngSwitchCase="'10'">age = 10</div>
      	<div *ngSwitchCase="'20'">age = 20</div>
      	<div *ngSwitchDefault="'30'">age = 30</div>
      </div>
      ```