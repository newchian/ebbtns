/**
 * 对话聊天的路由构件
 */

(global=> {

global.Chat = {};	
const { connect } = ReactRedux;
const { sendMsg, readMsg } = Actions;

class Chat extends React.Component {
	constructor(props) {
		super(props);
    this.renderingChat = JSXRegistry.renderingChat;
	}
	state = {
      content: '',
      isShow: false // 是否显示表情列表
  }
  // 切换表情列表的显示
  toggleShow = () => {
      const isShow = !this.state.isShow;
      this.setState({ isShow });
      if (isShow) {
          // 异步手动派发resize 事件,解决表情列表显示的bug
          setTimeout(() => {
              window.dispatchEvent(new Event('resize'));
          }, 0);
      }
  }
  submit = () => {
  	  console.log("Chat:submit");
      const content = this.state.content.trim();
      const to = this.props.match.params.userId;
      const from = this.props.user.userId;
      this.props.sendMsg({from, to, content});
      this.setState({content: '', isShow: false});
  }
  componentWillUnmount() {
      this.props.readMsg(this.props.match.params.userId);
  }
  componentDidMount() {
      // 初始显示列表
      window.scrollTo(0, document.body.scrollHeight);
      //this.props.readMsg(this.props.match.params.userId);
  }
  componentDidUpdate() {
      // 更新显示列表
      window.scrollTo(0, document.body.scrollHeight);
  }
  componentWillMount() {
      this.emojis = ['🙈', '😊', '💫', '🐒', '🐩 ', '🐺', '❤', '🐜', '👍', '👐', '👎', '🙍‍♂️', '🙍‍♀️', '🙋‍♂️',
        '🙋‍♂️', '🙋‍♂️', '🙋‍♂️', '🙋‍♂️', '🙋‍♂️', '🙋‍♂️', '❤', '🙋‍♂️', '🙋‍♂️', '🙋‍♂️', '🙋‍♂️', '🙋‍♂️', '🙋‍♂️', '🙋‍♂️',
        '🙋‍♀️', '🙋‍♀️', '👨‍🎓', '👩‍🎓', '👩‍🏫', '👨‍🔧', '❤', '👩‍✈️', '👩‍❤️‍💋‍👨', '👩‍❤️‍👨', '👨‍👩‍👧‍👦', '👣 ', '🌂', '☂'];
      this.emojis = this.emojis.map(emoji => ({text: emoji}));
      //console.log(this.emojis);
  }
	render() {
		return this.renderingChat();
	}
}

global.Chat = connect(
	state=> ({ user: state.user, chat: state.chat }),
	{ sendMsg, readMsg }
)(Chat);

})(this);





