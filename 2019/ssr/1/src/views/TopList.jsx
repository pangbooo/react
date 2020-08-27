import React from 'react';
import {Helmet} from 'react-helmet';
import {fetchTopList, setClientLoad} from '../redux/action'

class TopList extends React.Component {

  static asyncData(store, params) {
    console.log(store, params)
    return store.dispatch(fetchTopList());
  }

  componentDidMount(){
    // 判断是否需要加载数据
    if(this.props.clientShouldLoad === true){
      this.props.dispatch(fetchTopList())
    }else{
       // 客户端执行后，将客户端是否加载数据设置为true
      this.props.dispatch(setClientLoad(true))
    }
  }

    render(){
      // console.log('props', JSON.stringify(this.props,null, 2))
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
                              <p>
                                <img src={item.picUrl} />
                                {item.topTitle}
                                {item.songList.map((song, index) => <span key={index}>{song.songname}</span>)}
                              </p>
                          </li>;
                    })
                }
              </ul>
            </div>
      );
    }
}

export default TopList;