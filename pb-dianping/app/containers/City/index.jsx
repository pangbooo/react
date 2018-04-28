import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'
import * as userinfoActionsFormOtherFile from '../../actions/userinfo.js'
import localStore from '../../util/localStore'
import {CITYNAME} from '../../config/localStoreKey.js'
import Header from '../../components/Header'
import CurrentCity from '../../components/CurrentCity'
import CityList from '../../components/CityList'

class City extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
                <Header title="选择城市"/>
                <CurrentCity cityName={this.props.userinfo.cityName}/>
                <CityList changeFn={this.changeCity.bind(this)}/>
            </div>
        )
    }
    changeCity(newCity){
        //修改redux
        let userinfo = this.props.userinfo;
        userinfo.cityName = newCity
        this.props.userinfoActions.update(userinfo)

        //修改localstroge
        localStore.setItem(CITYNAME,newCity)

        //跳转首页
        hashHistory.push('/')
    }
}

function mapStateToProps(state) {
    return {
        userinfo : state.userinfo
    }
}
function mapDispatchToProps(dispatch){
    return {
        userinfoActions : bindActionCreators(userinfoActionsFormOtherFile,dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps)
(City)
