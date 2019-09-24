# GUIDES
## Basic Components
### 1. Routers 
创建history 对象
- #### `<BrowserRouter>`
使用HTML5历史记录API（pushState，replaceState和popstate事件）的<Router>，以使您的UI与URL保持同步。
- #### `<HashRouter>`

### 2. Route Matching
- #### `<Route>`
- #### `<Switch> `
用于包裹Route， 只渲染匹配到的第一个Route, 常用于404组件
```javascript
<Switch>
    <Route path='/' component={Index} exact></Route>
    <Route path='/about' component={About}></Route>
    <Route path='/topics' component={Topics}></Route>
    {/* when none of the above match, <NoMatch> will be rendered */}
    <Route component={NoMatch}></Route>
</Switch>
```
### 3. Route Rendering Props
- ####  component
- ####  render
仅在必须将范围内变量传递给要渲染的组件时才使用。
```javascript
const Home = () => <div>Home</div>;
const App = () => {
  const someVariable = true;

  return (
    <Switch>
      {/* these are good */}
      <Route exact path="/" component={Home} />
      <Route
        path="/about"
        render={props => <About {...props} extra={someVariable} />}
      />
      {/* do not do this */}
      <Route
        path="/contact"
        component={props => <Contact {...props} extra={someVariable} />}
      />
    </Switch>
  );
};
```
- #### children

### 4. Navigation
- ####  `<Link>`
```javascript
<Link to="/">Home</Link>
// <a href='/'>Home</a>
```
- ####   `<NavLink>`
<NavLink>是一种特殊类型的<Link>，当它与prop匹配当前位置时，它可以将自己设置为“active”。
```javascript
// location = { pathname: '/react' }
<NavLink to="/react" activeClassName="hurray">
  React
</NavLink>
// <a href='/react' className='hurray'>React</a>
```
## Server Rendering (uncompleted)
### 1. ` <StaticRouter>`
> 在服务器上呈现有点不同，因为它都是无状态的。 基本思想是我们将应用程序包装在无状态<StaticRouter>而不是<BrowserRouter>中。 我们从服务器传入请求的URL，以便路由可以匹配，然后我们将讨论上下文支持。
``` javascript
//我们使用上下文prop来找出渲染的结果。如果我们找到了context.url，那么我们知道应用程序被重定向
const context = {};
const markup = ReactDOMServer.renderToString(
  <StaticRouter location={req.url} context={context}>
    <App />
  </StaticRouter>
);

if (context.url) {
  // Somewhere a `<Redirect>` was rendered
  redirect(301, context.url);
} else {
  // we're good, send the response
}

```
https://alligator.io/react/react-router-ssr/

## Code Splitting
### 1.