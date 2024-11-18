package org.jefree.auth;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;

@Configuration
public class UserAuthConfig {

  @Bean
  public FilterRegistrationBean<UserTypeRegistrationFilter> someFilterRegistration() {

    final FilterRegistrationBean<UserTypeRegistrationFilter> registration = new FilterRegistrationBean<>();
    registration.setFilter(userTypeRegistrationFilter());
    registration.addUrlPatterns("/api/public/auth/oauth2/authorization/*");
    registration.addUrlPatterns("/api/public/auth/signup");
    registration.setName("userTypeRegistrationFilter");
    registration.setOrder(Ordered.HIGHEST_PRECEDENCE);

    return registration;
  }

  @Bean(name = "userTypeRegistrationFilter")
  public UserTypeRegistrationFilter userTypeRegistrationFilter() {
    return new UserTypeRegistrationFilter();
  }

}
