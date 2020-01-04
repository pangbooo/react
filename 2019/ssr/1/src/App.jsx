import React from "react";
import {BrowserRouter as Router, 
        Switch,
        Redirect, 
        NavLink} from 'react-router-dom'
import {router, NestedRoute, StatusRoute} from './router';
import "./assets/app.css";

class Root extends React.Component {
    render() {
        return (
            <div>
                    <div className='title'>This is a react ssr demo</div>
                    <ul className='nav'>
                        <li><NavLink to='/bar'>Bar</NavLink></li>
                        <li><NavLink to='/bar123'>Bar123</NavLink></li>
                        <li><NavLink to='/baz'>Baz</NavLink></li>
                        <li><NavLink to='/foo'>Foo</NavLink></li>
                        <li><NavLink to='/top-list'>TopList</NavLink></li>
                        <li><NavLink to='/parent'>Parent</NavLink></li>
                    </ul>

                    <div className='view'>
                        <Switch>
                            {
                                router.map((route, i) => (
                                    <NestedRoute key={i} {...route}/>
                                ))
                            }
                            <Redirect from='/' to='bar' exact/>
                            <StatusRoute code={404}>
                                <div>
                                    <h1>Not Found</h1>
                                </div>
                            </StatusRoute>
                        </Switch>
                    </div>
                </div>
            
        );
    }
}

let App;
if(process.env.REACT_ENV == 'server'){
    App = Root;
}else{
    App = () => {
        return (
            <Router>
                <Root />
            </Router>
        )
        
    }
}


export default App;
