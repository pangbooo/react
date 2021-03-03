import React from 'react';

class ComB extends React.PureComponent{
    constructor(props){
        super(props)
    }
    // shouldComponentUpdate(){
    //     console.log('ComB shouldComponentUpdate...')
    // }
    componentWillReceiveProps(){
        console.log('componentWillReceiveProps执行')
        /* 可能做一些骚操作 wu lian */
    }
    render(){
        console.log('组件B渲染')
        return <div>
            我是组件B
        </div>
    }
}

export default ComB;
