import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import localStore from '../util/localStore'
import {CITYNAME} from '../config/localStoreKey.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userinfoActionsFormOtherFile from '../actions/userinfo'

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            initDone : false
        }
    }
    render() {
        return (
            <div>
            {
                this.state.initDone 
                ? this.props.children
                : <div>加载中...</div>
               
            }
            </div>
        )
    }
    componentDidMount(){
        let cityName = localStore.getItem(CITYNAME)
        if (cityName == null) {
            cityName = '北京'
        }
        //将城市信息存到Redux中
        this.props.userinfoActions.update({
            cityName
        })

        this.setState({
            initDone : true
        })
    }
}
function mapStateToProps(state){
    return{}
}

function mapDispatchToProps(dispatch){
    return {
        userinfoActions : bindActionCreators(userinfoActionsFormOtherFile,dispatch)
    }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
