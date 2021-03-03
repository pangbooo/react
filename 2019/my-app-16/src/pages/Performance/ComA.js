import React, {memo} from 'react';

function ComA(){
    console.log('组件A渲染')
   return <div>我是组件A</div>
}

//子组件更新条件：
// 1. 父组件render， 子组件重新render了（需要优化）
// 2. 子组件自身 state，props，forceUpdate()

export default ComA;