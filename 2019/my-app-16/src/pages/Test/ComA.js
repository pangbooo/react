import React, {memo} from 'react';

const ComA = memo(function(){
    console.log('组件A渲染')
   return <div>我是组件A</div>
})

//子组件更新条件：
// 1. 父组件render， 子组件重新render了（需要优化）
// 2. 自身 state，props，forceUpdate()

export default ComA;