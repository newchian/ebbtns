/**
 * 使用axios封装的ajax请求函数 函数返回的是promise对象
 */

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:8081/', // api的base_url
  withCredentials: true, // 解决服务器设置token到cookies中(响应头部的set-cookie有值)，浏览器Application的cookies中没有存入token
  timeout: 20000 // 请求超时时间
});

function ajax(url = '', data = {}, type = 'GET') {
  if (type === 'GET') {
    // 准备url query 参数数据
    let dataStr = ''; // 数据拼接字符串
    Object.keys(data).forEach(key => {
    	dataStr += key + '=' + data[key] + '&';
    });
  if (dataStr !== '') {
    dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'));
    url = url + '?' + dataStr;
  }
  // 发送get 请求
  return service.get(url);
  } else {
    // 发送post 请求
    return service.post(url, data); // data: 包含请求体数据的对象
  }
}


