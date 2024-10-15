package org.jefree.security.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.actuate.audit.AuditEventRepository;
import org.springframework.boot.actuate.audit.InMemoryAuditEventRepository;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class WebSecurityConfiguration {

  /**
   * For handling JSON vulnerability, JSON response bodies would be prefixed with this string.
   */
  public static final String JSON_PREFIX = ")]}',\n";

  /**
   * Prefixes JSON responses for JSON vulnerability. Disabled by default.
   * https://haacked.com/archive/2008/11/20/anatomy-of-a-subtle-json-vulnerability.aspx
   *
   * How to use it from Angular:
   * https://docs.angularjs.org/api/ng/service/$http#security-considerations
   *
   */
  @Bean
  @ConditionalOnProperty(name="libs.security.web.json-prefix.enabled")
  public MappingJackson2HttpMessageConverter mappingJackson2HttpMessageConverter(final ObjectMapper objectMapper) {
    final MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter(objectMapper);
    converter.setJsonPrefix(JSON_PREFIX);
    return converter;
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource(final CorsProperties cors) {
    return new DefaultCorsConfigurationSource(cors);
  }

  @Bean
  public CorsFilter corsFilter(final CorsConfigurationSource corsConfigurationSource) {
    return new CorsFilter(corsConfigurationSource);
  }

  @Bean
  @ConditionalOnMissingBean(AuditEventRepository.class)
  public AuditEventRepository auditEventRepository(){
    return new InMemoryAuditEventRepository();
  }
}
