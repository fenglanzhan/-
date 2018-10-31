## 原型
1. 每个函数都有prototype属性，该属性保存该函数的原型的指针
2. 所有引用对象属性都可以自由扩展，null除外
3. 所有引用对象都有[[Prototype]]内部属性，可以通过__proto__访问此属性，该属性指向该对象构造函数的原型
4. 属性访问时，当对象本身没有查找到此属性，可以通过__proto__寻找不属于该对象的属性，__ptoto__将对象连接起来构成原型链
### new
1. 使用new操作符调用函数的原理：创建原生对象obj，构建原型链，调用构造函数fn，fn内部this指向obj，判断返回值类型，如果是Object，则直接返回，否则返回obj
2. 箭头函数中没有[[Construct]]方法，不能使用new调用，会报错<span style="color: red">箭头函数中没有this，不能用构造函数</span>
```
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
### instanceof
1. 引用对象中都有constructor属性，标识对象类型
2. 原理：
