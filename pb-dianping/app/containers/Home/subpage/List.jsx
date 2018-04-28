import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getListData } from '../../../fetch/home/home'
import ListComponent from '../../../components/List'
import LoadMore from '../../../components/LoadMore'
import './style.less'

class List extends React.Component {
	constructor(props, context){
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			data :[], //存储列表信息
			hasMore : false, //记录当前状态下，是否有更多的数据可供加载
			isLoadingMore : false,// 是否正在加载
			page : 1 //下一页页码

		}
	}

	render(){
		return(
			<div>
				 <h2 className="home-list-title">猜你喜欢</h2>
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
	loadFirstPageData(){
		const cityName = this.props.cityName
		const result = getListData(cityName,0);
		this.resultHandle(result)
	}
	//加载更多数据
	loadMoreDate(){
		this.setState({
			isLoadingMore : true
		})
		const cityName = this.props.cityName;
		const page = this.state.page;
		const result = getListData(cityName,page);
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

export default List