import {connect} from 'react-redux'
import Header from '../components/Header'

const mapStateTpProps = (state) => {
	return {
		themeColor : state.themeColor
	}
}
export default connect(mapStateTpProps)(Header)