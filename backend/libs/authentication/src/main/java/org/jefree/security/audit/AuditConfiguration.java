package org.jefree.security.audit;

import org.springframework.boot.actuate.security.AuthorizationAuditListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Configuration
@EnableJpaAuditing
public class AuditConfiguration {

  @Bean
  public AuditorProvider loggedInAuditUser() {
    return new AuditorProvider();
  }

  @Bean
  public AuditEventLogger auditEventLogger(final AuditLoggerService auditLogger) {
    return new AuditEventLogger(auditLogger);
  }

  @Bean("decorateAuthorizationEventAuditListener")
  public AuthorizationAuditListener decorateAuthorizationEventAuditListener() {
    return new DecorateAuthorizationEventAuditListener();
  }
}
