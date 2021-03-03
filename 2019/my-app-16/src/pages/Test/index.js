import React, {memo,useState,useMemo} from 'react';
import ComA from './ComA';
import ComB from './ComB';
import ComC from './ComC';

const ComponentInput = memo(function({notifyFatherChange }){
    const [inputValue, setInputValue ] = useState('');
})

class Test extends React.Component{
    constructor(props){
        super(props)
        this.state={
            inputValue:''
        }
    }
    handerChange(e){
        this.setState({ inputValue:e.target.value  })
    }
    
    render(){
        const { inputValue } = this.state
        return <div>
            { /*  我们增加三个子组件 */ }
            <ComA />
            <ComB />
            <ComC />
            <div className="box" >
                <input  value={inputValue}  onChange={ (e)=> this.handerChange(e) } />
            </div>
            {/* 我们首先来一个列表循环 */}
            {
                new Array(10).fill(0).map((item,index)=>{
                    console.log('列表循环了' )
                    return <div key={index} >{item}</div>
                })
            }
            {
              /* 这里可能是更复杂的结构 */
              /* ------------------ */
            }
        </div>
    }
}

export default Test