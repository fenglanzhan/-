#### 原型



#### this


#### 类型转换

#### BOM
1. location对象
   - 属性说明
     document.location和window.location都可获取
     以"https://github.com/fenglanzhan/interview"为例
     | 属性名 | 例子 | 说明 |
     | href | 'https://github.com/fenglanzhan/interview' | 当前加载页面的完整URL，使用location.toString()也返回此值
     | protocol | 'https:' | 协议
     | host | 'github.com' | 服务器名称和端口号
     | hostname | 'github.com' | 服务器名称
     | port | '8080'(示例) | 端口号，没有返回''
     | pathname | '/fenglanzhan/interview'| 返回URL中的目录和文件名
     | hash | '#contents'(示例) | 返回URL中hash(#号之后)，如果没有散列，返回''
     | search | '?q=javascript'(示例) | 返回URL中的查询字符串，以？开头
   - 方法说明
     location.assign(url) 相当于 设置location.href，可以只改动上面的属性，都会在浏览器的历史记录中生成一条新纪录，可通过“后退”按钮返回
     location.replace(url) 不会产生历史记录，不会返回
     location.reload(isReload:boolean) 作用为重新加载当前显示的页面；不传参数，页面可能从刘浏览器缓存中加载；传入true，强制从服务器重新加载


#### DOM
1. 事件流
   DOM2级的事件流阶段：事件捕获(从html)、处于事件目标阶段、事件冒泡
   **特例：当在同一目标节点同时注册冒泡和捕获事件，事件触发按照注册的顺序
   ```javascript
      // 以下会先打印冒泡然后是捕获
        node.addEventListener('click',(event) =>{
            console.log('冒泡')
        },false);
        node.addEventListener('click',(event) =>{
            console.log('捕获 ')
        },true)
   ```
2. 鼠标事件
3. 移动端事件
4. 事件委托
   原理：事件冒泡机制
   优点：节省内存，减少事件注册；动态内容无需额外绑定事件
   兼容性问题：IE8及以下没有addEventLisener，需要用attachEvent；IE没有e.target，e.srcElement
   阻止事件冒泡：event.stopPropagation()；IE为window.event.cancelBuble = true；
   阻止默认事件：event.preventDefault()；IE为window.event.returnValue = false;
   **只有当cancelable属性设置为true的事件，才可以使用preventDefault()来取消事件默认行为**
   ```javascript
      var out = document.getElementById("out");
      if(out.addEventListener){
            out.addEventListener("click",function(e){
                var e = e||window.event;
                //IE没有e.target，有e.srcElement
                var target = e.target||e.srcElement;
                //判断事件目标是否是td，是的话target即为目标节点td
                if(target.tagName.toLowerCase()=="td"){
                    changeStyle(target);
                    console.log(target.innerHTML);
                }
            },false);
        }else{
            out.attachEvent("onclick",function(e){
                var e = e||window.event;
                //IE没有e.target，有e.srcElement
                var target = e.target||e.srcElement;
                //判断事件目标是否是td，是的话target即为目标节点td
                if(target.tagName.toLowerCase()=="td"){
                    changeStyle(target);
                    console.log(target.innerHTML);
                }
            });
        };
    };
   ```





####浏览器
1. 跨域
   - 浏览器有同源策略，如果协议、域名、端口有一个不同，则认为是跨域，ajax请求会失败
   - 解决跨域的办法
        - jsonp
            - 原理：script标签没有跨域限制
            - 具体办法：在需要时，动态生成script标签，给src属性赋值为一个需要访问的地址，并提供一个回调函数来接收数据
            - 优点：兼容性好；缺点：只能用于GET请求
            ```javascript
            <!-- 简单实现 -->
            <script src="http://domain/api?param1=a&param2=b&callback=callbackFnName"></script>
            function callbackFnName(data){
                <!-- 代码 -->
            }
            <!-- 函数封装 -->
            <!--  -->
            function jsonp(url,callbackName){
                var script =document.createElement('script');
                script.src = url;
                script.async = true;
                script.type = 'text/javascript';
                <!-- 定义与callbackName同名的全局函数 -->
                window[callbackName] = function (data){
                    <!-- 自定义的数据处理代码 -->
                }
                document.body.appendChild(script);
            }
            ```
        - 跨域资源共享CORS
            - 服务器设置Access-Control-Allow-Origin开启跨域
        - document.domain：适合主域名相同，子域名不同的iframe跨域(给两个页面设置document.domain为主域名即可)
        - h5API：window.postMessage(data,url)
          通常用于获取嵌入页面中的第三方页面数据。一个页面发送消息，另一个页面判断来源并接收消息
          ```javascript
                // 发送消息端
                window.parent.postMessage('message', 'http://test.com');
                // 接收消息端
                var mc = new MessageChannel();
                mc.addEventListener('message', (event) => {
                    var origin = event.origin || event.originalEvent.origin;
                    if (origin === 'http://test.com') {
                        console.log('验证通过')
                    }
                });
          ```
        - 目前的项目开发中实际解决跨域问题不多。用ionic本地开发的时候接触过，启动chrome时加入了disable-web-security，禁用同源策略。
2. 浏览器中事件循环
   简单来说：同步代码顺序执行，异步事件放入异步队列，待同步代码执行完毕后，轮询执行异步队列的事件。
   js主线程有执行栈和任务队列，主线程依次执行代码，遇到函数时会先将函数入栈，执行结束后出站，知道所有代码执行完毕。
   遇到异步操作(延时、网络请求、事件绑定)时，将异步事件放入任务队列，待执行栈清空时轮询读取任务队列的事件
   任务队列分为Microtask和Marcotask，微任务和宏任务。
   marcotask：script，setTimeout，setInterval，setImmediate，I/O，UI rendering
   microtask：promise，process，nextTrick，Object.observe，MotationObserver

3. Node中事件循环
   <u>~~**~~“process.nextTick 永远大于 promise.then，原因其实很简单。。。在Node中，_tickCallback在每一次执行完TaskQueue中的一个任务后被调用，而这个_tickCallback中实质上干了两件事：1. nextTickQueue中所有任务执行掉(长度最大1e4，Node版本v6.9.1)2.第一步执行完后执行_runMicrotasks函数，执行microtask中的部分(promise.then注册的回调)所以很明显process.nextTick 优先于 promise.then”~~**~~</u>
    <span style="color:#ff0000"><span style="color:#ff0000">**process.nextTick > promise.then > setTimeout > setImmediate**</span></span>
4. 存储
   | 特性 | cookie | localstorage | sessionstorage | indexDB |
   | 生命周期 | 一般由服务器生成，可设置过期时间，下面有详解 | 除非被清理，否则一直存在 | 页面关闭即清理，会话存储 | 除非被清理，否则一直存在 |
   | 存储大小 | 4KB | 5M | 5M | 无限 |
   | 与服务器端通信 | 每次会在header中携带，影响性能 | 不参与 | 不参与 | 不参与 |
   | 备注 | 可用document.cookie获取，现在基本不会用于存储 | IOS safari隐藏模式下，getItem会报错，建议使用try-catch封装 | --- | -- |
   | API | --- | getItem，setItem，removeItem | 同左 | 用的不多 |
5. 离线存储
6. 渲染机制


