/**
 * 应用主界面路由构件
 */

(global=> {
global.Main = {};	
const {connect} = ReactRedux;
const {getUser} = Actions;

class Main extends React.Component {
	// 构件类和对象
	// 给构件对象添加属性
	navList = [
		{
			path: '/laoban', // 路由路径
			component: Laoban,
			title: '大神列表',
			icon: 'dashen',
			text: '大神'
		},
		{
			path: '/dashen', // 路由路径
			component: Dashen,
			title: '老板列表',
			icon: 'laoban',
			text: '老板'
		},
		{
			path: '/message', // 路由路径
			component: Message,
			title: '消息列表',
			icon: 'message',
			text: '消息'
		},
		{
			path: '/personal', // 路由路径
			component: Personal,
			title: '用户中心',
			icon: 'personal',
			text: '个人'
		}
	]
	/*componentDidMount() {
		// cookie 中有userid
		// redux 中的user 是空对象
		//const userid = Cookies.get('userid');
		const {user} = this.props;
		console.log("Main:componentDidMount(): user.userId=", user.userId);
		if (!user.userId) {
			this.props.getUser(user.userId) // 获取user并保存到redux中
		}
	}*/
	render() {
  	return JSXRegistry.renderingMain.bind(this)();
  }
}

global.Main = connect(
	state => ({ 
		user: state.user,
		unReadCount: state.chat.unReadCount // 未读消息数量
	}),
	{getUser}
)(Main);
})(this);



