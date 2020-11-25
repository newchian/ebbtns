/**
 * laoban 信息完善路由构件
 */

(global=> {
global.LaobanInfo = {};	
const {connect} = ReactRedux;
const {updateUser} = Actions;

class LaobanInfo extends React.Component {
  state = {
      header: '', // 头像名称
      info: '', // 职位简介
      post: '', // 职位名称
      company: '', // 公司名称
      salary: '' // 工资
  };
	constructor(props) {
  	super(props);
  	this.handleChange = handleChange.bind(this);
  }
  // 设置更新header
  setHeader = (header) => {
      this.setState({ header });
  }
	render() {
		return JSXRegistry.renderingLaobanInfo.bind(this)();
	}
}

global.LaobanInfo = connect(
	state=> ({user: state.user}),
	{updateUser}
)(LaobanInfo);
})(this);

