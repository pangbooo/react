import React, { useState, useEffect, useCallback, useRef } from 'react';

function Demo1() {
    console.log('counter render');
    const [count, addCount] = useState(0);
    return (
        <>
            <div>
                <div className="counter">
                    <div className="counter-num">{count}</div>
                    <button onClick={() => { addCount(count + 1) }}>add</button>
                </div>
            </div>
        </>
    )
}

const Hello = ({ name }) => {
    console.log("hello render");
    return <div>hello {name}</div>;
};

const HelloWithMemo = React.memo(({name}) => {
    console.log('hello render');
    return<div>hello {name}</div>
})

const HelloWithMemoAndClickHandler = React.memo(({name, onClick}) => {
    console.log('hello render');
    return<div onClick={onClick}>hello {name}</div>
})

const Demo2 = () => {
    console.log("app render");
    const [count, addCount] = useState(0);
    return (
        <div>
            <Hello name="react" />
            <div className="counter-num">{count}</div>
            <button
                onClick={() => {
                    addCount(count + 1);
                }}
            >
                add
            </button>
        </div>
    );
};

const Demo3 = () => {
    console.log("app render");
    return (
      <div>
        <Hello name="react" />
        <Counter />
      </div>
    );
  };

const Demo4 = ({children}) => {
    console.log('app render');
    const [count, addCount] = useState(0);
    return(
        <div>
            {children}
            <div>{count}</div>
            <button
                onClick={() => {
                addCount(count + 1);
                }}
            >
                add
            </button>
        </div>
    )
}

const Demo5 = () => {
    console.log("app render");
    const [count, addCount] = useState(0);
    return (
        <div>
            <HelloWithMemo name="react" />
            <div className="counter-num">{count}</div>
            <button
                onClick={() => {
                    addCount(count + 1);
                }}
            >
                add
            </button>
        </div>
    );
};

const Demo6 = () => {
    console.log("app render");
    const [count, addCount] = useState(0);
    // const clickHandler = () => {
    //     console.log("hello click");
    // };
    const clickHandler = useCallback(() => {
        console.log("hello click", count);
    },[]);

    return (
        <div>
            <HelloWithMemoAndClickHandler name="react" onClick={clickHandler}/>
            <div className="counter-num">{count}</div>
            <button
                onClick={() => {
                    addCount(count + 1);
                }}
            >
                add
            </button>
        </div>
    );
};

const Demo7 = () => {
    console.log('counter render');
    const [count, addCount] = useState(0);

    // 1. 创建一个countRef
    const countRef = useRef(count);

    // 2. 依赖改成countRef
    // 浅比较countRef时， 将不会引起callback函数更新
    // callback 函数中又可以涂到countRef.current 值， 即 count 的最新值
    const clickHandler = useCallback(() => {
        console.log('count: ', countRef.current);
    }, [countRef]);

    // 3. 当 count 更新时， 更新countRef的值
    useEffect(() => {
        countRef.current = count;
    }, [count]);

    return (
        <div className="counter">
            <HelloWithMemoAndClickHandler name="react" onClick={clickHandler} />
            <div className="counter-num">{count}</div>
            <button
                onClick={() => {
                    addCount(count + 1);
                }}
            >
                add
            </button>
        </div>
    );
}

function Counter() {
    console.log("Counter render");
    const [count, addCount] = useState(0);

    return (
        <div>
            <div className="counter-num">{count}</div>
            <button
                onClick={() => {
                    addCount(count + 1);
                }}
            >
                add
            </button>
        </div>
    )
}

function Optimize() {
    return (
        <div className='optimize'>

            <h2>demo1: </h2>
            <p>re-render 有问题的写法，每次点击都render打印</p>
            <Demo1 />
            <hr />

            <h2>demo2:</h2>
            <p>父组件更新引起子组件的 re-render</p>
            <Demo2 />
            <hr />

            <h2>优化 demo:</h2>
            <p>将更新部分抽离成单独组件</p>
            <Demo3 />
            <hr />

            <h2>优化 demo2:</h2>
            <p>将不需要 re-render 的部分抽离，以插槽形式渲染（children）</p>
            <Demo4>
                <Hello name='react'/>
            </Demo4>
            <hr />

            <h2>优化 demo3: React.memo</h2>
            <p> 只针对props变化时，进行潜比较。</p>
            <p>存在问题：如果props中有事件处理函数，那么每次render都会创建一个新的函数，props每次都变化</p>
            <Demo5 />
            <hr />

            <h2>优化 demo4: useCallback </h2>
            <p>useCallback 的原理主要是在挂载的时候，将定义的 callback 函数及 deps 依赖挂载该 hook 的 memoizedState，当更新时，将依赖进行对比，如果依赖没变，则直接返回老的 callback 函数，否则则更新新的 callback 函数及依赖</p>
            <p>存在问题：为了获取每次的count， 在useCallback deps中加入 [count], 又会每次都re-render Hello</p>
            <Demo6 />
            <hr />

            <h2>优化 demo5: useRef & useEffect </h2>
            <Demo7 />
            <hr />

            <h2>总结：</h2>
            <ol>
                <li>useState、useRef 使用的是 <span className='code'>Object.is</span> 方法比较值的更新</li>
                <li>将组件关系改完非父子组件</li>
                <li>使用React.memo (只对props浅比较)</li>
                <li>使用useCallback将定义的函数缓存</li>
                <li>useRef & useEffect</li>
            </ol>
        </div>
    )
}

export default Optimize;