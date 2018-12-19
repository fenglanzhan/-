## Ionic3 中使用NavController进行反向传值

ionic中使用`NavController`进行导航，通过`pop`、`push`来进行页面切换。

### 正向传值

正向传值很简单，`push`方法中将数据作为第二个参数传入即可；在下一个页面中使用`NavParams`来接收数据

```
import { NavController } from 'ionic-angular';
constructor(public navCtrl: NavController) {}

let data: Object = {  info: '这是要传递的数据'};
this.navCtrl.push(NavPage, data);
```

###反向传值

反向传值，也就是在使用`pop`方法时，将数据传回上一个页面

注意：一般来说，需要方向传值的时候，使用`ModalController`即可。当然也有其他的办法，比如`localstorage`、`cookie`、`@Output`或者单例服务。

具体代码如下

```
// first page
this.navCtrl.push(NextPage, {
	callback: (data) => {
		// ...处理data
		console.log(data);
	}
})
// next page：popPage为监听返回按钮的处理事件
popPage() {
	let callbackFunc = this.navParams.get('callback');
	let popData = {info: '这是要传回的数据'};
	callback(popData);
	this.navCtrl.pop();
}

```

 这里是利用闭包来实现数据的传递，callback作为会回调函数传入新页面。

我粗略看了一下ionic的源码(ionic3)，ModalController也是用这种方式来传递数据的。

由于前端基础不扎实，对闭包了解不深，所以不敢妄下判断，有错误，请各位大神指正。