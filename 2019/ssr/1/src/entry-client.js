import React from "react";
import ReactDOM from "react-dom";
import Root from "./App";

console.log('Root....', Root)

ReactDOM.hydrate(<Root />, document.getElementById("app"));
