import React from "react";
import { Fragment } from 'react';
import FancyButton from '../../components/FancyButton';
import LogProps from '../../components/HOC/logProps';
import ChildButton from '../../components/ChildButton';

const HOCFancyButton = LogProps(FancyButton);

class RefForward extends React.Component {
    constructor(props){
        super(props);
        this.ref = React.createRef();
        this.hocRef = React.createRef();
        this.child = React.createRef();
    }

    handleClick(){
        console.log('this ref is button', this.ref.current);
    }

    handleClickChild(){
        console.log(this.child.current)
        this.child.current.getAlert();
    }

    render(){
        return (
            <Fragment>
                <div>
                    <h5>parent component call child component's function</h5>
                    <ChildButton ref={this.child}></ChildButton>
                    <button onClick={this.handleClickChild.bind(this)}>parent button</button>
                </div>
                <div>
                    <h5> basic RefForward</h5>
                    <FancyButton ref={this.ref} handleClick={this.handleClick.bind(this)}>Click me</FancyButton>
                </div>

                <div>
                    <h5> HOC RefForward</h5>
                    <HOCFancyButton ref={this.hocRef} handleClick={this.handleClick.bind(this)}>Click me too</HOCFancyButton>
                </div>
            </Fragment>
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



