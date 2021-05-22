import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from './components/Header/index.js';
import {actions} from './components/Header/store/index.js'

const App = (props) => {
  return (
      <div>
        <Header />
        {renderRoutes(props.route.routes)}
      </div>
  )
}

App.loadData = (store) => {
  store.dispatch(actions.getHeaderInfo())
}

export default App;
