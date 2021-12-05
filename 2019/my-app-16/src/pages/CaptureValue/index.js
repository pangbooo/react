import React, { useEffect, useRef, useState } from 'react';
import ProfilePageClass from '../../Components/ProfilePageClass';
import ProfilePageFunction from '../../Components/ProfilePageFunction';

class Demo1 extends React.Component {
    state = {
        user: 'a',
    }

    render() {
        return (
            <div>
                <h2>demo 1:</h2>
                <label>用户列表：</label>
                <select
                    value={this.state.user}
                    onChange={e => this.setState({ user: e.target.value })}
                >
                    <option value="a">a</option>
                    <option value="b">b</option>
                    <option value="c">c</option>
                </select>
                <section>
                    <p>class组件： 3s之后获取的已经是最新的state.user</p>
                    <ProfilePageClass user={this.state.user} />
                </section>

                <section>
                    <p>function组件： 3s之后获取的值是之前捕获的state.user</p>
                    <ProfilePageFunction user={this.state.user} />
                </section>
            </div>

        )

    }
}

function Demo2() {
    const[flag, setFlag] = useState(false);
    let timer;
    const handleClick = function() {
        setFlag(!flag);

        timer = setTimeout(() => {
            console.log(flag)
            setFlag(!flag);
        }, 2000);
    }

    return(
        <>
            <hr></hr>
            <h2>demo2: </h2>
            <p>需求： 点击false按钮，立刻变为true，2s后再变回false</p>
            <button onClick={handleClick}>{flag.toString()}</button>
        </>
    )
}

function Demo3() {
    const[flag, setFlag] = useState(false);
    let timer;

    const flagRef = useRef(flag);
    flagRef.current = flag;

    const handleClick = function() {
        setFlag(!flagRef.current);

        timer = setTimeout(() => {
            console.log(flagRef.current);
            setFlag(!flagRef.current);
        }, 2000);
    }
    
    return(
        <>
            <hr></hr>
            <h2>demo3: </h2>
            <p>需求： 点击false按钮，立刻变为true，2s后再变回false</p>
            <p>结论： 使用useRef可以获取最新的flag值。</p>
            <button onClick={handleClick}>{flag.toString()}</button>
        </>
    )
}

function CaptureValue() {
    return(
        <>
            <Demo1 />
            <Demo2 />
            <Demo3 />
        </>
    )
}

export default CaptureValue;