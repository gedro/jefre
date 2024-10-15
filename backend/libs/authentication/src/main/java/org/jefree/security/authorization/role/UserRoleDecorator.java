package org.jefree.security.authorization.role;

import org.jefree.security.authentication.user.User;

import java.util.Set;

public interface UserRoleDecorator {
  Set<Role> getRoles(User user);
}
