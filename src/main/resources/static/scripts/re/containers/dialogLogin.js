/**
 * 聊天演示对话框登录面板
 */

(global=> {
global.DialogLogin = {};
const {connect} = ReactRedux;
const {loginingDialog} = Actions;

class DialogLogin extends React.Component {
	constructor(props) {
		super(props);
		this.renderingDialogLogin = JSXRegistry.renderingDialogLogin;
		this.handleChange = handleChange.bind(this);
	}
  /*state = {
  	chatId: '',
  	pwd: '',
  }*/
  // 登陆
  login = ()=> {
  	 /*if(this.state.chatId === ''||this.state.pwd === ''){
  		 this.setState({chatId: document.querySelector('#chatUsername').value,
  		 pwd: document.querySelector('#chatPassword').value});
  	 }*/
  	console.log("DialogLogin:login:" + document.querySelector('#chatUsername').value + ":" + document.querySelector('#chatPassword').value);
  	this.props.loginingDialog({
  		username: document.querySelector('#chatUsername').value,
  		password: document.querySelector('#chatPassword').value
    });
  }
  render() {  	
  	return this.renderingDialogLogin();
  }
}

global.DialogLogin = connect(
	state => ({ user: state.user }),
	{loginingDialog}
)(DialogLogin);

})(this);


