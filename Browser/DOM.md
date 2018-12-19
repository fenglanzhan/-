#### DOM
1. 事件流
   DOM2级的事件流阶段：事件捕获(从html)、处于事件目标阶段、事件冒泡
   **特例：当在同一目标节点同时注册冒泡和捕获事件，事件触发按照注册的顺序，也就是处于目标阶段，会根据注册事件的先后来顺序触发**

   ```javascript
      // 以下会先打印冒泡然后是捕获
        node.addEventListener('click',(event) =>{
            console.log('冒泡')
        },false);
        node.addEventListener('click',(event) =>{
            console.log('捕获 ')
        },true)
   ```

2. 事件对象Event

   1. 属性

      1. `cancelable`：是否可以取消默认事件
      2. bubbles：事情是否可以冒泡
      3. target：指目标元素
      4. currentTarget：指当前事件绑定的元素，以事件代理为例，即为父元素
      5. eventParse：当前事件触发所处的阶段，返回整数数值，1代表捕获，2代表目标阶段，3代表冒泡阶段
      6. type：事件类型，string
      7. defaultPrevented：boolean，为true，表示已经调用preventDefault()方法
      8. trusted：boolean，当前事件是浏览器内置还是js自定义的
      9. view：当前事件关联的视图，一般是当前window对象

   2. 方法

      1. `preventDefault()`：阻止事件默认行为，生效前提为`cancelable`设置为true
      2. `stopPropagation()`：阻止进一步的事件冒泡或捕获，生效前提`bubbles`为true
      3. `stopImmediatePropagation()`：阻止进一步的时间冒泡或者捕获，而且阻止后续事件的触发

      **备注：**后两个方法的区别，前者不会阻止目标元素后续事件的触发；而后者，在当前事件之后添加的事件都不会触发

3. 事件类型

   1. 鼠标事件
      1. 鼠标事件类型
         1. click
            1. 触发条件：mousedown-mouseup
         2. dblclick
            1. mousedown-mouseup-click-mousedown-mouseup-click-dblclick
            2. IE8及以下，跳过第二次mousedown和第二次click事件
         3. mousedown
         4. mouseup
         5. mousemove
         6. mouseover
         7. mouseout：不冒泡
         8. mouseenter
         9. mouseleave：不冒泡
      2. 鼠标事件属性
         1. clientX：相对于浏览器视口，即浏览器渲染页面的区域，不包括菜单栏区域，不添加滚动区域
         2. pageX：相对于页面视口，即整个页面的位置
            1. 页面没有滚动的情况下，event.pageX == event.clientX
            2. 页面滚动时，IE8及以下，可以使用pageX = clientX + (document.body || document.documentElement).scrollLeft来兼容
         3. screenX：相对于电脑屏幕
         4. offsetX：

4. 移动端事件

5. 事件委托
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




