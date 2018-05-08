import React from 'react'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ListComponent from '../../../components/List'
import LoadMore from '../../../components/LoadMore'
import { getListData } from '../../../fetch/search/search'

import './style.less'

const initialState = {
	data :[], //存储列表信息
	hasMore : false, //记录当前状态下，是否有更多的数据可供加载
	isLoadingMore : false,// 是否正在加载
	page : 1 //下一页页码
}

class SearchList extends React.Component {
	constructor(props, context){
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = initialState
	}

	render(){
		return(
			<div>
				 <h2 className="home-list-title">搜索结果</h2>
				 {
				 	this.state.data.length
				 	 ? <ListComponent data={this.state.data}/> 
				 	 : <div>加载中...</div>
				 }
				 {
				 	this.state.hasMore 
				 	? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreDate.bind(this)}/>
				 	: ''
				 }
				
			</div> 
		)
	}
	componentDidMount(){
		// 获取首页数据
        this.loadFirstPageData()
	}
	componentDidUpdate(prevProps, prevState){
		const keyword = this.props.keyword;
		const type = this.props.type;

		if (keyword === prevProps.keyword &&  type === prevProps.type) {
			return
		}

		//重置state
		this.setState(initialState)

		//重新加载数据
		this.loadFirstPageData()

	}

	loadFirstPageData(){
		const cityName = this.props.userinfo.cityName
		const category = this.props.category
		const keyword = this.props.keyword
		const result = getListData(0,cityName,category,keyword);
		this.resultHandle(result)
	}
	//加载更多数据
	loadMoreDate(){
		this.setState({
			isLoadingMore : true
		})
		const cityName = this.props.userinfo.cityName;
		const page = this.state.page;
		const category = this.props.category
		const keyword = this.props.keyword
		const result = getListData(page,cityName,category,keyword);
		this.resultHandle(result);
		this.setState({
			isLoadingMore : false,
			page : page+1
		})
	}
	// 处理数据
    resultHandle(result) {
    	result.then(res => {
    		return res.json()
    	}).then(json =>{
			const data = json.data;
			const hasMore = json.hasMore;
			this.setState({
				data : this.state.data.concat(data),
				hasMore
			})
    	})
    }
}
function mapStateTpProps(state) {
	return {
		userinfo : state.userinfo
	}
}
function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(
	mapStateTpProps,
	mapDispatchToProps
)(SearchList)