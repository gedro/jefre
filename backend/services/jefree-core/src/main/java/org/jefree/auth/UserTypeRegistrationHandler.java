package org.jefree.auth;

import jakarta.servlet.http.HttpSession;
import org.jefree.security.authentication.user.User;
import org.jefree.security.authorization.role.Role;
import org.jefree.security.authorization.role.UserRoleDecorator;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.Collections;
import java.util.Set;

@Component
public class UserTypeRegistrationHandler implements UserRoleDecorator {

  private final ObjectFactory<HttpSession> httpSessionFactory;

  public UserTypeRegistrationHandler(final ObjectFactory<HttpSession> httpSessionFactory) {
    this.httpSessionFactory = httpSessionFactory;
  }

  @Override
  public Set<Role> getRoles(final User user) {
    if(httpSessionFactory == null) {
      return Collections.emptySet();
    }

    final HttpSession session = httpSessionFactory.getObject();
    final String registrationType = (String) session.getAttribute("registrationType");
    session.removeAttribute("registrationType");

    if(StringUtils.hasLength(registrationType)) {
      switch(registrationType) {
        case "candidate":
          return Set.of(UserRole.CANDIDATE);
        case "recruiter":
          return Set.of(UserRole.RECRUITER);
      }
    }

    return Collections.emptySet();
  }
}
