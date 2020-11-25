/**
 * 大神信息完善路由构件
 */

(global=> {
global.DashenInfo = {};	
const {connect} = ReactRedux;
const {updateUser} = Actions;

class DashenInfo extends React.Component {
  state = {
      header: '', // 头像名称
      info: '', // 个人简介
      post: '', // 求职岗位
  }
	constructor(props) {
  	super(props);
  	this.handleChange = handleChange.bind(this);
  }
  // 设置更新header
  setHeader = (header) => {
      this.setState({ header });
  }
	render() {
		return JSXRegistry.renderingDashenInfo.bind(this)();
	}
}

global.DashenInfo = connect(
	state=> ({user: state.user}),
	{updateUser}
)(DashenInfo);
})(this);



