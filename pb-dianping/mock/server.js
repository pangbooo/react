var app = require('koa')();
var router = require('koa-router')();

// 首页 —— 广告（超值特惠）
var homeAdData = require('./home/ad.js')
router.get('/api/homead', function *(next) {
    this.body = homeAdData
});
var homeListData =  require('./home/list.js')
router.get('/api/homelist/:city/:page',function *(next){
	// 参数
    const params = this.params
    const paramsCity = params.city
    const paramsPage = params.page

    console.log('当前城市：' + paramsCity)
    console.log('当前页数：' + paramsPage)

    this.body = homeListData
})
//搜索页列表(三个参数)
var searchRes = require('./search/list.js')
router.get('/api/search/:page/:cityName/:category/:keyword', function *(next){
    console.log('搜索页列表：')
    console.log('page',this.params.page)
    console.log('cityName',this.params.cityName)
    console.log('category',this.params.category)
    console.log('keyword',this.params.keyword);
    this.body = searchRes
})
//搜索页列表(两个参数)
var searchRes = require('./search/list.js')
router.get('/api/search/:page/:cityName/:category', function *(next){
    console.log('搜索页列表：')
    console.log('page',this.params.page)
    console.log('cityName',this.params.cityName)
    console.log('category',this.params.category)
    this.body = searchRes
})

//详情页信息
var detailInfo = require('./detail/info.js')
router.get('/api/detail/info/:id',function *(next){
    const id = this.params.id
    this.body = detailInfo
})

app.use(router.routes())
   .use(router.allowedMethods());

app.listen(3000);
