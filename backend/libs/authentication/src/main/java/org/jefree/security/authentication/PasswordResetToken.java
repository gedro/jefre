package org.jefree.security.authentication;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.jefree.security.audit.AuditableEntity;
import org.jefree.security.authentication.user.UserEntity;

import java.time.Instant;

@Entity(name = "PasswordResetToken")
@Table(name = "password_reset_token",
  indexes = {
    @Index(columnList = "token", unique = true)
  },
  uniqueConstraints = {
    @UniqueConstraint(columnNames = "token")
  }
)
public class PasswordResetToken extends AuditableEntity<String> {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", updatable = false)
  private Long id;

  @NotBlank
  @Size(max = 60)
  @Column(name="token", length = 60, updatable = false, unique = true, nullable = false)
  private String token;

  @Column(name="expiry_date", updatable = false, nullable = false)
  private Instant expiryDate;

  @Column(name="used", updatable = true, nullable = false)
  private boolean used;

  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
  private UserEntity user;
}
