import React from 'react';
import { Route, Redirect } from "react-router-dom";

export function Status({ code, children }) {
    return (
      <Route
        render={({ staticContext }) => {
          if (staticContext) staticContext.status = code;  // 更改server context{}
          return children;
        }}
      />
    );
  }

  export function RedirectWithStatus({ from, to, status }) {
      console.log('from', from)
      console.log('to', to)
      console.log('status', status)
    return (
      <Route
        render={({ staticContext }) => {
          // there is no `staticContext` on the client, so
          // we need to guard against that here
          if (staticContext) staticContext.status = status;
          return <Redirect from={from} to={to} />;
        }}
      />
    );
  }
  