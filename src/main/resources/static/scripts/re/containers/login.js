/**
 * 用户登陆的路由构件
 */

(global=> {
const {connect} = ReactRedux;
const {login} = Actions;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.renderingLogin = JSXRegistry.renderingLogin;
    this.handleChange = handleChange.bind(this);
  }
  state = {
    username: '',
    password: '',
  }
  // 跳转到注册路由
  toRegister = () => {
    this.props.history.replace('/register');
  }
  // 登陆
  login = () => {
  	console.log(this.state,this.props.login);
  	this.props.login(this.state);
  }
  render() {
    return this.renderingLogin();
  }
}

global.Login = connect(
	state=> ({user: state.user}),
	{login}
)(Login);
})(this);





