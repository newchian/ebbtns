/**
 * 包含n 个工具函数的模块
 */

// 处理输入框/单选框变化, 收集数据到state
const handleChange = function (name, value){
  this.setState({[name]: value});
};

/** 
* 注册laoban--> /laobaninfo
* 注册大神--> /dasheninfo
* 登陆laoban --> /laobaninfo 或者/laoban
* 登陆大神--> /dasheninfo 或者/dashen
*/
const getRedirectPath = function ({type, header}) {
  let path = ''
  // 根据type 得到path
  path += type === 'laoban' ? '/laoban' : '/dashen'
  // 如果没有头像添加info
  if (!header) {
      path += 'info'
  }
  return path
}

