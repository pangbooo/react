import React from "react";
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from './redux/store';
import Root from "./App";
import { router } from './router'

/*
    context: object => 
        A plain JavaScript object. During the render, components can add properties to the object to store information about the render.
        When a <Route> matches, it will pass the context object to the component it renders as the 【staticContext】 prop.
        After the render, these properties can be used to to configure the server’s response.
*/

// location: object => A location object shaped like { pathname, search, hash, state }
const createApp = (context, url, store) => {
    const App = () => {
        return (
            <Provider store={store}>
                <StaticRouter context={context} location={url}>
                    <Root setHead={(head) => App.head = head}/>
                </StaticRouter>
            </Provider>
        )
    }
    return <App />;
}
module.exports = {
    createApp,
    createStore,
    router
};