/**
 * 聊天演示对话框面板
 */

class Dialog extends React.Component {
	constructor(props) {
		super(props);
		this.renderingDialog = JSXRegistry.renderingDialog;
	}
	componentDidMount() {
		startWebSocket(this.props.self)
	}
  render() {
  	return this.renderingDialog();
  }
}



