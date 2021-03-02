import React, {forwardRef, useRef, useImperativeHandle} from 'react'

const Child = forwardRef((props, ref) => {
    const ChildRef = useRef();
    
    useImperativeHandle(ref, () => ({
        getAlert(){
            console.log('getAlert from child')
        }
    }))

    return (<div ref={ChildRef}>Child</div>)
})

const Ref = () => {
    const ref = useRef();
    return(
        <div>
            <Child ref={ref}/>
            <button onClick={() => ref.current.getAlert()}>parent button</button>
        </div>
    )

}

// function FancyInput(props, ref) {
//     const inputRef = useRef();
//     useImperativeHandle(ref, () => ({
//       focus: () => {
//         inputRef.current.focus();
//       }
//     }));
//     return <input ref={inputRef} />;
// }
// FancyInput = forwardRef(FancyInput);

// function Ref(){
//     const ref = useRef();
//     return (
//         <div>
//         <FancyInput ref={ref}></FancyInput>
//         <button onClick={() => {ref.current.focus()}}>click</button>
//         </div>
//     )
// }

export default Ref;