package org.jefree.security;

import org.jefree.security.authentication.DefaultUnauthorizedEntryPoint;
import org.jefree.security.authentication.jwt.JwtService;
import org.jefree.security.authentication.jwt.JwtTokenFilter;
import org.jefree.security.authentication.oauth2.OAuth2LoginSuccessHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.HeaderWriterLogoutHandler;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.header.writers.ClearSiteDataHeaderWriter;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@EnableAspectJAutoProxy
public class SecurityConfiguration {

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public AuthenticationManager authenticationManager(final AuthenticationConfiguration configuration) throws Exception {
    return configuration.getAuthenticationManager();
  }

  @Bean
  public JwtTokenFilter authenticationJwtTokenFilter(final JwtService jwtService) {
    return new JwtTokenFilter(jwtService);
  }

  @Bean
  SecurityFilterChain defaultSecurityFilterChain(
    final HttpSecurity http,
    final DefaultUnauthorizedEntryPoint unauthorizedHandler,
    @Lazy final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler,
    final JwtTokenFilter authenticationJwtTokenFilter
  ) throws Exception {

    http.csrf(csrf ->
      csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
        .ignoringRequestMatchers("/api/public/auth/**")
    );

    http.authorizeHttpRequests(requests ->
      requests
        .requestMatchers("/api/admin/**").hasRole("ADMIN")
        .requestMatchers("/api/auth/csrf-token").permitAll()
        .requestMatchers("/api/public/**").permitAll()
        .requestMatchers("/api/logout").permitAll()
        .requestMatchers("/api").permitAll()
        .requestMatchers("/error").permitAll()
        .anyRequest().authenticated()
    ).oauth2Login( oauth2 -> oauth2
      .successHandler(oAuth2LoginSuccessHandler)
      .authorizationEndpoint(auth -> auth.baseUri("/api/public/auth/oauth2/authorization"))
    );

    http.exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler));

    http.addFilterBefore(authenticationJwtTokenFilter, UsernamePasswordAuthenticationFilter.class);

    http.logout((logout) -> logout
      .logoutUrl("/api/logout")
      .deleteCookies("JSESSIONID")
      .invalidateHttpSession(true)
      .clearAuthentication(true)
      .addLogoutHandler(
        new HeaderWriterLogoutHandler(new ClearSiteDataHeaderWriter(ClearSiteDataHeaderWriter.Directive.ALL))
      )
    );

    http.cors(withDefaults());
    http.formLogin(withDefaults());
    http.httpBasic(withDefaults());

    return http.build();
  }
}
