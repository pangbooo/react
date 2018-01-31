import React, { Component } from 'react'
import PropTypes from 'prop-types'

export const connect = (mapStateToProps) => (WrappedComponent) => {
    class Connect extends Component {
        static contextTypes = {
            store: PropTypes.object
        }
         constructor(){
             super();
             this.state = { allProps: '' }
         }

         componentWillMount(){
             const {store} = this.context;
             this._updateThemeColor();
             store.subscribe(()=>this._updateThemeColor())
         }
         _updateThemeColor(){
             //const {store} = this.context;
             //const state = store.getState();
             //this.setState({ themeColor: state.themeColor })
             const { store } = this.context
             console.log(this.props);
             let stateProps = mapStateToProps(store.getState(),this.props);
             this.setState({
                 allProps:{
                     ...stateProps,
                     ...this.props
                 }
             })
         }

        render () {

            // {...stateProps} 意思是把这个对象里面的属性全部通过 `props` 方式传递进去
            return <WrappedComponent {...this.state.allProps} />
        }
    }

    return Connect //Connect作用：相当于从context 取想要的参数到放到子组件
}