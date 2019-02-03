#Understanding Redux

### 什么是Redux？

Redux的官方文档是这样定义的：Redux 是JavaScript应用可预测的状态管理容器

***`Redux is a predictable state container for JavaScript apps`***

当我第一次读到这句话时，感觉这9个单词就像90个不完整的短语。我完全无法理解。也许，你也是如此

不要急，稍后我会解释一下，而且随着你越来越多的使用Redux，这句话会变得更清晰。

从好的方面说，如果你多阅读一些文档，你会在那里找到更多的解释资料。

文档中说到：它可以帮你编写行为一致的应用程序

***`It helps you write applications that behave consistently`***

你明白这句话是什么意思么？

在大型应用中，Redux可以避免状态管理的麻烦。它可以提供更好的开发体验，同时确保不会牺牲应用的可测试性。

如果你要开发React应用，你会发现将所有状态保存在顶级的组件中已经不再满足开发的需求。

随着时间的推移，应用中可能会有大量的数据发生改变。

Redux可以解决这类的难题。

友情提示，这并不是唯一的解决办法。

### 为什么使用Redux

如您所知，类似于”为什么使用A而不使用B“的问题，主要归结于个人偏好。

我已经创建很多应用，都没有使用Redux。

### 详解Redux

本书中此章节很重要。这里对Redux的类比将会贯穿全书。

想象一下类似的场景-你去银行取钱。尽管你不经常去，但是你可能了解具体的流程。

去银行的路上，脑子里会有一个目的**`intention/action`**：取到钱**`WITHDRAW_MONEY`**

当进入银行后，你会直接告知银行柜员**`Cashier`**你的要求。是的，你需要去`Cashier`那里，而不是直接走到银行金库直接取出你的钱。`Cashier`从他们的电脑中输入指令，并将钱取出来给你。

类比Redux：

Bank Vault              ===== `Redux Store`：保存所有的应用状态，并保证状态安全

Cashier                    ===== `reducer`

Money                     ===== `state`

withdraw money   ===== `action`

#### the first Redux principle

*Have a single source of truth: The state of your whole application is stored in an object tree within a single Redux store.One application STATE OBJECT managed by ONE STORE*

####the second Redux principle

*State is read-only*：

*The only way to change the state is to emit an action, an object describing what happened.*

#### the third Redux principle 

*To specify how the state tree is transformed by actions, you write pure reducers.*

### 理解Reducer

在Redux中使用`createStore`来创建一个`store`，这个方法可以传入一些参数，第一个是`reducer`

把Reducer想象成Cashier，reducer和store沟通，就像cashier与vault同步一样。

创建store必须传入一个reducer，其余参数是可选的。

我们来类比一下`Array.reduce()`方法

```
let arr = [1, 2, 3];
let sum = arr.reduce((x,y) => x + y)
console.log(sum); // 15
```

事实上，传入的方法就是一个reducer，中文翻译为减速器。

reducer方法的参数是由Array.reduce()方法来指定的。

所以说，`createStore(reducer)`中reducer的参数是由createStore来指定的。

下面是Redux源码中`createStore`的简单实现。

```
function createStore(reducer) {
	var state;
	var listeners = [];
	fucntion getState() {
        return state;
	}
	function subscribe(listener) {
    	listeners.push(listener)
        return unsubscribe() {
            var index = listeners.indexOf(listener)
            listeners.splice(index, 1);
        }
	}
	
	fucntion dispatch(action) {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
	}
	return { dispatch, getState, subscribe }
}
```

`createStore`的第二个参数

设想一下，你去银行开户，一般会存入一些存款`deposit`，也就是初始存款。

```
createStore(reducer, initialState)
```

## Summary

- Redux is a predictable **state container** for JavaScript apps.
- The `createStore` factory function from Redux is used to create a Redux `STORE`.
- The `Reducer` is the only mandatory argument passed into `createStore()`
- A `REDUCER` is just a function. A function that takes in **two** parameters. The first is the `STATE` of the app, and the other is an `ACTION.`
- A `Reducer` always returns the `new state`of your application.
- The Initial State of your application, `initialState` is the second argument passed into the `createStore` function call.
- `Store.getState()` will return the current state of your application. Where `Store` is a valid Redux `STORE`.



在React中，可以使用`setState()`来改变state。

Remember that a good way to read long content is to break it up into shorter digestible bits.

请记住，阅读长内容的好方法是将其分解为更短的易消化。

Chapter3 理解使用Actions更新State

通俗的理解，设想一下你去银行，当你坐在柜台，一般柜员会问你”您好，请问办理什么业务？“，你选择办理的业务就是action

在react中，可以使用setState()，更改state。与pure react不同，在redux应用中，唯一可以更新state的方法就是让reducer知道你的意图。这种方式就是 `dispatch action`。

问题在于：如何描述一个action。

一个action可以使用一个简单的js对象来精确的描述。

action必须有一个`type`字段，这个字段用来描述这个action的意图。此外还有一些信息来描述。

在银行的例子中，可以这样描述

```
{
    type: "withdraw_money",
    amount: $4000""
}
```

不过通用的方法是使用一个`payload`字段来描述数据

```
{
    type: "withdraw_money",
    payload: {
       	 amount: "$4000" 
    }
}
```

`type`字段描述这个action，其余描述action所需的数据或信息放入`payload`字段。

创建action的方法:在action的type相同的时候，我们可以使用下面的方法来创建action

```
const setTechnology = text => ({ type: "SET_TECHNOLOGY", text });
```



Having the rendering of the `<App/>` wrapped within a function means we can now subscribe to updates to the store like this:

```
const render = function() {
   ReactDOM.render(<App />, document.getElementById("root")
}
render()
store.subscribe(render);
```

Whenever a re-render occurs, `store.getState()` on line 4 will now fetch the updated state.

We are successfully dispatching an action, receiving money from the Cashier, and then subscribing to receive notifications. Perfect!对应到Redux中解释一下这段话

### Important Note on Using store.subscribe()

There are a few caveats to using `store.subscribe()` as we’ve done here. It’s a low-level Redux API.

实际开发中，我们考虑性能原因，主要使用绑定，比如`react-redux`

### Conclusion and Summary

- Unlike `setState()` in pure React, the only way you update the state of a Redux application is by dispatching an action.
- An action is accurately described with a plain JavaScript object, but it must have a `type` field.
- In a Redux app, every action flows through the reducer. All of them.
- By using a `switch` statement, you can handle different action types within your Reducer.
- Action Creators are simply functions that return action objects.
- It is a common practice to have the major actors of a redux app live within their own folder/directory.
- You should not mutate the `state` received in your Reducer. Instead, you should always return a new copy of the state.
- To subscribe to store updates, use the `store.subscribe()` method.

