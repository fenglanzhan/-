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
