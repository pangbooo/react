# Hook
> Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

## Hook 概览
> Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。      
> React 内置了一些像 useState 这样的 Hook。你也可以创建你自己的 Hook 来复用不同组件之间的状态逻辑。

```javascript
import React, {useState} from 'react';

function Example() {
    // 声明一个 “count” 的state变量
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={()=> setCount(count + 1)}>
                click me
            </button>
        </div>
    )
}
```
- useState 就是一个 Hook
- 唯一的参数就是初始 state
- 它类似 class 组件的 this.setState，**但是它不会把新的 state 和旧的 state 进行合并。**

#### 声明多个 state 变量
```javascript
function ExampleWithManyStates() {
    const [age, setAge] = useState(42);
    const [fruit, setFruit] = useState('banana');
    const [todos, setTodos] = useState([{text: 'Learn Hooks'}])
}
```

#### Effect Hook
> - 你之前可能已经在 React 组件中执行过数据获取、订阅或者手动修改过 DOM。       
> - 我们统一把这些操作称为“副作用”，或者简称为“作用”。     
> - useEffect 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。它跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途，只不过被合并成了一个 API。           
> - 默认情况下，React 会在每次渲染后调用副作用函数 —— 包括第一次渲染的时候。

```javascript
import React, {useState, uesEffect} from 'react;

funuction Example() {
    const [count, setCount] = useState(0);

    // 相当于 componentDidMount 和 componentDidUpdate:
    useEffect(() => {
        document.title = `You click ${count} times`;
    })

    return(
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    )
}
```
#### Hook 使用规则
- 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。
- 只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。
- 还有一个地方可以调用 Hook —— 就是自定义的 Hook 中，我们稍后会学习到。

#### 自定义 Hook
> 组件之间重用一些状态逻辑
- 高阶组件
- render props
- 自定义hook

```javascript
import React, { useState, useEffect } from 'react';
//Hook
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}

```
使用自定义hook
```javascript
import React, { useState, useEffect } from 'react';

//use自定义Hook
function FriendStatus() {props} {
    const isOnline = useFriendStatus(props.friend.id);

    if(isOnline === null){
        return 'Loading...'
    }
    return isOnline ? 'Online' : 'Offline'
}
```

```javascript
function FriendListItem(props) {
    const isOnline = useFriendState(props.friend.id);

     return (
        <li style={{ color: isOnline ? 'green' : 'black' }}>
            {props.friend.name}
        </li>
    );
}
```
这两个组件的 state 是完全独立的。Hook 是一种复用状态逻辑的方式，它不复用 state 本身。__事实上 Hook 的每次调用都有一个完全独立的 state —— 因此你可以在单个组件中多次调用同一个自定义 Hook。__

#### 其他 Hook
useContext, useReducer...

### 使用 State Hook
#### useState
1. 调用useState方法时，定义state变量 （一般来说，在函数退出后变量就会”消失”，而 state 中的变量会被 React 保留。）
2. useState() 方法里面唯一的参数就是初始 state
3. useState()方法返回值为当前state以及更新state的函数

* React 是如何把对 Hook 的调用和组件联系起来的？
每个组建内部又一个记忆单元格列表，用来储存数据的Javascript对象

* 我应该使用单个还是多个 state 变量？
我们推荐把 state 切分成多个 state 变量，每个变量包含的不同值会在同时发生变化。而且利于函数组建的拆分。

### 使用 Effect Hook
> 如果你熟悉 React class 的生命周期函数，你可以把 useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。
#### 无需清除的 effect
1. 当 React 渲染组件时，会保存已使用的 effect，并在更新完 DOM 后执行它。这个过程在每次渲染时都会发生，包括首次渲染。
2. 每次我们重新渲染，都会生成新的 effect，替换掉之前的。某种意义上讲，effect 更像是渲染结果的一部分 —— 每个 effect “属于”一次特定的渲染。
3. useEffect调用的effct不会阻塞浏览器更新屏幕。大多effect不需要同步执行。


#### 需要清除的 effect
- 使用 Hook 的示例
```javascript
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}

```
- 这是 effect 可选的清除机制。每个 effect 都可以返回一个清除函数。如此可以将添加和移除订阅的逻辑放在一起。它们都属于 effect 的一部分。
- React 会在组件卸载的时候执行清除操作。

#### 提示: 通过跳过 Effect 进行性能优化
在某些情况下，每次渲染后都执行清理或者执行 effect 可能会导致性能问题。在 class 组件中，我们可以通过在 componentDidUpdate 中添加对 prevProps 或 prevState 的比较逻辑解决：
```
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```
Use Hook
```javascript
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```
- 如果你要使用此优化方式，请确保数组中包含了所有外部作用域中会随时间变化并且在 effect 中使用的变量，否则你的代码会引用到先前渲染中的旧变量。
- 如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行。  

### Hook 规则 
- 只在最顶层使用 Hook (不要在循环，条件或嵌套函数中调用 Hook)
- 只在 React 函数中调用 Hook

* 那么 React 怎么知道哪个 state 对应哪个 useState？<br />
答案是 React 靠的是 Hook 调用的顺序。


### 自定义 Hook


### ⚠️使用时于class的不同点
1. Hook 的每次调用都有一个完全独立的 state —— 因此你可以在单个组件中多次调用同一个自定义 Hook。
2. set函数，更新 state 变量总是替换它而不是合并它。