package org.jefree.security.authorization.role;

public class RoleView {

  private final Long id;
  private final String name;

  public RoleView(final Long id, final String name) {
    this.id = id;
    this.name = name;
  }

  public RoleView(final RoleEntity roleEntity) {
    this.id = roleEntity.getId();
    this.name = roleEntity.getName();
  }

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }
}
