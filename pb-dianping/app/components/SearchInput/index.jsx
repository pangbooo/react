import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'

class SearchInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            value : ''
        }
    }
    render() {
        return (
            <input  type='text'
                    className="search-input" 
                    placeholder="请输入关键字"
                    value={this.state.value}
                    onChange = {this.changeHandle.bind(this)}
                    onKeyUp={this.keyUpHandle.bind(this)}/>
        )
    }
    componentDidMount(){
        this.setState({
            value : this.props.value || ''
        })
    }
    changeHandle(e){
        this.setState({
            value : e.target.value
        })
    }
    keyUpHandle(e){
        if (e.keyCode !== 13) {
            return
        }
        if (this.props.enterHandle) {
            this.props.enterHandle(this.state.value)
        }
    }
    
}

module.exports = SearchInput