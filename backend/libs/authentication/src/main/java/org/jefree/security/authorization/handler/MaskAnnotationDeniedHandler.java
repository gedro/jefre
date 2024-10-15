package org.jefree.security.authorization.handler;

import org.aopalliance.intercept.MethodInvocation;
import org.jefree.security.authorization.annotation.Mask;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.security.authorization.AuthorizationResult;
import org.springframework.security.authorization.method.MethodAuthorizationDeniedHandler;

import java.util.Objects;

public class MaskAnnotationDeniedHandler implements MethodAuthorizationDeniedHandler {

  @Override
  public Object handleDeniedInvocation(
    final MethodInvocation methodInvocation,
    final AuthorizationResult authorizationResult
  ) {
    final Mask mask = AnnotationUtils.getAnnotation(methodInvocation.getMethod(), Mask.class);
    return Objects.requireNonNull(mask).value();
  }

}
