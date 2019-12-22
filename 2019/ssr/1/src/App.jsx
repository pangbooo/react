import React from "react";
import {BrowerRouter as Router, Route, Switch,Redirect, NavLink} from 'react-router-dom'
import {router, NestedRoute} from './router';
import "./assets/app.css";
let App;

if(process.env.REACT_ENV == 'server'){
    App = Root;
}else{
    App = () => {
        <Router>
            <Root />
        </Router>
    }
}

class Root extends React.Component {
    render() {
        return (
            <div>
                    <div className='title'>This is a react ssr demo</div>
                    <ul className='nav'>
                        <li><NavLink to='/bar'>Bar</NavLink></li>
                        <li><NavLink to='/baz'></NavLink></li>
                        <li><NavLink to='/foo'>Foo</NavLink></li>
                        <li><NavLink to='/top-list'>TopList</NavLink></li>
                    </ul>

                    <div className='view'>
                        <Switch>
                            {
                                router.map((route, i) => (
                                    <NestedRoute key={i} {...route}/>
                                ))
                            }
                            <Redirect from='/' to='bar' />
                        </Switch>
                    </div>
                </div>
            
        );
    }
}



export default App;
