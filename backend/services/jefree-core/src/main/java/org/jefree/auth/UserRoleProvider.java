package org.jefree.auth;

import org.jefree.security.authorization.role.Role;
import org.jefree.security.authorization.role.RoleProvider;
import org.springframework.stereotype.Component;

import java.util.EnumSet;
import java.util.HashSet;
import java.util.Set;

@Component
public class UserRoleProvider implements RoleProvider {
  @Override
  public Set<Role> getRoles() {
    return new HashSet<>(EnumSet.allOf(UserRole.class));
  }
}
