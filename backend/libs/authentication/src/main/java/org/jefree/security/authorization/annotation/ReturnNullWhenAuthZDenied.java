package org.jefree.security.authorization.annotation;

import org.jefree.security.authorization.handler.NullMethodAuthorizationDeniedHandler;
import org.springframework.security.authorization.method.HandleAuthorizationDenied;

import java.lang.annotation.*;

@Target({ ElementType.METHOD, ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@HandleAuthorizationDenied(handlerClass = NullMethodAuthorizationDeniedHandler.class)
public @interface ReturnNullWhenAuthZDenied {
}
