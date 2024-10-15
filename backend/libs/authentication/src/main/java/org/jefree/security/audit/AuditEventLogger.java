package org.jefree.security.audit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.boot.actuate.audit.listener.AuditApplicationEvent;
import org.springframework.context.event.EventListener;

public class AuditEventLogger {

  private static final Logger log = LoggerFactory.getLogger(AuditEventLogger.class);
  private final static String MDC_LOG_AUDIT_TYPE = "auditType";

  private final AuditLoggerService auditLogger;

  public AuditEventLogger(final AuditLoggerService auditLogger) {
    this.auditLogger = auditLogger;
  }

  @EventListener
  public void onAuditApplicationEvent(final AuditApplicationEvent auditApplicationEvent) {
    try {
      MDC.put(MDC_LOG_AUDIT_TYPE, auditApplicationEvent.getAuditEvent().getType());
      auditLogger.log(log, l -> l.info("Audit application event: {}", auditApplicationEvent));
    } finally {
      MDC.remove(MDC_LOG_AUDIT_TYPE);
    }
  }

}
