package cn.xca.chatr;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import com.alibaba.fastjson.JSON;
import com.xca.chat.pojo.User;
import com.xca.chat.pojo.UserData;

@Controller
public class ChatRoomLoginController {
  private static final String PASSWORD = "123456";
  @RequestMapping("/chatlogin")
	public String chatLogin() {
  	return "login";
  }
	@RequestMapping("/loginme")
	public void loginMe(HttpServletRequest req, HttpServletResponse resp) throws Exception {
		resp.setCharacterEncoding("UTF-8");
		//ModelAndView mav = new ModelAndView("login"); 
		// 1. 接收页面传递的参数 , 用户名/密码
		String username = req.getParameter("username");
		String password = req.getParameter("password");
		User sUser = null;
		for (Long k : UserData.USER_MAP.keySet()) {			
			User user = UserData.USER_MAP.get(k);			
			if(user.getUserName().equalsIgnoreCase(username))
				sUser = user;
		}
		Map resultMap = new HashMap();
		// 2. 判定用户名密码是否正确
		// 3. 如果正确, 响应登录成功的信息
		if (PASSWORD.equals(password)) {
			resultMap.put("success", true);
			resultMap.put("message", "登录成功");
			req.getSession().setAttribute("suser", sUser == null?username:JSON.toJSONString(sUser));
		} else {// 4. 如果不正确, 响应登录失败的信息
			resultMap.put("success", false);
			resultMap.put("message", "用户名或密码错误");
		}
		System.out.println("username="+username+"      password="+password);
		// 5. 响应数据
		resp.getWriter().write(JSON.toJSONString(resultMap));
		//mav.setView(new MappingJackson2JsonView());
		//mav.addAllObjects(resultMap);
	}
	@RequestMapping("/chatindex")
	public String index(HttpServletRequest req, HttpServletResponse resp) {
		return "index";
	}
	@RequestMapping("/chat")
	public String chat(HttpServletRequest req, HttpServletResponse resp) {
		return "chat";
	}
}
