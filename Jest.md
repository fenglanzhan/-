# Jest

23.6

## Indroduction

### 使用匹配器Matchers

Jest使用“Matchers”通过不同的方式来测试返回值。下面介绍几种常用的匹配器。完整的匹配器API列表，请查看[`expect` API 文档](https://jestjs.io/docs/zh-Hans/expect)

#### 普通匹配器

最简单的测试值的方法看是否精确匹配。

```
test("test plus two is four", () => {
    expect(2 + 2).toBe(4);
})
```

`expect(2 + 2)`返回一个期望的对象。`toBe(4)`时匹配器。

当jest运行时，会跟踪所有失败的匹配器，以便打印详细的错误消息给你。

`toBe`使用`Object.is`来测试严格相等。如果你需要测试对象，可以使用`toEqual`。

`toEqual`递归检查一个对象或者数组的每个字段。——?深度遍历（深度克隆）

同样也可以测试相反的匹配：

```
test("adding positive numbers is not zero", () => {
    for(let a = 1;a < 10;a++){
        for(let b = 1;b < 10;b++){
            expect(a+b).not.toBe(0);
        }
    }
});
```

#### Truthiness

测试中，你经常需要区分`undefined`、`null`、`false`，但是有时候不想区分他们的不同。Jest可以帮助你明确你的需求。

- `toBeNull` matches only `null`
- `toBeUndefined` matches only `undefined`
- `toBeDefined` is the opposite of `toBeUndefined`
- `toBeTruthy` matches anything that an `if` statement treats as true
- `toBeFalsy` matches anything that an `if` statement treats as false

```
test("null", () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeUndefined();
    ...
});
```

你可以使用这些匹配器最精确的复合你想要的代码效果。

#### Numbers

大多数的数字比较有对应的匹配器

- `toBeGreaterThan(number)`
- `toBeGreaterThanOrEqual(number)`
- `toBeLessThan(number)`
- `toBeLessThanOrEqual(number)`
- `toBe`
- `toEqual`
- `toCloseTo`

这些匹配器比较容易理解，也就是大于、大于等于、小于、小于等于

对于数字来说，`toBe`和`toEqual`是等价的。对象类不同

对于浮点数的等式，可以使用`toBeCloseTo`代替`toEqual`，因为你不希望测试的结果取决于一个微小的四舍五入误差。

```
// 经典的0.1 + 0.2 === 0.3的问题
test("adding float point numbers", () => {
    const value = 0.1 + 0.2;
    expect(value).toBe(0.3); // not work
    expect(value).toBeCloseTo(0.3); // work
    expect(value).not.toBe(0.3); // work
})
```

#### Strings

你可以使用`toMatch`，应用正则表达式来检查字符串。

- `toMatch`

```
test("no/have I in team", () => {
    expect().not.toMatch(/I/);
});
```

#### Arrays

你可以使用`toContain`来检查数组是否包含特定元素

```
const Jhon = { name: "Hand" };
const person = [
    Jhon,
];
test("Jhon在么", () => {
    expect(person).toContain(Jhon);
});

```

#### Exceptions异常

如果你想要测试一个特定的方法在调用时抛出错误，使用`toThrow`

```
function compileAndroidCode() {
    throw new ConfigError("using the wrong  JDK");
}
test("compile android goes as expected", () => {
    expect(compileAndroidCode).toThrow();
    expect(compileAndroidCode).toThrow(ConfigError);
    // 也可以使用精确的错误信息或者正则
    expect(compileAndroidCode).toThrow('you are using the wrong JDK');
    expect(compileAndroidCode).toThrow(/JDK/);
})
```

以上也就是个前菜。完整的匹配器列表，请查看[reference docs](https://jestjs.io/docs/en/expect)

如果你学会所有可用的匹配器，下一步开始测试异步代码[test asynchronous code](https://jestjs.io/docs/en/asynchronous)

### Testing Asynchronous Code

测试异步代码

js中运行异步代码是很常见的。当运行异步代码时，Jest需要知道测试的代码何时完成，在代码测试完成之前继续进行另一个测试。Jest有几种常见的方法来解决这个问题。

#### callbacks

最常见的异步模式时回调。

例如，代码中`fetchData(callback)`方法，此方法会获取数据，完成后调用`callback(data)`处理数据。你需要测试`fetchData`返回的数据正好是”peanut butter“。

默认情况下，一旦fetchData执行结束Jest测试就完成了。这并不是测试想要的。

```
// 错误示范
test("the data is peanut butter", () => {
    function callback(data) {
        expect(data).toBe("peanut butter")
    }
    fetchData(callback);
})
```

上面代码的问题是当`fetchData`完成时，测试在调用callback之前就已经完成了，在测试中，callback根本就没有执行。

Jest中有一种替代方案可以解决这个问题。

不要将测试放在具有空参数的函数中，而是使用名为done的单个参数

Jest会一直等到`done`被调用才结束测试。

如果`done()`不会被调用，测试会失败，这正好是想要的效果。

```
test("the data is peanut butter", done => {
    function callback(data) {
        expect(data).toBe("peanut butter");
        done();
    }
    fetchData(callback);
})
```

#### Promises

如果代码中使用Promise，处理异步测试会更简单。在test中返回一个promise，Jest会一直等待这个promise对象变为resolve状态。如果promise是rejected，测试自动失败。

例如，fetchData，不使用callback，而是返回promise。假设，resolve字符串”peanut butter“。

```
test("the data is peanut butter", () => {
    expect.assertions(1);
    return fetchData().then(data => {
        expect(data).toBe('peanut butter')
    })
});
```

请确保返回promise，如果删掉return语句，那么测试将在fetchData完成之前结束。

如果期望promise为rejected，使用`.catch`方法。

请确定添加`expect.assertions`确保一定数量的断言被调用。否则一个fulfilled（已完成）的promise不会失败。

##### .resolves / rejects

可在在Jest 20.0.0+版本中使用

可以在expect语句中使用`.resolves`匹配器，Jest会等待promise到resolve。如果promise为rejected，测试会自动失败。

```
test("the data is peanut butter", () => {
    expect.assertions(1);
    return expect(fetchData()).resolves.toBe("peanut butter");
})
```

`expect.assertions(1)`—————————————告诉Jest会有1个断言。

**请确保返回断言`assertion`**—如果你漏写了`return`语句，测试会在`fetchData`完成之前结束。

如果你期望promise被rejected，使用`.rejects`匹配器。与`resolves`作用类似。如果promise完成了，测试会自动失败。

```
// 简单的测试
test("the data is peanut butter in promise resolve pattern", () => {
    expect.assertions(1);
    // 此处的return如果漏写，test会在fetch函数执行之前结束。也就是不会等待异步调用返回结果。
    return fetchDataPromise().then(data => {
        console.log("data :", data);
        expect(data).toBe("peanut butter");
    }).catch(data => {
        console.log("data :", data);
        expect(data).toBe("not peanut butter");
    });
}

);

function fetchDataPromise() {
    return new Promise((resolve, reject) => {
        const num = Math.random();
        setTimeout(() => {
            num >= 0.5 ? resolve("peanut butter") : reject("not peanut butter");
        }, 1000);
    });
}

```

#### Async/Await

或者你可以在测试中使用`async`和`await`。写async测试，只要把`async`关键放到传入test的方法前就可以。比如

```
test('the data is peanut butter', async () => {
  expect.assertions(1);
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch('error');
  }
});
```

当然，也可以结合使用`async`、`await`和`.resolves`、`rejects`。（在Jest20.0.0+可用）

```
test("the data is peanut butter", async () => {
   await expect(fetchData()).resolves.toBe("peanut butter);
})
```



### Setup and Teardown

设置和重装，这个翻译有点懵逼。。。

当写测试的时候，经常需要在测试运行前的准备工作。而且在测试运行后，需要一些收尾处理工作需要触发。Jest提供帮助函数来处理这些。

#### Repeating Setup For Many Tests为多次测试重复设置

如果需要为多次测试做重复工作，可以使用`beforeEach`和`afterEach`。

比如，我们需要与一个城市数据库做多个交互测试，必须在每个测试前调用`initializeCityDatabase()`初始化数据库，每个测试完成后必须调用`clearCityDatabase()`来清空数据库。可以这样处理：

```
beforEach(() => {
    initializeCityDatabase();
});
afterEach(() => {
  clearCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});
```



#### Order of execution of describe and test blocks : describe和test blocks的执行顺序

在测试文件中，Jest会在执行所有真正的测试前，执行所有的描述事件。这也是在`before*`事件和`after*`事件中进行setup和teardown，而不实在describe blocks中的另一个原因。一旦describe blocks完成，Jest默认按照在收集阶段遇到test的顺序来连续运行所有的测试，等待每个测试完成并在继续之前进行整理。

简而言之：jest执行的顺序是执行所有的describe blocks，如果遇到测试，先放到”测试收集队列“；所有的describe执行完成后，按照”测试手机队列“的顺序，依次执行所有的测试。

#### 通用建议

如果测试失败，第一要检查当且仅当运行本条测试时，它是否仍然失败。在Jest中很容易只运行一个测试—只需要将`test`命令更改为`test.only`：

```
test("", () => {})
test.only("", () => {});
```

如果你有一个测试，当它作为一个更大的用例中的一部分时，经常运行失败，但是当你单独运行它时，并不会失败，所以最好考虑其他测试对这个测试的影响。 通常可以通过修改 `beforeEach` 来清除一些共享的状态来修复这种问题。 如果不确定某些共享状态是否被修改，还可以尝试在 `beforeEach` 中 log 数据来 debug。

### Mock Functions

Mock Functions可以通过擦除函数实际实现、捕获对函数的调用(以及在这些调用中传递的参数)、使用`new`实例化时捕获构造函数的实例、允许在测试时配置返回值，来轻松测试代码之间的连接。

Jest提供两种方法来模拟函数：创建在测试代码中使用的`mock function`(模拟函数)或者编写`manual mock`(手动模拟)覆盖模块依赖。

#### Using a mock function

设想一下我们需要测试`forEach`函数的实现，`forEach`中会对数组的每一项调用回调函数。

```
function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}
```

要测试此函数，我们可以使用mock函数，并检查mock的状态以确保按照预期调用回调。

示例中使用`mockCallback`模拟`callback`

```
const mockCallback = jest.fn(x => 42 + x);
forEach([0, 1], mockCallback);

// The mock function is called twice
expect(mockCallback.mock.calls.length).toBe(2);

// The first argument of the first call to the function was 0
expect(mockCallback.mock.calls[0][0]).toBe(0);

// The first argument of the second call to the function was 1
expect(mockCallback.mock.calls[1][0]).toBe(1);

// The return value of the first call to the function was 42
expect(mockCallback.mock.results[0].value).toBe(42);
```

##### `.mock` property

所有的mock function都有一个特殊的`.mock`属性，这个属性是关于如何调用函数以及保留返回函数的数据。这个属性也会跟踪每次调用的`this`，因此也可以检查`this`。

```
const myMock = jest.fn();

const a = new myMock();
const b = {};
const bound = myMock.bind(b);
bound();

console.log(myMock.mock.instances);
// > [ <a>, <b> ]
```

这些mock member在测试中时非常有用的，可以判断如何被调用，实例化或返回值。

```
// 测试该函数正好被调用一次
expect(someMockFunction.mock.calls.length).toBe(1);

// 测试第一次调用函数时传入的第一个参数是”first arg“
expect(someMockFunction.mock.calls[0][0]).toBe('first arg');

// 测试第一次调用函数时传入的第二个参数是”second arg
expect(someMockFunction.mock.calls[0][1]).toBe('second arg');

// 测试第一次调用函数时的返回值时”return value
expect(someMockFunction.mock.results[0].value).toBe('return value');

// 测试该函数正好被实例化两次
expect(someMockFunction.mock.instances.length).toBe(2);

// 测试该函数第一次实例化的返回值为对象，该对象的”name“属性被设置为”test“
expect(someMockFunction.mock.instances[0].name).toEqual('test');
```

#### Mock Return Values模拟返回值

在测试中，`Mock functions`也可以被用来在代码中注入测试值。

```
const myMock = jest.fn();
console.log(myMock());
// > undefined

myMock
  .mockReturnValueOnce(10)
  .mockReturnValueOnce('x')
  .mockReturnValue(true);

console.log(myMock(), myMock(), myMock(), myMock());
// > 10, 'x', true, true
```

`Mock functions`在使用函数传递风格的代码中非常有效。

以这种风格编写的代码有助于便面使用复杂的存根来创建他们所代表的十几组件的行为，有利于在使用之前将值直接注入到测试中。

```
const filterTestFn = jest.fn();

// Make the mock return `true` for the first call,
// and `false` for the second call
filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

const result = [11, 12].filter(filterTestFn);

console.log(result);
// > [11]
console.log(filterTestFn.mock.calls);
// > [ [11], [12] ]
```

#### Mocking Modules 模拟模块

假设我么你有一个类用于从API中获取用户数据。这个类使用`axios`库来调用API，然后返回包含所有用户信息的data属性。

```
// users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data);
  }
}

export default Users;
```

现在，为了测试这个方法，而不实际的触发API(从而产生缓慢且脆弱的测试)，我们可以使用`jest.mock()`方法来自动模拟axios模块。

一旦我们模拟的模块可以提供一个`mockResolvedValue`给`.get`，这个方法返回我们想要测试断言的数据。

换句话说，我们想要axios.get('users.json')返回一个假的响应。

```
// users.test.js
import axios from 'axios';
import Users from './users';

jest.mock('axios');

test('should fetch users', () => {
  const resp = {data: [{name: 'Bob'}]};
  axios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return Users.all().then(users => expect(users).toEqual(resp.data));
});
```

### Mock Implementations 模拟实现

但是，在特定情况下，仅仅能返回指定的返回值或者使用mock function全面替换实现是不够的。

这种情况可以用`jest.fn`或者mock函数上的`mockImplementationOnce`方法来处理。

```
const myMockFn = jest.fn(cb => cb(null, true));

myMockFn((err, val) => console.log(val));
// > true

myMockFn((err, val) => console.log(val));
// > true
```

当你需要定义mock function的默认实现，且这个mock function是从另一个模块中引入的，`mockImplementation`方法是非常有用的。

```
// foo.js
module.exports = function() {
    ...
}
// test.js
jest.mock('../foo.js');
const foo = require('../foo.js');
// foo is a mock function
foo.mockImplementation(() => 42);
foo();
```

当你需要重新创建一个复杂情况的mock funciton，比如多次函数调用会产生不同的结果，可以使用`mockImplementation`方法：

```
const myMockFn = test.fn()
					 .mockImplementationOnce(cb => cb(null, true))
					 .mockImplementationOnce(cb => cb(null, false));
myMockFn((err, val) => console.log(value);); // true             
myMockFn((err, val) => console.log(value);); // false
```

当mocked function用尽使用`mockImplementationOnce`定义的实现，它会直接运行使用`jest.fn`设置的默认的实现（如果定义）

```
const myMockFn = jest
  .fn(() => 'default')
  .mockImplementationOnce(() => 'first call')
  .mockImplementationOnce(() => 'second call');

console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
// > 'first call', 'second call', 'default', 'default'
```

For cases where we have methods that are typically chained (and thus always need to return `this`), we have a sugary API to simplify this in the form of a `.mockReturnThis()` function that also sits on all mocks:

```
const myObj = {
  myMethod: jest.fn().mockReturnThis(),
};

// is the same as

const otherObj = {
  myMethod: jest.fn(function() {
    return this;
  }),
};
```

#### Mock Names

You can optionally provide a name for your mock functions, which will be displayed instead of "jest.fn()" in test error output. Use this if you want to be able to quickly identify the mock function reporting an error in your test output.

```
const myMockFn = jest
  .fn()
  .mockReturnValue('default')
  .mockImplementation(scalar => 42 + scalar)
  .mockName('add42');
```

#### Custom Matchers

最后，为了断言mock functions如何被调用风简单，我们增加了一些自定义matcher functions

```
// mock function 至少被调用一次的
expect(mockFunc).toBeCalled();
// mock function 使用指定的参数至少被调用一次
expecr(mockFunc).toBeCalledWith(arg1, arg2);
// mock function最后一次调用时使用特定的参数
expect(mockFunc).lastCalledWith(arg1, arg2);
// 所有的滴啊用和模拟名称都被写为快照
expect(mockFunc).toMatchSnapshot();
```

These matchers are really just sugar for common forms of inspecting the `.mock` property. You can always do this manually yourself if that's more to your taste or if you need to do something more specific:



```
// The mock function was called at least once
expect(mockFunc.mock.calls.length).toBeGreaterThan(0);

// The mock function was called at least once with the specified args
expect(mockFunc.mock.calls).toContain([arg1, arg2]);

// The last call to the mock function was called with the specified args
expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1]).toEqual([
  arg1,
  arg2,
]);

// The first arg of the last call to the mock function was `42`
// (note that there is no sugar helper for this specific of an assertion)
expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1][0]).toBe(42);

// A snapshot will check that a mock was invoked the same number of times,
// in the same order, with the same arguments. It will also assert on the name.
expect(mockFunc.mock.calls).toEqual([[arg1, arg2]]);
expect(mockFunc.mock.getMockName()).toBe('a mock name');
```

## Guides



## API Reference

### Globals

### Expect

### Mock Functions

`Mock Functions`也被称为”间谍“。因为它可以帮你监视使用其他代码直接调用的函数的行为，而不实仅仅测试结果。你可以使用`jest.fn()`创建`mock function`。如果没有给出实现，`mock function`在调用时会返回`undefined`

#### Methods

- mockFn.getMockName()
  返回使用`mockFn.mockName(value)`设置的模拟函数名称的字符串

- mockFn.mockName(value)
  接收一个字符串，该字符串在测试结果中代替”jest.fn()“，指示正在引用的mock function。

- mockFn.mock

  - mockFn.mock.calls由函数调用时的调用参数组成的数组。数组中的每一项也是一个数组，是函数调用时传入的参数。
    比如：模拟函数`f`，分别使用参数`f('arg1', 'arg2')`和`f('arg3','arg4')`调用两次，那么`mock.calls`数组形式为：

    ```
    [['arg1', 'arg2'], ['arg3','arg4']];
    ```

  - mockFn.mock.results

  - mockFn.mock.instances

- mockFn.mockClear()
  重置`mockFn.mock.calls`和`mockFn.mock.instances`数组

- mockFn.mockReset()
  `mockFn.mockClear()`的所有作用，而且也会清楚所有模拟的返回值或实现。

- mockFn.mockRestore()
  mockFn.mockReset()的所有作用，而且恢复所有的原始（非模拟）实现 

- mockFn.mockImplementation(fn)
  接收一个函数，该函数被当做mock的实现函数。这个mock本身也会记录所有进入的调用和来自自己的示例，唯一的区别是实现也会在模拟调用时执行。

  > jest.fn(implementation) 是 jest.fn().mockImplementation(implementation)的缩写

  比如：

  ```
  const mockFn = jest.fn().mockImplementation(scalar => 42 + scalar);
  // or: jest.fn(scalar => 42 + scalar);
  
  const a = mockFn(0);
  const b = mockFn(1);
  
  a === 42; // true
  b === 43; // true
  
  mockFn.mock.calls[0][0] === 0; // true
  mockFn.mock.calls[1][0] === 1; // true
  ```

  `mockImplementationcan` also be used to mock class constructors:

  ```
  // SomeClass.js
  module.exports = class SomeClass {
    m(a, b) {}
  };
  
  // OtherModule.test.js
  jest.mock('./SomeClass'); // this happens automatically with automocking
  const SomeClass = require('./SomeClass');
  const mMock = jest.fn();
  SomeClass.mockImplementation(() => {
    return {
      m: mMock,
    };
  });
  
  const some = new SomeClass();
  some.m('a', 'b');
  console.log('Calls to m: ', mMock.mock.calls);
  ```

- mockFn.mockReturnValue(value)

  ```
  const mock = jest.fn();
  mock.mockReturnValue(42);
  mock(); // 42
  mock.mockReturnValue(43å);
  mock(); // 43
  ```

  
