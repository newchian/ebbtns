/**
 * 大神的主路由构件
 */

(global=> {
const {connect} = ReactRedux;
const {getUserList} = Actions;

class Dashen extends React.Component {
	componentDidMount() {
		console.log("Dashen:componentDidMount()");
		this.props.getUserList('laoban');
	}
	render() {
		return JSXRegistry.renderingDashen.bind(this)();
	}
}

global.Dashen = connect(
	state => ({userList: state.userList}),
	{getUserList}
)(Dashen);
})(this);
