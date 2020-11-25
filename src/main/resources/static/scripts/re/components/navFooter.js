/**
 * 底部导航的UI构件
 */

(global=> {

global.NavFooter = {};
const { withRouter } = ReactRouterDOM;

class NavFooter extends React.Component {
	render() {
		return JSXRegistry.renderingNavFooter.bind(this)();
	}
}

global.NavFooter = withRouter(NavFooter);

})(this);

