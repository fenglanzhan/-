## 原型
1. 每个函数都有prototype属性，该属性保存该函数的原型的指针
2. 所有引用对象属性都可以自由扩展，null除外
3. 所有引用对象都有[[Prototype]]内部属性，可以通过__proto__访问此属性，该属性指向该对象构造函数的原型
4. 属性访问时，当对象本身没有查找到此属性，可以通过__proto__寻找不属于该对象的属性，__ptoto__将对象连接起来构成原型链
### new
1. 使用new操作符调用函数的原理：创建原生对象obj，构建原型链，调用构造函数fn，fn内部this指向obj，判断返回值类型，如果是Object，则直接返回，否则返回obj
2. 箭头函数中没有[[Construct]]方法，不能使用new调用，会报错**箭头函数中没有this，不能用构造函数**
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
3. 注意运算优先级的问题，**new Foo()优先级大于new Foo**
```
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
```
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
zepto中将方法放在$.fn上，jQuery是封装在jQuery.fn，此处主要是为了扩展插件，只有$会暴露在window全局变量
```
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
## 继承
### 类的方法：实际是一种语法糖，下面是ts编译的js代码，可以对比一下
静态成员：类自身成员，可以继承，但是实例无法访问，一般多见于工具类
私有变量：类内部成员，一般不能继承，只能在内部使用，实例无法访问
getter/setter：存储器属性
实例成员：new的实例对象所具有的成员，可以被继承，也可以通过此属性实现代码的复用
抽象类、抽象方法：抽象类，指不可以被实例化的类，通过new调用时会报错，一般设计成父类；抽象方法，只提供方法名、参数、返回值，不负责实现，具体实现由子类完成。如果子类继承抽象类，必须实现父类所有的抽象方法
extends：用来在两个类之间建立[[prototype]]连接，例如class Bar extends Foo，即为Bar.prototype.\__proto__ = Foo.prototype

```
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
```
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
