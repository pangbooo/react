// require('babel-core/register')()

//官方推荐写法（因为babel-register已经独立成了一个模块）
require('babel-register') 
require('babel-polyfill') 
require('./server')

/*
*
*1.babel-register
*引入babel-register之后所有require并以.es6, .es, .jsx 和 .js为后缀的模块都会经过babel的转译。
*
*2.babel-polyfill
*polyfill在代码中的作用主要是用已经存在的语法和api实现一些浏览器还没有实现的ap，对浏览器的一些缺陷做一些修补

*/