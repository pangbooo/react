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
