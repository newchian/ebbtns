/**
 * 用户列表的UI构件
 */

(global=> {
const { withRouter } = ReactRouterDOM;

function UserList(props) {//好像不认箭头表达式啊
	return JSXRegistry.userListJSX(props);
}

global.UserList = withRouter(UserList);

})(this);