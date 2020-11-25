class CountDown extends React.Component {
/*
 * static propTypes = { children: React.PropTypes.func.isRequired, startCount:
 * React.PropTypes.number.isRequired };
 */

 constructor() {
  super(...arguments);
  this.state = {count: this.props.startCount};
 }
 componentDidMount() {
  this.intervalHandle = setInterval(() => {
   const newCount = this.state.count - 1;
   if (newCount >= 0) {
    this.setState({count: newCount});
   }else {
    window.clearInterval(this.intervalHandle);
   }
  }, 1000);
 }
 componentWillUnmount() {
  if (this.intervalHandle) {
   window.clearInterval(this.intervalHandle);
  }
 }
 render() {
  return this.props.children(this.state.count);
 }
 
}

//window.CountDown = CountDown;
/* 
 * 
 * 
 * ——————————————————————————————————————————————————————————————————————
 * 行内样式：<span style={{marginRight: 30}}>用户类型:</span>
 * ————————————————————————————————————————————————————————————————————
 * 
 *由
 *  static renderingRegister() {
    ReactDOM.render(
      <Register />
      , 
      JSXRegistry.selectAppDom()
    );  
  }
  和  static renderingLogin() {
    ReactDOM.render(
      <Login />
      , 
      JSXRegistry.selectAppDom()
    );  
  }
 *导致下列错误：
 *
 *react-dom.development.js:82 Warning: Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of Register.
    in Register (created by Context.Consumer)
    in e
    in e
    in t (created by t)
    in t
    in Unknown
 *
 *——————————————————————————————————————————————————
 *
 *   static renderingSimpleRegister() {
    return (<div>
        <NavBar>测测直聘</NavBar>
        <Logo/>
        <WingBlank>
        <List>
        <InputItem
        placeholder='输入用户名'
        onChange={val => this.handleChange('username', val)}
        >
                    用户名:
        </InputItem>
        <WhiteSpace/>
        <InputItem
        type='password'
        placeholder='输入密码'
        onChange={val => this.handleChange('password', val)}
        >
                    密&nbsp;&nbsp;&nbsp;码:
        </InputItem>
        <WhiteSpace/>
        <InputItem
        type='password'
        placeholder='输入确认密码'
        onChange={val => this.handleChange('password2', val)}
        >
                    确认密码:
        </InputItem>
        <WhiteSpace/>
        <List.Item>
        <span style={{marginRight: 30}}>用户类型:</span>
        <Radio checked={this.state.type==='dashen'}
        onClick={() => {this.handleChange('type', 'dashen')}}>大神</Radio>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Radio checked={this.state.type==='laoban'}
        onClick={() => {this.handleChange('type', 'laoban')}}>老板</Radio>
        </List.Item>
        <WhiteSpace/>
        <Button type='primary' onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>
        <WhiteSpace/>
        <Button onClick={this.toLogin}>已经有账号</Button>
        </List>
        </WingBlank>
    </div>);
  }
 * 
 * ————————————————————————————————————————————————————————————————————————————
 * 
 * 
 * alert(self);有时要用self，而无法用this，它们俩都表示全局的window实例。
 *  ————————————————————————————————————————————————————————————————————————————
 * render() {
 *   return this.props.children(this.state.count);传子女函数过来。
 * }
 *  ————————————————————————————————————————————————————————————————————————————
 * 
 * <button onClick={() => this.setState({ liked: true })}> 喜欢 </button>
 * <CountDown startCount={10}> { (count)=> <div>{count}</div> }</CountDown>
 *  ————————————————————————————————————————————————————————————————————————————
 * 
 * 由
 * <script type="text/babel" src="scripts/re/za/container/countDown.js" ></script>
 * 产生错误
 * Access to XMLHttpRequest at 'file:///C:/kaifa/web/workspace-eb/ebbtns/src/main/resources/static/scripts/re/za/container/countDown.js' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, chrome-untrusted, https.
 *  ————————————————————————————————————————————————————————————————————————————
 * 由
 * require.js的define(CountDown);
 * 产生错误
 *  ————————————————————————————————————————————————————————————————————————————
 * 在babel脚本标签安排一个专门处理jsx的注册表吧
 * 
 */

