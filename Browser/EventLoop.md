## 浏览器中事件循环
简单来说：同步代码顺序执行，异步事件放入异步队列，待同步代码执行完毕后，轮询执行异步队列的事件。
js主线程有执行栈和任务队列，主线程依次执行代码，遇到函数时会先将函数入栈，执行结束后出栈，直到所有代码执行完毕。
遇到异步操作(延时、网络请求、事件绑定)时，将异步事件放入任务队列，待执行栈清空时轮询读取任务队列的事件
任务队列分为Microtask和Marcotask，微任务和宏任务。
marcotask：script，setTimeout，setInterval，  I/O， UI rendering
microtask：promise，Object.observe

##node中的事件循环

作为对比，我们来看一下node中的时间循环

marcotask：script，setTimeout，setInterval，setImmediate，I/O，UI rendering
microtask：promise，process，nextTrick，Object.observe，MotationObserver