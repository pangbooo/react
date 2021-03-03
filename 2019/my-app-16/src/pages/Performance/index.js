import React, {memo,useState,useMemo} from 'react';
import ComA from './ComA';
import ComB from './ComB';
import ComC from './ComC';

const ComponentInput = memo(function( {notifyFatherChange} ){
    console.log('ComponentInput change..')
    const [inputValue, setInputValue ] = useState('');
    const handerChange = useMemo(()=> (e) => {
        setInputValue(e.target.value);
        notifyFatherChange && notifyFatherChange(e.target.value)
    },[]);
    return <input value={inputValue} onChange={handerChange}/>
})

class Performance extends React.Component{
    constructor(props){
        super(props);
        this.formData = {}
    }
    handerChange(e){
        this.setState({ inputValue:e.target.value  })
    }
    
    render(){
        return <div>
            { /*  我们增加三个子组件 */ }
            <ComA />
            <ComB />
            <ComC />
            <div className="box" >
                <ComponentInput notifyFatherChange={(value) => {this.formData.inputValue = value}}/>
                <button onClick={()=> console.log(this.formData)} >打印数据</button>
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

export default Performance