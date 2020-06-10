import React from "react";
import FancyButton from '../../components/FancyButton';

class RefForward extends React.Component {
    constructor(props){
        super(props);
        this.ref = React.createRef()
    }

    render(){
        return (
            <FancyButton ref={this.ref}>Click me</FancyButton>
        )
    }
}

export default RefForward

/*

1）我们通过调用 React.createRef 创建了一个 React ref 并将其赋值给 ref 变量。
2）我们通过指定 ref 为 JSX 属性，将其向下传递给 <FancyButton ref={ref}>。
3）React 传递 ref 给 forwardRef 内函数 (props, ref) => ...，作为其第二个参数。
4）我们向下转发该 ref 参数到 <button ref={ref}>，将其指定为 JSX 属性。
5）当 ref 挂载完成，ref.current 将指向 <button> DOM 节点。

*/



