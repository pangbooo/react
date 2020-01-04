import React from 'react';
import {Helmet} from 'react-helmet';

class TopList extends React.Component {
    render(){
        return (
            <div>
              <Helmet>
                <title>TopList</title>
              </Helmet>
              <div>TopList</div>
            </div>
          );
    }
}

export default TopList;