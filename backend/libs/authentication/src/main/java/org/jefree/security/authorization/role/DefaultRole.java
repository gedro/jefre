package org.jefree.security.authorization.role;

import java.util.EnumSet;
import java.util.HashSet;
import java.util.Set;

public enum DefaultRole implements Role {
  USER(Set.of(), EnumSet.complementOf(EnumSet.of(Permission.READ, Permission.ADMIN))),
  ADMIN(Set.of(USER), EnumSet.complementOf(EnumSet.of(Permission.READ)));

  private final Set<Role> includedRoles;
  private final Set<Permission> permissions;

  DefaultRole(
    final Set<Role> includedRoles,
    final Set<Permission> permissions
  ) {
    this.includedRoles = new HashSet<>(includedRoles);
    this.permissions = permissions;
  }

  @Override
  public String internalName() {
    return name();
  }

  @Override
  public Set<Role> getIncludedRoles() {
    return includedRoles;
  }

  @Override
  public Set<Permission> getPermissions() {
    return permissions;
  }
}
