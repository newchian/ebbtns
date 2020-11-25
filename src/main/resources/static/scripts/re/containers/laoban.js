/**
 * 老板的主路由构件
 */

(global=> {
const {connect} = ReactRedux;
const {getUserList} = Actions;

class Laoban extends React.Component {
	componentDidMount() {
		console.log("Laoban:componentDidMount()");
		this.props.getUserList('dashen');
	}
	render() {
		return JSXRegistry.renderingLaoban.bind(this)();
	}	
}

global.Laoban = connect(
	state => ({userList: state.userList}),
	{getUserList}
)(Laoban);
})(this);
