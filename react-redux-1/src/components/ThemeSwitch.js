import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class ThemeSwitch extends Component{
	static propTypes = {
		themeColor : PropTypes.string,
		onSwitchColor : PropTypes.func
	}
	handleSwtichColor(color){
		if (this.props.onSwitchColor) {
			this.props.onSwitchColor(color)
		}
	}

	render(){
		return(
			<div>
				<button
					style={{color:this.props.themeColor}}
					onClick={this.handleSwtichColor.bind(this,'red')}>red</button>
				<button
					style={{color:this.props.themeColor}}
					onClick={this.handleSwtichColor.bind(this,'blue')}>blue</button>
			</div>

		)
	}
}