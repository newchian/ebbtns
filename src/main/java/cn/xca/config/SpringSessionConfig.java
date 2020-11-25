package cn.xca.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;

@Configuration
public class SpringSessionConfig {
	
	public SpringSessionConfig() {
	}
//chrome://flags/#same-site-by-default-cookies
//chrome://flags/#cookies-without-same-site-must-be-secure
	@Bean
	public CookieSerializer cookieSerializer() {
		DefaultCookieSerializer cookieSerializer = new DefaultCookieSerializer();
		cookieSerializer.setCookieName("token");
		cookieSerializer.setUseHttpOnlyCookie(false);
		cookieSerializer.setSameSite("None");
		cookieSerializer.setCookiePath("/");
		//cookieSerializer.setUseSecureCookie(true);
		return cookieSerializer;
	}
}
