#### BOM
1. location对象

   1. 属性说明：都是可写的，除了hash的赋值，其余都会刷新页面，并生成浏览记录；document.location和window.location都可获取

   2. 以"https://github.com/fenglanzhan/interview"为例
      |  属性名  |                  返回值                  |                     说明                     |
      | :------: | :--------------------------------------: | :------------------------------------------: |
      |   href   | https://github.com/fenglanzhan/interview |                   完整url                    |
      | protocol |                  https                   |                     协议                     |
      |   host   |                github.com                |                服务器加端口号                |
      | hostname |                github.com                |                    主域名                    |
      | pathname |          /fenglanzhan/interview          |                                              |
      |   hash   |                 #content                 |               \#号后面的内容，               |
      |  search  |                  ?a=js                   | 以?开头，多个用&分割，可以自己处理成json格式 |

   3. 方法说明

     1. location.assign(url) ：相当于设置location.href，也可以只改动上面的属性，都会在浏览器的历史记录中生成一条新纪录，可通过“后退”按钮返回
     2. location.replace(url) ：不会产生历史记录
     3. location.reload(isReload:boolean) ：作用为重新加载当前显示的页面；不传参数，页面可能从刘浏览器缓存中加载；传入true，强制从服务器重新加载

2. history
   1. 属性：length，历史记录的条数
   2. 方法
      1. go(number)：前进几步
      2. back()：等同于go(-1)
      3. forword()：等同于go(1)



