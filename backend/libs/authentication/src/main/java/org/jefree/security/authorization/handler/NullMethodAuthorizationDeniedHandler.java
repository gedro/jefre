package org.jefree.security.authorization.handler;

import org.aopalliance.intercept.MethodInvocation;
import org.springframework.security.authorization.AuthorizationResult;
import org.springframework.security.authorization.method.MethodAuthorizationDeniedHandler;

public class NullMethodAuthorizationDeniedHandler implements MethodAuthorizationDeniedHandler {

  @Override
  public Object handleDeniedInvocation(
    final MethodInvocation methodInvocation,
    final AuthorizationResult authorizationResult
  ) {
    return null;
  }
}
