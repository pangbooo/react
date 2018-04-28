var app = require('koa')();
var router = require('koa-router')();

/*router.get('/', function *(next) {
    this.body = 'hello koa !'
});

router.get('/api', function *(next) {
    this.body = 'test data'
});
router.get('/api/1', function *(next) {
    this.body = 'test data 1'
});
router.get('/api/2', function *(next) {
    this.body = 'test data 2'
});*/

// 首页 —— 广告（超值特惠）
var homeAdData = require('./home/ad.js')
router.get('/api/homead', function *(next) {
    this.body = homeAdData
});
var homeListData =  require('./home/list.js')
router.get('/api/homelist/:city/:page',function*(next){
	// 参数
    const params = this.params
    const paramsCity = params.city
    const paramsPage = params.page

    console.log('当前城市：' + paramsCity)
    console.log('当前页数：' + paramsPage)

    this.body = homeListData
})

app.use(router.routes())
   .use(router.allowedMethods());

app.listen(3000);
