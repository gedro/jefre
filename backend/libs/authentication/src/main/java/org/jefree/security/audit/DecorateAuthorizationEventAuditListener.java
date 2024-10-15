package org.jefree.security.audit;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.boot.actuate.audit.AuditEvent;
import org.springframework.boot.actuate.security.AuthorizationAuditListener;
import org.springframework.context.event.SimpleApplicationEventMulticaster;
import org.springframework.security.authorization.event.AuthorizationDeniedEvent;
import org.springframework.security.authorization.event.AuthorizationEvent;
import org.springframework.security.core.Authentication;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.function.Supplier;

public class DecorateAuthorizationEventAuditListener extends AuthorizationAuditListener {

  /**
   * Handle an application event.
   *
   * @param event the event to respond to
   */
  @Override
  public void onApplicationEvent(final AuthorizationEvent event) {
    if (event instanceof AuthorizationDeniedEvent<?> authorizationDeniedEvent) {
      onAuthorizationDeniedEvent(authorizationDeniedEvent);
    }
  }

  private void onAuthorizationDeniedEvent(final AuthorizationDeniedEvent<?> event) {
    final Map<String, Object> data = new LinkedHashMap<>();

    final String name = getName(event.getAuthentication());
    final Object details = getDetails(event.getAuthentication());
    if (details != null) {
      data.put("details", details);
    }

    final Object source = event.getSource();
    if(source instanceof HttpServletRequest servletRequest) {
      data.put("requestUrl", servletRequest.getRequestURL());
    }

    publish(new AuditEvent(name, AuthorizationAuditListener.AUTHORIZATION_FAILURE, data));
  }

  /**
   * Return whether this listener supports asynchronous execution.
   *
   * @return {@code true} if this listener instance can be executed asynchronously
   * depending on the multicaster configuration (the default), or {@code false} if it
   * needs to immediately run within the original thread which published the event
   * @see SimpleApplicationEventMulticaster#setTaskExecutor
   * @since 6.1
   */
  @Override
  public boolean supportsAsyncExecution() {
    return true;
  }

  private String getName(final Supplier<Authentication> authentication) {
    try {
      return authentication.get().getName();
    } catch (Exception ex) {
      return "<unknown>";
    }
  }

  private Object getDetails(Supplier<Authentication> authentication) {
    try {
      return authentication.get().getDetails();
    } catch (Exception ex) {
      return null;
    }
  }
}
