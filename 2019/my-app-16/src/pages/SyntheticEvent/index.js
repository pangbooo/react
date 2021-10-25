/* eslint-disable no-restricted-globals */
import React, {useEffect, useRef} from 'react';

export default function SyntheticEvent() {
  const parentRef = useRef(null)
  const childRef = useRef(null)

  function clickDOMWrapper() {
      console.log('dom parent event')
  }

  function clickDOMButton(e) {
    console.log('dom child event')
  }

    function clickParent(){
        console.log('react parent event')
    }
    function clickChind(e){
        e.stopPropagation();
        console.log('react child event')
    }

    useEffect(() => {
        parentRef.current.addEventListener('click', clickDOMWrapper, false)
        childRef.current.addEventListener('click', clickDOMButton, false)
    }, [])

    return (
        <div ref={parentRef} onClick={clickParent} style={{border: '1px solid'}}>
            <div ref={childRef} onClick={clickChind} style={{margin: '10px', border: '1px solid red'}}>test</div>
        </div>
    )
}