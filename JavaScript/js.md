> 此文档大部分参考https://github.com/InterviewMap/CS-Interview-Knowledge-Map中的内容，结合自己的部分笔记进行整理。更多内容请阅读上面的github。如果涉及侵权，请留言。
## 数据类型
1. 内置类型：基本类型(number、string、null、undefined、boolean、symbol)、对象
2. typeof返回值：object、number、string、undefined、boolean、symbol、function
3. 内置函数对象：Number，String，Boolean，Symbol，Object，Array，Function，Date，RegExp，Error
## 类型转换
1. 转换为boolean类型-假值：0(+0、-0)，空字符串，null，undefined，NaN，false
2. 
## 浅拷贝与深拷贝
1. 深拷贝
      1. JSON.parse(JSON.stringify(object))  
         缺点：在对象中遇到 undefined、function 和 symbol 时会自动将其忽略，在数组中则会返回 null(以保证单元位置不变)
         ```javascript
          let a = {
              age: 1,
              jobs: {
                  first: 'FE'
              }
          }
          let b =  JSON.parse(JSON.stringify(a))
          a.jobs.first = 'native'
          console.log(b.jobs.first) // FE
         ```
         ```javascript
          JSON.stringify( undefined );//undefined
          JSON.stringify(function () {});//undefined
          JSON.stringify([function(){},34,'str']);//"[null,34,'str']"
          JSON.stringify({a:23,b: function(){}});//"{'a':23}"
         ```
      2. 对数组、对象深拷贝
          ```javascript
          //递归思路：对属性中所有引用类型的值进行遍历，直到是基本类型值为止
          function deepCopy(obj) {
            if (!obj && typeof obj !== 'object') {
              throw new Error('error arguments');
            }
            // const targetObj = obj.constructor === Array ? [] : {};
            const targetObj = Array.isArray(obj) ? [] : {};
            for (let key in obj) {
              //只对对象自有属性进行拷贝
              if (obj.hasOwnProperty(key)) {
                if (obj[key] && typeof obj[key] === 'object') {
                  targetObj[key] = deepCopy(obj[key]);
                } else {
                  targetObj[key] = obj[key];
                }
              }
            }
            return targetObj;
          }
          ```
2. 浅拷贝
    1. Object.assign(obj1,obj2,...)


