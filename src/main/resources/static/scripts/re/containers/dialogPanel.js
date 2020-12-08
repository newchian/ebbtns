/**
 * 聊天演示对话框面板
 */

(global=> {

global.Dialog = {};	
const { connect } = ReactRedux;
const { sendDialog } = Actions;

class Dialog extends React.Component {
	constructor(props) {
		super(props);
		this.renderingDialog = JSXRegistry.renderingDialog;
	}
	sendMsg(from) {
		const content = document.querySelector("#context_text").value.trim();
		if(!content){
      alert('请输入消息内容');
      return ;
		}
		
		const chat = {  
				from,
				//to: document.querySelector('input[type="radio"]').checked//document.querySelector('input:radio:checked').value,Failed to execute 'querySelector' on 'Document': 'input:radio:checked' is not a valid selector.
				content
		};
		document.querySelectorAll('input[type="radio"]').forEach(e=> {
			if(e.checked) chat.to = e.value;
		});
		console.log("Dialog: sendMsg(from): " + JSON.stringify(chat));//JSON.stringify(chat) Converting circular structure to JSON
		this.props.sendDialog(chat);
		document.querySelector("#context_text").value ='';
	}
	sendMessage(from){
		console.log("Dialog: sendMessag(from): " + from);
		if(event.keyCode == 13){
      sendMsg(from);
		}
	}
  render() {
  	console.log("Dialog:render():",this.props.user);
  	console.log("Dialog:render():",this.props.chat);
  	return this.renderingDialog();
  }
}

global.Dialog = connect(
	state=> ({ user: state.user, chat: state.chat }),
	{ sendDialog }
)(Dialog);

})(this);

