import React, { Component } from 'react'
import PropTypes from 'prop-types'

export const connect = (mapStateToProps,mapDispatchToProps) => (WrappedComponent) => {
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
             let stateProps = mapStateToProps  ?
                            mapStateToProps(store.getState(),this.props)
                            : {}//防止mapStateToProps 没有传入
             let dispatchProps = mapDispatchToProps ?
                                mapDispatchToProps(store.dispatch,this.props)
                                :{}//防止mapDispatchToProps没有传入

             this.setState({
                 allProps:{
                     ...stateProps,
                     ...dispatchProps,
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

//容器组件，将外界传给他的props.store放到context
export class Provider extends Component{
    static PropTypes = {
        store : PropTypes.object,
        children: PropTypes.any
    }
    static childContextTypes ={
        store:PropTypes.object
    }

    getChildContext(){
        return {
            store:this.props.store
        }
    }
    render(){
        return(
            <div>{this.props.children}</div>
            )
    }
}