## 原型
![原型链](https://github.com/fenglanzhan/front_study/blob/master/JavaScript/%E5%8E%9F%E5%9E%8B.png)
1. 每个函数都有prototype属性，该属性保存该函数的原型的指针
2. 所有引用对象属性都可以自由扩展，null除外
3. 所有引用对象都有[[Prototype]]内部属性，可以通过__proto__访问此属性，该属性指向该对象构造函数的原型
4. 属性访问时，当对象本身没有查找到此属性，可以通过__proto__寻找不属于该对象的属性，__ptoto__将对象连接起来构成原型链
### new
1. 使用new操作符调用函数的原理：创建原生对象obj，构建原型链，调用构造函数fn，fn内部this指向obj，判断返回值类型，如果是Object，则直接返回，否则返回obj
2. 箭头函数中没有[[Constructor]]方法，不能使用new调用，会报错”**箭头函数中没有this，不能用构造函数**“
    ```javascript
    // 模拟new调用构造函数，传入构造函数及参数
    function new_(){
      var obj = {};
      var argus = [].slice.call(arguments);
      var Fn = argus.shift();
      obj.__proto__ = Fn.prototype;
      var results = Fn.apply(obj,argus);
      return typeof results==='object'?results:obj;
    }
    ```
3. 注意运算优先级的问题，**new Foo()优先级大于new Foo**
    ```javascript
    function Foo() {
        return this;
    }
    Foo.getName = function () {
        console.log('1');
    };
    Foo.prototype.getName = function () {
        console.log('2');
    };

    new Foo.getName();   // -> 1
    new Foo().getName(); // -> 2  
    ```
### instanceof
1. 引用对象中都有constructor属性，标识对象类型
2. 原理：该函数的原型是否出现在该实例对象的原型链中
    ```javascript
    function instanceof_(left,right){
      var left = left.__proto__;
      var right = right.prototype;
      if(left == right){
        return true;
      }
      if(left == null){
        return false;
      }
      left = left.__proto__;
      instanceof(left,right);
    }
    ```
### 创建对象的方法
1. 字面量和Object构造函数
2. 工厂模式：函数封装；缺点，无法确定对象类型
3. 自定义构造函数模式：可以确定对象类型：构造函数的方法都需要在实例上重新创建，浪费！
4. 原型模式：可以确定对象类型，实例共享原型的方法，无需重建；缺点：属性共享，每个实例都可以修改
5. 构造函数模式定义实例属性，原型模式定义共享方法和属性
### 判断实例类型的方法
1. instanceof：原型链 
2. isPrototypeOf：原型链
3. Object.getPrototypeOf()：返回[[prototype]]的值
### zepto中原型的使用
zepto中将方法放在\$.fn上，jQuery是封装在jQuery.fn，此处主要是为了扩展插件，只有$会暴露在window全局变量
```javascript
  // 构造函数Z
  function Z(dom, selector) {
    var i, len = dom ? dom.length : 0
    for (i = 0; i < len; i++) this[i] = dom[i]
    this.length = len
    this.selector = selector || ''
  }
  // $方法，获取元素
  $ = function(selector, context){
    return zepto.init(selector, context)
  }
  // init方法
  zepto.init = function(selector, context) {
    //code ...
    return zepto.Z(dom, selector)
  }
  // 调用构造函数Z
  zepto.Z = function(dom, selector) {
    return new Z(dom, selector)
  }
  // 构建原型链
  zepto.Z.prototype = Z.prototype = $.fn
```
### 判断变量类型
1. 使用typeof判断是否为基础类型
2. 如果typeof为object，使用(typeof value == 'object') && ( value instanceof Object)，判断是否为null(false为null)
3. 如果为true，使用Object.prototype.toString.call(value).slice(8,-1)获得具体类型
### 判断变量是否为数组
1. ES5：Array.isArray()
2. value instanceof Array
3. Object.prototype.toString.call(value).slice(8, -1) === 'array'
### 属性遍历
1. hasOwnProperty：自身属性
2. in：自身属性及原型属性
3. for in：循环原型链和自身可枚举属性
## 继承
### 类的方法：实际是一种语法糖，下面是ts编译的js代码，可以对比一下
Class和普通构造函数的对比：Class在语法上更加贴合面向对象的写法，Class实现继承更加易读、更加理解，但其本质还是本质使用prototype  
静态成员：类自身成员，可以继承，但是实例无法访问，一般多见于工具类
私有变量：类内部成员，一般不能继承，只能在内部使用，实例无法访问
getter/setter：存储器属性
实例成员：new的实例对象所具有的成员，可以被继承，也可以通过此属性实现代码的复用
抽象类、抽象方法：抽象类，指不可以被实例化的类，通过new调用时会报错，一般设计成父类；抽象方法，只提供方法名、参数、返回值，不负责实现，具体实现由子类完成。如果子类继承抽象类，必须实现父类所有的抽象方法
extends：用来在两个类之间建立[[prototype]]连接，例如class Bar extends Foo，即为Bar.prototype.\__proto__ = Foo.prototype

```javascript
// typescript
class Animal{ 
    type: string;
    constructor() { 
        this.type = 'animal'
    }
}
class Dog extends Animal { 
    constructor() { 
        super()
    }
}
var dog = new Dog();
console.log(dog);

// 编译后的js
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Animal = /** @class */ (function () {
    function Animal() {
        this.type = 'animal';
    }
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super.call(this) || this;
    }
    return Dog;
}(Animal));
var dog = new Dog();
console.log(dog);
```
### 构造函数和原型链
```javascript
function Animal(){
  this.type = 'Animal';
}
// 构造函数方式:在子构造函数中调用父类构造函数
// 部分继承：如果父类的属性和方法都在构造函数中，可以实现全部继承；无法继承父类原型的方法
function Dog(){
  Animal.call(this);
}
// 借助原型链实现继承
// 共享原型对象的属性和方法
function Cat(){
}
Cat.prototype = new Animal();
// 组合方式
// Animal构造函数调用两次；无法确定实例对象是否由子类直接实例化
function Elephant(){
  Animal.call(this)
}
Elephant.prototype = new Animal();
// 改进一
// 无法确定实例对象是否由子类直接实例化
Elephant.prototype = Animal.prototype;
// 改进二
Elephant.prototype = Object.create(Animal.prototype);
Elephant.prototype.constructor = Elephant
```
## this和闭包
### this：**注意隐式丢失的问题**
1. new调用绑定到新创建的对象
2. 使用call、apply、bind调用绑定到指定对象
  1. call、apply都可以改变this的指向，区别是apply参数传递的形式是数组
  2. 模拟call、apply实现
      ```javascript
      // call实现
      Functin.prototype.call_ = function() {
        // 取出需要绑定的对象，如果不存在，则为window对象
        var argusArray = [...arguments].slice(0);
        var context = argus.shift() || window;
        // 思路：我们用上下文调用来实现call的绑定，一般使用对象的方法调用，也就是将方法挂到需要需要绑定的对象上，通过该对象来调用该方法
        // 根据this绑定原则，当前的this指向为需要执行的函数。例如get.call(a)，即为get
        context.fn = this;
        // 传递参数
        var result = context.fn(...argusArray);
        delete context.fn; // context.fn = null;
        return result;
      }
      ```
      ```javascript
      // apply实现
      Function.prototype.apply_ = function() {
        var argsArray = [...arguments].slice(0);
        var context = argsArray.shift() || window;
        context.fn = this;
        var result = context.fn(...argsArray)
        delete context.fn;
        return result;
      }
      ```
      ```javascript
      // bind实现
      // bind的实现还不是特别明白
      Function.prototype.bind_ = function (context) {
        if (typeof this !== 'function') {
          throw new TypeError('Error')
        }
        var _this = this
        var args = [...arguments].slice(1)
        // 返回一个函数
        return function F() {
          // 因为返回了一个函数，我们可以 new F()，所以需要判断
          if (this instanceof F) {
            return new _this(...args, ...arguments)
          }
          return _this.apply(context, args.concat(...arguments))
        }
      }
      ```
3. 上下文调用，按照某个对象的方法调用，绑定到上下文对象
4. 默认情况下：严格模式绑定到undefined，非严格模式绑定到window
5. 箭头函数：箭头函数没有this，取决于外面第一个不是箭头函数的函数的this，而且一旦绑定，不能改变
### 闭包
1. 闭包是：有权访问另一个函数作用域中的变量的函数
2. 闭包的缺点：占用内存；内存泄漏(为什么会有内存泄漏，一直也不懂)
3. 使用场景：函数作为返回值或者参数传递
   ```javascript
    function A() {
      let a = 1
      function B() {
        console.log(a)
      }
      return B
    }
    ```
      解释：为什么函数 A 已经弹出调用栈了，为什么函数 B 还能引用到函数 A 中的变量。因为函数 A 中的变量这时候是存储在堆上的。现在的 JS 引擎可以通过逃逸分析辨别出哪些变量需要存储在堆上，哪些需要存储在栈上。  
4. 实际开发中使用闭包：封装变量，收敛权限(有一个课程里说的，没实际使用过)  
      ```javascript
      function isFirstLoad() {
        var _list = [];
        return function(id) {
            if(_list.index(id) >= 0){
                return false
            }else{
                _list.push(id);
                return true
            }
        }
      }
      // 使用
      var first = isFirstLoad();
      firstLoad(10); // true
      firstLoad(10); // false
      ```
### 垃圾回收
1. js执行环境负责管理代码执行过程中使用的内存。其原理是：找出那些不再继续使用的比那辆，然后释放其占用内存，周期性执行。
2. 垃圾回收方式
      1. 标记清除：主流垃圾收集算法，给当前不适用的值加上标记，然后再回收内存
      2. 引用计数
## 事件
### DOM事件级别
1. DOM0级:ele.onclick = function() {}
2. DOM2级:ele.addEventListener('click', function() {}, false)
3. DOM3级:在DOM2级添加了很多事件类型  
    1. 触摸事件
        1. touchstart
        2. touchmove
        3. touchend
        4. touchcancel  
    2. 手势事件
        1. gesturestart
        2. gesturechange
        3. gestureend
    3. DOMContentLoaded与load事件的区别：DOMContentLoaded事件触发代表初始的HTML 被完全加载和解析，不需要等待CSS，JS，图片加载；而load事件表示页面中的DOM，CSS，JS，图片已经全部加载完毕。
### 事件流
1. 事件类型：事件捕获和事件冒泡
2. 事件流：事件通过事件捕获达到目标阶段，通过事件冒泡从目标元素上传到window对象
3. 描述DOM事件流的具体流程：事件捕获阶段从window对象，经过document、html(document.documentElement)、body一直到达目标元素，按照此顺序逆向冒泡到window对象
4. Event对象常见应用
    1. 阻止默认行为：event.preventDefault();IE：window.event.returnValue=false
    2. 阻止事件冒泡：event.stopPropogation();IE：window.event.cancelBubble()
    3. 阻止后续事件：event.stopImmediatePropagation()
    4. 获取点击的目标元素：event.target；IE：event.srcElement
    5. 获取绑定的事件元素：event.currentTarget
5. 自定义事件
    ```javascript
    // 定义事件类型Event
    var eve = new Event('tap');
    element.addEventListener('tap',function(){});
    // 触发指定事件类型
    element.dispatchEvent(eve);
    // CustomEvent，可传递参数
    var cusEve = new CustomEvent('anytap', {detail: 'this is a customeEvent'});
    element.addEventListener('anytap', function(e){console.log(e.detail)});
    element.dispatch(cusEve)
    ```
### 事件委托
将事件统一绑定到父级元素，原理：事件冒泡。适合采取事件委托的事件：click、mousedown、mouseup、keydown、keyup、keypress  
好处：节省内存；不需要给子节点注销事件

## 事件循环
1. js是单线程、非阻塞、异步、解释性脚本语言：single-thread、non-blocking、asynchronus、concurrent。
      one thread == one call stack == one thing at a time
2. js单线程的原因：避免DOM渲染冲突
3. 异步机制
  1. js的异步机制由事件循环和任务队列构成。
  2. js本身是单线程的，所谓异步是依赖浏览器或者操作系统完成的
  3. js主线程有一个执行栈和一个任务队列，主线程依次执行代码，执行环境顺序入栈，执行完毕后出栈，直到代码执行完毕。当遇到异步事件(延时、网络请求、事件绑定)时，会将异步事件放入任务队列，当执行栈为空时，读取任务队列的异步事件。 
  一个浏览器环境只能有一个事件循环，一个事件循环可以有多个任务队列，每个任务队列有一个任务源。同一个任务队列必须按照先进先出的顺序执行。  
  宏任务macrotask：整体代码、setTimeout、setInterval、setImmediate、I/O、UI rendering
  微任务microtask：Promise、Object.observe、nextTick、process
  执行顺序：首先在Macrotask中取出第一个任务，执行完毕后顺序处理Microtask中所有任务；之后再去Macrotask，周而复始。
  在 ES6 规范中，microtask 称为 jobs，macrotask 称为 task
  事件循环简单来说就是：同步代码顺序执行，异步事件放入任务队列中，同步代码执行完毕后，轮询执行任务队列的事件  
  尾调用：尾调优化。只某个函数的最后一步是调用另一个函数。由调用栈可知，a调用b，调用栈有a和b。但是如果b是a的最后一步，并且不需要保留外层函数调用记录，即a函数调用位置变量等都不需要用到，则该调用栈只会保留b函数，称为“尾调优化”，即只保留内层函数的调用记录
4. nodejs：process.nextTick > promise.then > setTimeout > setImmediate(process.nextTick永远大于 promise.then)
    ```javascript
      console.log('script start');

      setTimeout(function() {
        console.log('setTimeout');
      }, 0);

      new Promise((resolve) => {
          console.log('Promise'); // 这是同步代码
          resolve()
      }).then(function() {
        console.log('promise1');
      }).then(function() {
        console.log('promise2');
      });

      console.log('script end');
      // script start => Promise => script end => promise1 => promise2 => setTimeout
    ```

## Promise
1. 状态：pending、resolved、rejected

## async/await
## 模块化
1. AMD：异步模块定义规范
  1. 代表工具：requireJs
  ```javascript
  // AMD
  define(['./a', './b'], function(a, b) {
      a.do()
      b.do()
  })
  define(function(require, exports, module) {   
      var a = require('./a')  
      a.doSomething()   
      var b = require('./b')
      b.doSomething()
  })
  ```
2. CommonJS：Node中使用的模块化规范
3. ES模块化
## Ajax&&跨域
1. XMLHttpReques对象
    1. status：HTTP状态码
    2. responseText
    3. readyState
        - 0：未初始化，未调用open方法
        - 1：open，未调用send方法
        - 2：send，未接收到响应
        - 3 ：接收部分数据
        - 4：接收全部数据，可使用
2. 同源：域名、端口、协议都相同即为同源
3. 非同源限制：无法操作DOM、ajax请求不能发送、cookie及localstorage无法获取
4. 可跨域的三个标签属性
    1. script的src
    2. img的src
    3. link的href
5. 前后端通信方法
    1. ajax：同源
        ```javascript
        var xhr = new XMLHttpRequest();
        xhr.open('get',url,true);
        xhr.send(null);
        xhr.onload = function() {
        if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
          JSON.parse(xhr.responseText)
          }else{
            console.log('error');
          }
        }
          ```
    2. websocket：不限制
    3. CORS：跨域资源共享，h5新标准
6. 跨域通信的方式
    1. JSONP：script标签的src属性不受同源策略限制；只能用get
        ```javascript
        function jsonp(url, callbackname, success) {
          let script = document.createElemnt('script');
          script.src = url;
          script.type = 'type/javascript';
          script.async = true;
          window[callbackname] = function(data) {
            sucxess && success(data)
          }
          document.body.appendChild(script);
        }
        ```
    2. document.domain：基础域名相同，子域名不同：例如a.test.com和b.test.com，设置document.domain = 'test.com'
    3. hash：url中hash值改变，不会刷新页面#
       ```javascript
        // A嵌入iframe B
        var B = ducument.createElement('iframe');
        B.src = B + '#' + 'data'; //hash值字符串形式
        // B中伪代码
        window.onhashchange = function() {
          var data = window.location.hash;
          // 处理
        }
       ```
    4. postMessage：H5新增API
        ```javascript
        // PostMessage
        // 窗口A(http://a.com)
        window.postMessage('dataForm', 'https://www.baidu.com');
        // 在B窗口监听
        window.addEventListener('message', function(event) {
          console.log(event.origin); // http://a.com
          console.log(event.source); // A窗口的引用
          console.log(event.data); // dataForm
        }, false);
        ```
    5. WebSocket
        ```javascript
          // websocket
          // url:你要发送消息建立连接的url
          var ws = new WebSocket('wss://a.websocket.com');
          ws.onopen = function(evt) {
            console.log('Connection open ...');
            ws.send('hello websocket');
          }
          ws.onmessage = function(evt) {
            console.log('Received message:' + evt.data);
          }
          ws.onclose = function(evt) {
            console.log('Connection closed ...');
          }
          ```
    6. CROS：后台header中设置header("Access-Control-Allow-Origin:*")
        ```javascript
          // CORS:自己参考阮一峰老师的blog
          fetch(url, {method: 'get'}).then(function(response) {

          }).catch(function(err) {
            console.log(err);
          })
        ```
## 安全
1. Cookie安全性问题
   | 属性 | 作用 |
   | --- | ---|
   | value | 如果保存用户登录转台，需要加密，不能明文|
   | http-only | 不允许js访问cookie，减少xss攻击|
   | secure | 只能在https中携带|
   | same-site | 规定浏览器不能在跨域请求中携带 Cookie，减少 CSRF 攻击 |
2. XSS跨站请求攻击（输入脚本）
3. XSRF跨站请求伪造(伪链接)：增加验证流程，如果输入指纹、密码、短信验证
## 存储
  | 特性 | Cookie | LocalStorage | SessionStorage |IndexDB |
  | --- | --- | --- | --- | --- |
  | 数据声明周期 | 一般由服务器生成，可设置过期时间 | 除非被清理，否则一直存在 | 页面关闭即清理 | 除非被清理，否则一直存在
  | 数据存储大小 | 4KB | 5M | 5M | 无限 |
  | 与服务器端通信| 每次会在header中携带，影响性能 | 不参与 | 不参与 | 不参与 | 
  | 备注 | | IOS safari隐藏模式下，localStorage.getItem会报错，建议同意使用try-catch封装 |
## HTTP协议
1. 主要特点：无状态(不记录客户身份)、无连接(不保持连接)、简单快速
2. HTTP报文组成
    1. 请求报文：请求行、请求头、空行、请求体
    2. 响应报文：状态行、响应头、空行、响应体
3. HTTP方法
    1. GET：获取资源
    2. POST：传输资源
    3. PUT：更新资源
    4. DELETE：删除资源
    5. HEAD：获取报文首部
4. POST和GET方法的区别
    1. post请求方法在页面回退时会重新提交
    2. get参数通过url传递，post通过请求体传递数据
    3. get请求参数有长度限制
    4. get请求参数会被保存浏览器历史记录中
    5. get请求产生的url可以被收藏
    6. get会暴露参数，不能用来传递敏感信息
    7. get请求可以被浏览器缓存
5. HTTP状态码
    1. 1XX：指示信息，表示请求已收到
    2. 2XX：成功，请求已被成功接收
        1. 200 OK：客户端请求成功
        2. 206 ：常用于video或audio
    3. 3XX：重定向
        1. 301：永久转移
        2. 302：临时转移
        3. 304：缓存文件可用
      4. 4XX：客户端错误
          1. 400 Bad Request：请求语法错误，服务器无法解析
          2. 401 Unauthorized：请求未经授权
          3. 403 Forbidden：禁止访问资源
          4. 404 Not Found：请求资源不存在
    4. 5XX：服务器错误
6. 持久连接：HTTP1.1版本支持keep-alive，连接持续有效，避免重新建立连接
## 缓存
1. 强缓存
    1. Expires：缓存的过期时间，指服务器时间，在过期时间前可使用
    2. Cache-Control
        1. max-age：缓存的最大有效时间，优先级高于Expires
        2. s-max-age：公共资源，如CDN
        3. no-cache
        4. no-store
        5. private
        6. public
2. 协商缓存
    1. last-modified/if-Modified-since
        1. last-modified：该文件的最后修改时间，由服务器发送
        2. if-modified-since：客户端保存的文件最后修改时间，由客户端发送
        3. 需要和cache-control共同使用，也就是在cache-control判断文件过期时，通过这两个属性来协商缓存
    2. Etag/If-None-Match
        1. Etag：文件的hash值，内容改变，hash就会改变
        2. If-None-Match：客户端存储的文件hash值
        3. 同cache-control共同使用
        4. 比last-modified精确度更高，优先级高
3. 对于某些不需要缓存的资源，可以使用 Cache-control: no-store ，表示该资源不需要缓存  
4. 对于频繁变动的资源，可以使用 Cache-Control: no-cache 并配合 ETag 使用，表示该资源已被缓存，但是每次都会发送请求询问资源是否更新。  
5. 对于代码文件来说，通常使用 Cache-Control: max-age=31536000 并配合策略缓存使用，然后对文件进行指纹处理，一旦文件名变动就会立刻下载新的文件。
## 渲染机制
### 经典问题：浏览器的一个url请求从发送和返回都经历了什么
用户在浏览器中输入url，浏览器对url进行解析，将domain发送到dns服务器，dns服务器根据domain查询相关host对应的IP地址，返回给浏览器；浏览器接收到ip地址后，向该ip地址对应的服务器发送请求，将协议及相关参数等发送到网络中，经过局域网、交换机、路由器、主干网络的传输到达服务器。服务器根据请求，将数据发送给浏览器。  
浏览器的渲染过程：浏览器接收的到数据后(html文件或者数据)，开始做render渲染过程。处理html构建DOM树，处理CSS文件构建CSSOM树，将DOM树和CSSOM合成render树，根据渲染树来布局计算节点位置，调用GPU绘制，合成图层，显示在屏幕上。
## 性能优化

