package org.jefree.security.audit;

import org.slf4j.Logger;
import org.slf4j.MDC;
import org.springframework.stereotype.Service;

import java.util.function.Consumer;

@Service
public class AuditLoggerService {

  private final static String MDC_LOG_TYPE = "logType";

  public void log(final Logger log, final Consumer<Logger> message) {
    try {
      MDC.put(MDC_LOG_TYPE, "AUDIT");
      message.accept(log);
    } finally {
      MDC.remove(MDC_LOG_TYPE);
    }
  }

}
