import React from 'react';
import {Helmet} from 'react-helmet';
import {fetchTopList} from '../redux/action'

class TopList extends React.Component {

  static asyncData(store) {
    return store.dispatch(fetchTopList());
  }

    render(){
      const { topList } = this.props;
        return (
            <div>
              <Helmet>
                <title>TopList</title>
              </Helmet>
              <ul className="list-wrapper">
                {
                    topList.map(item => {
                    return <li className="list-item" key={item.id}>
                              {item.title}
                          </li>;
                    })
                }
              </ul>
            </div>
      );
    }
}

export default TopList;