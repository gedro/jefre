package org.jefree.security.authorization.annotation;

import org.jefree.security.authorization.handler.EmailMaskingMethodAuthorizationDeniedHandler;
import org.springframework.security.authorization.method.HandleAuthorizationDenied;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@HandleAuthorizationDenied(handlerClass = EmailMaskingMethodAuthorizationDeniedHandler.class)
public @interface MaskEmailWhenAuthZDenied {
}
