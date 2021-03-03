import React from 'react';

class ComC extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        console.log('组件c渲染')
        return <div>
              我是组件c
             {
                new Array(10).fill(0).map((item,index)=>{
                    console.log('组件C列表循环了' )
                    return <div key={index} >{item}</div>
                })
            }
        </div>
    }
}


export default ComC;
