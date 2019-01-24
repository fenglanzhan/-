# Jest

23.6



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



### Mock Functions

