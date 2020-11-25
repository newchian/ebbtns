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
  login = () => {
  	 /*if(this.state.chatId === ''||this.state.pwd === ''){
  		 this.setState({chatId: document.querySelector('#chatId').value,
  		 pwd: document.querySelector('#chatPassword').value});
  	 }*/
  	console.log(document.querySelector('#chatId').value,document.querySelector('#chatPassword').value);
  	this.props.loginingDialog({
    	chatId: document.querySelector('#chatId').value,
    	pwd: document.querySelector('#chatPassword').value
    });
  }
  render() {  	
  	return this.renderingDialogLogin();
  }
}

global.DialogLogin = connect(
	state => ({ dialog: state.dialog }),
	{loginingDialog}
)(DialogLogin);
})(this);


