import React from "react";
import { StaticRouter } from 'react-router-dom';
import Root from "./App";

/*
    context: object => 
        A plain JavaScript object. During the render, components can add properties to the object to store information about the render.
        When a <Route> matches, it will pass the context object to the component it renders as the 【staticContext】 prop.
        After the render, these properties can be used to to configure the server’s response.
*/

// location: object => A location object shaped like { pathname, search, hash, state }
const createApp = (context, url) => {
    const App = () => {
        return (
            <StaticRouter context={context} location={url}>
                <Root />
            </StaticRouter>
        )
    }
    return <App />;
}
module.exports = {
    createApp
};