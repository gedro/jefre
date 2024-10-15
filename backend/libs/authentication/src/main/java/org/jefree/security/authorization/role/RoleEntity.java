package org.jefree.security.authorization.role;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.jefree.security.audit.AuditableEntity;
import org.jefree.security.authentication.user.UserEntity;

import java.util.HashSet;
import java.util.Set;

@Entity(name = "Role")
@Table(name = "role",
  indexes = {
    @Index(columnList = "name", unique = true)
  },
  uniqueConstraints = {
    @UniqueConstraint(columnNames = "name")
  }
)
public class RoleEntity extends AuditableEntity<String> {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", updatable = false)
  private Long id;

  @NotBlank
  @Size(max = 30)
  @Column(name="name", length = 30, updatable = false)
  private String name;

  @ManyToMany(mappedBy = "roles", cascade = { CascadeType.MERGE, CascadeType.PERSIST })
  private Set<UserEntity> users = new HashSet<>();

  public @NotBlank @Size(max = 30) String getName() {
    return name;
  }

  public RoleEntity() {
  }

  public RoleEntity(final String name) {
    this.name = name;
  }

  public Set<UserEntity> getUsers() {
    return users;
  }
}
