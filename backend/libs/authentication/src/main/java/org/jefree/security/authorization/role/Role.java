package org.jefree.security.authorization.role;

import java.util.EnumSet;
import java.util.Set;

public interface Role {
  default String roleName() {
    return "ROLE_" + internalName();
  }

  String internalName();

  Set<Role> getIncludedRoles();

  default Set<Permission> getPermissions() {
    return EnumSet.noneOf(Permission.class);
  }
}
