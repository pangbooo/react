import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from './components/Header.js';

const App = (props) => {
  return (
      <div>
        <Header />
        {renderRoutes(props.route.routes)}
      </div>
  )
}

export default App;
