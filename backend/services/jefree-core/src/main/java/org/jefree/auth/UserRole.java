package org.jefree.auth;

import org.jefree.security.authorization.role.DefaultRole;
import org.jefree.security.authorization.role.Permission;
import org.jefree.security.authorization.role.Role;

import java.util.EnumSet;
import java.util.Set;

import static org.jefree.security.authorization.role.DefaultRole.USER;

public enum UserRole implements Role {
  CANDIDATE(Set.of(USER), EnumSet.complementOf(EnumSet.of(Permission.READ, Permission.ADMIN))),
  RECRUITER(Set.of(USER), EnumSet.complementOf(EnumSet.of(Permission.READ, Permission.ADMIN)));

  private final Set<Role> includedRoles;
  private final Set<Permission> permissions;

  UserRole(
    final Set<Role> includedRoles,
    final Set<Permission> permissions
  ) {
    this.includedRoles = includedRoles;
    this.permissions = permissions;

    DefaultRole.ADMIN.getIncludedRoles().add(this);
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
