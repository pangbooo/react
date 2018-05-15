import React, { Component } from 'react'

export default (WrappedComponent,json) => {
  class NewComponent extends Component {
    constructor(){
      this.state = {
        data :[], //存储列表信息
        isLoadingMore : false,// 是否正在加载
        page : 1 //下一页页码
      }
    }
    // 可以做很多自定义逻辑
    render () {
      return <WrappedComponent />
    }
    componentDidMount(){
        // 获取首页数据
        this.loadFirstPageData()
    }
    loadFirstPageData(){
      const cityName = json.cityName
      const result = getListData(cityName,0);
      this.resultHandle(result)
    }
  }
  return NewComponent
}