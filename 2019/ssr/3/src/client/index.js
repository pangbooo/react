import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Routes from '../Routes'
import {Provider} from 'react-redux'
import getStore from '../store'

const store = getStore();
const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    {
                        Routes.map( route => (<Route {...route}></Route>))
                    }
                </div>
            </BrowserRouter>
        </Provider>
        
    )
}

ReactDom.hydrate(<App />, document.getElementById('root'))
