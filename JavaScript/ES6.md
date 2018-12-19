## ES6

说明：es6语法总结

- [let和const](#let%E5%92%8Cconst)
- [解构赋值](#%E8%A7%A3%E6%9E%84%E8%B5%8B%E5%80%BC)
- [Symbol](#symbol)
- [数据结构Map、WeakMap、Set和WeakSet](#%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84mapweakmapset%E5%92%8Cweakset)
- [新增API](#%E6%96%B0%E5%A2%9Eapi)
- [Promise](#promise)
- [Async-await](#async-%08await)
- [类class](#%E7%B1%BBclass)
- [模块module](#%E6%A8%A1%E5%9D%97module)
- [Iterator和for-of循环](#iterator%E5%92%8Cfor-of%E5%BE%AA%E7%8E%AF)
- [Generator函数](#generator%E5%87%BD%E6%95%B0)
- [Decorator](#decorator)
- [Proxy和Reflect](#proxy%E5%92%8Creflect)

#### let和const

1. let

   1. 生成块作用域

   2. 暂时性死区：<span style="color:red">把let的声明放在作用域最前面</span>

      ```javascript
      //不存在变量提升
      {
          console.log(a);//undefined(不会抛出错误)
          console.log(b);//ReferenceError
          let b;
          var a;
      }
      {
          console.log(typeof a);//a未声明，此处为undefined
          typeof a === 'undefined'//true
          console.log(typeof b);//b声明，但是处于暂时性死区，报错Uncaught ReferenceError: b is not defined
          typeof b === 'undefined'
          let b;
      }
      ```

   3. 不可重复声明

      ```javascript
      //
      {
          let b = 23;
          let b = 78;//Uncaught SyntaxError: Identifier 'b' has already been declared
      }
      ```

2. const

   1. 用于创建常量，也就是设置了初始值就为只读的变量
   2. 对于对象来说，以const声明的变量只保存指针，只要指针不做修改即可
   3. const声明变量必须赋值

#### 解构赋值

1. ...运算符(spread/rest展开/收集运算符)

   1. 用在数组(iterable)之前，会展开为独立的值spread

      ```javascript
      //
      {
          let arr = [{a:323},[23,23],23,90,'sdf']
          console.log(...arr);//展开为{a:323},[23,23],23,90,'sdf'
          let a = [1,23,4]
          let b = [45,...a,89,90];//[45,1,23,4,89,90]
      }
      ```

   2. 把一系列的值收集为一个数组

      1. <p style="color:red">应用：将函数arguments转换为数组</p>

         - Array.prototype.slice.call(arguments)
         - foo(...arg)

      ```javascript
       //
       {
           let [x,y,z,...m] = [1,2,3,45,45,23,124];
           console.log(x,y,z,m);//1 2 3  [45, 45, 23, 124]slice
           //转换的js代码
           var _a = [1, 2, 3, 45, 45, 23, 124], x = _a[0], y = _a[1], z = _a[2], m = _a.slice(3);
           console.log(x, y, z, m);
      
           function foo(x,y,...z){
               console.log(x,y,z)
           }
           foo(1,2,4.5,342,12,5)
           //解析的js代码
           function foo(x, y) {
               var z = [];
               for (var _i = 2; _i < arguments.length; _i++) {
                   z[_i - 2] = arguments[_i];
               }
               console.log(arguments);
               console.log(x, y, z);
           }
           foo(1, 23, 5, 23, 4);
       }
      ```

2. 解构赋值

   1. 数组解构赋值(注意和...的混合使用)

   2. 对象解构赋值

      ```javascript
      //将属性赋值给同名属性变量
      let obj = {a:'name',b:'sex',c:'age'}
      let {a,b,c} = obj;
      //把属性赋值给非同名属性变量
      let {a:x,b:y,c:z} = obj;
      console.log(a,b,c)//Uncaught ReferenceError: a is not defined
      console.log(x,y,z);//'name','sex','age'
      ```

#### Symbol

1. Symbol的作用：提供一个独一无二的值
2. 1. 注意点
   2. 通过Symbol定义的属性名，用for-in和let-of都是拿不到的
   3. Symbol.for(str)的作用：先查找有没有用str
   4. Object.getOwnPropertySymbols(obj):取obj所有的用symbol作为key的属性名，以数组形式返回
   5. Reflect.ownkeys(obj)：可以返回所有属性，以数组形式返回

```javascript
{
    // 声明
    let a1 = Symbol();
    let a2 = Symbol();
    a1 === a2; //false
    let a3 = Symbol.for('a3');
    let a4 = Symbol.for('a3');
    console.log(a3,a4);//ymbol(a3) Symbol(a3)
    console.log(a4 === a3);//true
}

{
    let a1 = Symbol.for('abc');
    let obj = {
        [a1] : '234',
        'abc' : 'dfs',
        'c' : 35
    };
    console.log('obj',obj);//{abc: "dfs", c: 35, Symbol(abc): "234"}
}
```

#### 数据结构Map、WeakMap、Set和WeakSet

#### 新增API

#### Promise

#### Async-await

#### 类class

#### 模块module

#### Iterator和for-of循环

#### Generator函数

#### Decorator

#### Proxy和Reflect

