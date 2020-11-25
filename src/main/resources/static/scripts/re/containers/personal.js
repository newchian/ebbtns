/**
 * 用户个人中心路由构件
 */

(global=> {
const {connect} = ReactRedux;
const {resetUser} = Actions;

class Personal extends React.Component {
  handleLogout = () => {
    Modal.alert('退出', '确认退出登录吗?', [
    	{
      	text: '取消',
       	onPress: () => console.log('cancel')
    	},
    	{
    		text: '确认',
    		onPress: () => {
    			// 清除cookie 中的userid
          //Cookies.remove('userid')
          // 重置redux 中的user 状态
          this.props.resetUser();
    		}
    	}
    ]);
  }
  render() {
		return JSXRegistry.renderingPersonal.bind(this)();
	}
}

global.Personal = connect(
	state=> ({user: state.user}),
	{resetUser}
)(Personal);
})(this);


