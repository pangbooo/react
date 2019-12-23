import React from "react";
import { StaticRouter } from 'react-router-dom';
import Root from "./App";

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