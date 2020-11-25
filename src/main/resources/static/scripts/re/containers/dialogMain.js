/**
 * 聊天演示对话框主面板
 */

(global=> {
const {connect} = ReactRedux;

class DialogMain extends React.Component {
	constructor(props) {
		super(props);
		this.renderingDialogMain = JSXRegistry.renderingDialogMain;
	}
	render() {
  	return this.renderingDialogMain();
  }
}

global.DialogMain = connect(
	state => ({ dialog: state.dialog })
)(DialogMain);
})(this);
