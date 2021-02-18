import React, {useState, useEffect} from 'react';

function Home() {
  const [count, setCount] = useState(0);

  //每次渲染后调用useEffect函数（包活第一次渲染）
  useEffect(() => {
    console.log('useEffect 1...')
    document.title = `you click ${count} times`;
  });


  //可以定义多个副作用
  useEffect(() => {
    console.log('useEffect 2...')
  })

  return(
    <div>
      <p>You clicked {count} times</p>
      <button onClick={()=> setCount(count + 1)}>click me</button>
    </div>
  )
}

function ExampleWithManyStates() {
  const [age, setAge] = useState(12);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{text: 'learn hooks'}])
}

//清除副作用
// function FriendStatus(props) {
//     const [inOnline, setInOnline] = useState(null);

//     function handleStatusChange(status){
//       setInOnline(status.isOnline)
//     }

//     useEffect(() => {
//       CharAPI.subscribeToFriendStatus(props.friends.id, handleStatusChange);

//       //清除副作用
//       return () => {
//         CharAPI.unsubscribeToFriendStatus(props.friends.id, handleStatusChange);
//       }
//     })

//     if(inOnline === null){
//       return 'Loading...'
//     }

//     return isOnline ? "Online" : 'Offline';

// }

export default Home;