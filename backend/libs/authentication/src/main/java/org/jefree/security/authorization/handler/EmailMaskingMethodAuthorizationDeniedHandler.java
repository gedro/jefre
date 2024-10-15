package org.jefree.security.authorization.handler;

import org.aopalliance.intercept.MethodInvocation;
import org.springframework.security.authorization.AuthorizationResult;
import org.springframework.security.authorization.method.MethodAuthorizationDeniedHandler;
import org.springframework.security.authorization.method.MethodInvocationResult;

public class EmailMaskingMethodAuthorizationDeniedHandler implements MethodAuthorizationDeniedHandler {

  @Override
  public Object handleDeniedInvocation(
    final MethodInvocation methodInvocation,
    final AuthorizationResult authorizationResult
  ) {
    return "***";
  }

  @Override
  public Object handleDeniedInvocationResult(
    final MethodInvocationResult methodInvocationResult,
    final AuthorizationResult authorizationResult
  ) {
    final String email = (String) methodInvocationResult.getResult();
    return email.replaceAll("(^[^@]{3}|(?!^)\\G)[^@]", "$1*");
  }
}
