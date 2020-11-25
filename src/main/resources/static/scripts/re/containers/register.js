/**
 * 用户注册的路由构件
 */

(global=> {
global.Register = {};	
const {connect} = ReactRedux;
const {register} = Actions;

class Register extends React.Component {
	constructor(props) {
  	super(props);
  	this.renderingRegister = JSXRegistry.renderingRegister;
  	this.handleChange = handleChange.bind(this);
  }
	state = {
    username: '',
    password: '',
    password2: '',
    type: 'dashen'
  }
  
  // 跳转到登陆login 路由
  toLogin = ()=> {
    this.props.history.replace('/login');
  }
  // 注册
  register = ()=> {
  	this.props.register(this.state);
  }
  render() {
    return this.renderingRegister();
  }
}

global.Register = connect(
	state=> ({user: state.user}),
	{register}
)(Register);
})(this);


