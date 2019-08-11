import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider  } from "react-redux";
import { Layout } from "../components/Layout";

const store = createStore( window.REDUX_DATA );

const jsx = (
    <Provider>
        <BrowserRouter>
            <Layout/>
        </BrowserRouter>
    </Provider>
)
const app = document.getElementById('app');
ReactDOM.hydrate(jsx, app);