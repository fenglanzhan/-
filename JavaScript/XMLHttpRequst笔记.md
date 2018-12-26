## XMLHttpRequest

**注意：**我本来是想总结一些自己不熟悉的内容，看完前辈写的总结发现，我对XHR对象几乎一无所知，也就是会用而已（说不定都不会用，框架用多了，感觉什么都不会），我就按照前辈写的框架自己整理了一遍，基本上就是抄了一遍。。。

原版内容请移驾：[[你真的会使用XMLHttpRequest吗？](https://segmentfault.com/a/1190000004322487)](https://segmentfault.com/a/1190000004322487)

> web开发中，浏览器通过`XMLHttpRequest`对象进行http通信
>
> 在开发中，我们使用`XMLHttpRequest`对象来发送`Ajax`请求

### XMLHttpRequest(简称XHR)简介

我们先来说一下XHR的两个标准`Level1`和`Level2`

#### Level1标准

1. 受同源策略限制，不能发送跨域请求

2. 不能发送二进制文件(如图片、视频、音频等)，只能发送纯文本数据

3. 在发送和获取数据的过程中，无法实时获取进度信息，只能判断是否完成

4. 主要属性

   1. xhrreadyState：对象状态

      - 0：创建，未调用`open()`方法

      - 1：已调用`open()`方法

      - 2：`send()`方法被调用

      - 3：下载中，接收部分数据，responseText已有部分数据
      - 4 ：数据接收完毕

   2. xhr.status：服务器返回的状态码

   3. xhr.responseText：服务器返回的文本数据

   4. xhr.responseXML

   5. xhr.statusText："200 OK"，服务器返回的状态文本

   6. xhr.onreadystatechange：readystate发生变化时调用的方法

```javascript
// level1 的写法
let xhr = new XMLHttpRequest();
xhr.open('GET', '/url', true);
// POST方法
// xhr.open('POST', '/url', true);
// xhr.send(sata);
xhr.onreadystatechange = res => {
	const status = xhr.status;
    if(xhr.readyState == 4 && (status >= 200 && status < 300 || status === 304)) {
        // request success
    }else {
        // request error
    }
}
xhr.send();
```

#### Level2标准

1. 在服务端允许的情况下，可以发送跨域请求-应该是CROS
2. 支持发送和接收二进制数据
3. 新增formData对象，支持发送表单数据
4. 发送和获取数据时，可以获取进度信息
5. 可以设置请求的超时时间

### 兼容性

我主要是做移动端web开发的，先来看一下移动端对level2支持情况

![image-20181220121606577](/Users/anitacao/Library/Application Support/typora-user-images/image-20181220121606577.png)

移动端支持的情况：

1. Android 4.4.4版本及以上已经全部支持
2. ios的版本升级一向很好，从[百度流量研究院](https://mtj.baidu.com/data/mobile/device)数据来看，ios8以下基本可以忽略不计，支持情况也很好

![image-20181220122138412](/Users/anitacao/Library/Application Support/typora-user-images/image-20181220122138412.png)

PC支持情况：

1. IE9及以下完全不支持，IE10和IE11不支持 `responseType`为 `json`格式
2. 部分浏览器不支持设置请求超时
3. 部分不支持`xhr.responseType`为`blob`格式

### XHR对象属性和事件-level2

这里涉及3个接口，`XMLHttpRequest`、`XMLHttpRequestUpload`、`XMLHttpRequestEventTarget`，还是代码看起来比较清楚

```javascript
interface XMLHttpRequestEventTarget : EventTarget {
  // event handlers
  attribute EventHandler onloadstart;
  attribute EventHandler onprogress;
  attribute EventHandler onabort;
  attribute EventHandler onerror;
  attribute EventHandler onload;
  attribute EventHandler ontimeout;
  attribute EventHandler onloadend;
};

interface XMLHttpRequestUpload : XMLHttpRequestEventTarget {

};

interface XMLHttpRequest : XMLHttpRequestEventTarget {
  // event handler
  attribute EventHandler onreadystatechange;
  readonly attribute XMLHttpRequestUpload upload;
};
```

1. 事件
   1. onloadstart：调用`xhr.send()`方法后理解触发
   2. onprogress：
      1. `xhr.upload.onprogress`在上传阶段（`xhr.send()`调用之后，`xhrreadyState=2`之前）触发，每50ms触发一次
      2. `xhr.onprogress`在下载阶段（`xhrreadyState=3`时）触发，每50ms触发一次
   3. onabort：调用xhr.abort()后触发
   4. ontimeout：xhr.timeout不等于0时，由onloadstart开始，当到达xhr.timeout，还未触发onloadend，触发此事件
   5. onload：请求==成功==完成时触发，xhrreadyState=4
   6. onloadend：请求==结束==（包括请求成功和请求失败）触发
   7. onerror
      1. 请求过程中，发生Network error触发此事件；上传未结束时，发生Network error，下面触发xhr.upload.onerror，再触发xhr.onerror，否则只触发xhr.onerror
      2. 只有发生网络层级别的异常才会触发此事件，对于应用层级别的异常，如相应返回xhr.statusCode为4XX，并不属于Nerwork error，不会触发onerror事件，而会触发onload事件（[七层模型了解一下](https://www.cnblogs.com/lemo-/p/6391095.html)）
   8. onreadystatechange：`xhr.readyState`改变时触发
2. 属性
   1. upload：`XMLHttpRequestUpload`对象，此对象中继承了上面7个事件
3. 事件触发顺序
   1. 请求正常时
      1. xhr.onreadystatechang：在xhrreadyState改变时都会触发
      2. xhr.onloadstart：
      3. 上传阶段
         1. xhr.upload.onloadstart
         2. xhr.upload.onprogress
         3. xhr.upload.onload
         4. xhrupload.onloadend
      4. 上传结束，下载阶段
         1. xhr.onprogress
         2. Xhr.onload
         3. xhr.onloadend
   2. 发生`abort`、`timeout`、` error`异常
      1. 发生`abort`、`timeout`、` error`异常时，立即终止当前请求
      2. 将`readystate`置为`4`，触发`xhr.onreadystatechange`事件
      3. 上传阶段未结束，依次触发
         1. `xhr.upload.onprogress`
         2. `xhr.upload.onabort`或`xhr.upload.ontimeout`或`xhr.upload.onerror`
         3. `xhr.upload.onloadend`
      4. 触发`xhr.onprogress`事件
      5. 触发`xhr.onabort`或`xhr..ontimeout`或`xhr.onerror`
      6. 触发`xhr.onloadend`事件

```
let xhr = new XMLHttpRequest();
let formData = new FormData();
formData.append('name', 'Feng');
xhr.reaponseType = 'json';
xhr.timeout = 3000;
xhr.opne('POST', '/url', true);
// level 2标准
// 请求成功完成时触发，此时 xhr.readustate = 4
xhr.onload = res => {
   	if(this.status >= 200 && this.status < 300 || this.status == 304) {
        console.log(this.responseText);
   	}
}
// 请求结束时触发，包括请求成功和请求失败
xhr.onloadend = re => {
    
}
// 请求出错
xhr.onerror = err => {
    
}
// 请求超时
xhr.ontimeout = err => {
    
}

xhr.send(formData);

```

#### 设置请求头-xhr.setRequestHeader

1. Content-Type：
2. 该方法必须在`open()`之前`send()`之后调用
3. 采用append追加的方式，不会覆盖，会合并

#### 获取响应头

1. xhr.getAllResponseHeaders()：获取response所有的header字段

2. xhr.getResponseHeader(key)：获取某个指定的header字段值
3. 会有限制



#### 指定xhr.response的数据类型

如果服务器返回的是纯JSON字符串，但是我们希望返回的xhr.response是一个对象

1. xhr.overrideMineType()

   1. 优点：level1方法，兼容性好

   2. 作用：重写`response`的`content-type`

      ```
      xhr.overrideMineType('text/xml;charset=utf-8'); // 将返回的document或xml文档转换成DOM对象
      ```

      ```
      // level1 不支持blob二进制数据，可以用此方法
      // 思路：如果我们想获取一张图片，可以将response的content-type设置为'text/plain;charset=x-user-defined'，使xhr以纯文本的格式来解析收到的blob数据，通过responseText拿到的就是图片对应的二进制字符串，最后将其转换为blob数据
      var xhr = new XMLHttpRequest();
      //向 server 端获取一张图片
      xhr.open('GET', '/path/to/image.png', true);
      
      // 这行是关键！
      //将响应数据按照纯文本格式来解析，字符集替换为用户自己定义的字符集
      xhr.overrideMimeType('text/plain; charset=x-user-defined');
      
      xhr.onreadystatechange = function(e) {
        if (this.readyState == 4 && this.status == 200) {
          //通过 responseText 来获取图片文件对应的二进制字符串
          var binStr = this.responseText;
          //然后自己再想方法将逐个字节还原为二进制数据
          for (var i = 0, len = binStr.length; i < len; ++i) {
            var c = binStr.charCodeAt(i);
            //String.fromCharCode(c & 0xff);
            var byte = c & 0xff; 
          }
        }
      };
      
      xhr.send();
      ```

2. xhr.responseType

   1. level2的属性，用来指定xhr.response的数据类型
   2. 缺点：有兼容性问题
   3. 可设置的值
      1. ""：将xhr.response设置为字符串类型，default
      2. "text"：将xhr.response设置为字符串类型
      3. "document"：将xhr.response设置为Document对象，希望返回XML格式数据时使用
      4. "json"：将xhr.response设置为JavaScript对象，有兼容性问题，IE10和IE11不支持
      5. "blob"：将xhr.response设置为Blob对象
      6. "arrayBuffer"：将xhr.response设置为ArrayBuffer对象

   ```
   var xhr = new XMLHttpRequest();
   xhr.open('GET', '/path/to/image.png', true);
   xhr.responseType = 'blob';
   xhr.onload = (e) =>  {
       this.response
   }
   xhr.send();
   ```

   #### 获取response数据

   1. xhr.response
      1. default：""
      2. 请求==完成==时，才有正确的值
      3. 请求未完成，为""或者null
   2. xhr.responseText
      1. default：""
      2. 只有responseType为"text"、""，xhr才有此属性
      3. 请求==成功==时，才有正确的值
      4. 请求未完成，为""
   3. xhr.responseXML
      1. default：null
      2. 只有responseType为"text"、""、"document"，xhr才有此属性
      3. 只有请求==成功且返回数据被正确解析==才能拿到正确值

#### 设置timeout

1. 同步请求，xhr.timeout必须设置为0，否则会抛出错误

2. 请求开始是调用xhr.send()之后，结束时xhr.onload事件触发

#### 获取上传、下载进度

使用`onprogress`事件来实时显示进度，上传过程和下载过程触发的是不同对象的`onprogress`事件

```
xhr.onprogress = updateProgress;
xhr.upload.onprogress = updateProgress;
function  updateProgress(ev) {
    if (ev.lengthComputable){
        let percentage = ev.loaded /ev.total;
    }
}
```

#### 可发送的数据类型

xhr.send(data)中data的数据类型

-  ArrayBuffer
-  Blob
-  Document
-  DOMString
-  FormData
-  null

断网状态下调用xhr.send(data)会抛出`Uncaught NetworkError: Failed to execute 'send' on 'XMLHttpRequest'`，可以用`try-catch`捕获异常



Cookie

在发同域请求时，浏览器会将`cookie`自动加在`request header`中。在发送跨域请求时，`cookie`并没有自动加在`request header`中。

在`CORS`标准中做了规定，默认情况下，浏览器在发送跨域请求时，不能发送任何认证信息（`credentials`）如"`cookies`"和"`HTTP authentication schemes`"。除非`xhr.withCredentials`为`true`（`xhr`对象有一个属性叫`withCredentials`，默认值为`false`）。

`cookies`也是一种认证信息，在跨域请求中，`client`端必须手动设置`xhr.withCredentials=true`，且`server`端也必须允许`request`能携带认证信息（即`response header`中包含`Access-Control-Allow-Credentials:true`），这样浏览器才会自动将`cookie`加在`request header`中。

要特别注意一点，一旦跨域`request`能够携带认证信息，`server`端一定不能将`Access-Control-Allow-Origin`设置为`*`，而必须设置为请求页面的域名。
