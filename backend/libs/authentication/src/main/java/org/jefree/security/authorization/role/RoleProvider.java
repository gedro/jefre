package org.jefree.security.authorization.role;

import java.util.Set;

public interface RoleProvider {
  Set<Role> getRoles();
}
