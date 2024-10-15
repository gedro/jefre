package org.jefree.security.authentication.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.jefree.security.audit.AuditableEntity;
import org.jefree.security.authentication.oauth2.GitHubUserEntity;
import org.jefree.security.authentication.oauth2.GoogleUserEntity;
import org.jefree.security.authorization.role.RoleEntity;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity(name = "RegisteredUser")
@Table(
  name = "users",
  uniqueConstraints = {
    @UniqueConstraint(columnNames = "username"),
    @UniqueConstraint(columnNames = "email")
  }
)
public class UserEntity extends AuditableEntity<String> {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", updatable = false, nullable = false)
  private Long id;

  @NotBlank
  @Size(max = 120)
  @Column(name="name", length = 120, updatable = false)
  private String name;

  @NotBlank
  @Size(max = 120)
  @Email
  @Column(name="email", length = 120, updatable = false, nullable = false)
  private String email;

  @NotBlank
  @Size(max = 60)
  @Column(name="username", length = 60, updatable = false, nullable = false)
  private String username;

  @Size(max = 120)
  @Column(name="password", length = 120, updatable = true)
  @JsonIgnore
  private String password;

  @OneToOne(mappedBy = "registeredUser", optional = true)
  private GoogleUserEntity googleUser;

  @OneToOne(mappedBy = "registeredUser", optional = true)
  private GitHubUserEntity githubUser;

  @ManyToMany(cascade = { CascadeType.MERGE, CascadeType.PERSIST })
  @JoinTable(
    name = "user_roles",
    joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
    inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
  private Set<RoleEntity> roles = new HashSet<>();

  @Column(name="credentials_expiry_date", updatable = true)
  private LocalDate credentialsExpiryDate;

  @Column(name="account_expiry_date", updatable = true)
  private LocalDate accountExpiryDate;

  @NotBlank
  @Size(max = 10)
  @Column(name="signup_method", length = 10, updatable = false, nullable = false)
  private String signUpMethod;

  @Size(max = 30)
  @Column(name="mfa_secret", length = 30, updatable = true)
  private String mfaSecret;

  @Column(name="mfa_enabled", updatable = true, nullable = false)
  private boolean mfaEnabled = false;

  @Column(name="account_non_locked", updatable = true, nullable = false)
  private boolean accountNonLocked = true;

  @Column(name="account_non_expired", updatable = true, nullable = false)
  private boolean accountNonExpired = true;

  @Column(name="credentials_non_expired", updatable = true, nullable = false)
  private boolean credentialsNonExpired = true;

  @Column(name="enabled", updatable = true, nullable = false)
  private boolean enabled = true;

  public Long getId() {
    return id;
  }

  public void setId(final Long id) {
    this.id = id;
  }

  public @NotBlank @Size(max = 120) String getName() {
    return name;
  }

  public void setName(@NotBlank @Size(max = 120) final String name) {
    this.name = name;
  }

  public @NotBlank @Size(max = 120) @Email String getEmail() {
    return email;
  }

  public void setEmail(@NotBlank @Size(max = 120) @Email final String email) {
    this.email = email;
  }

  public @NotBlank @Size(max = 60) String getUsername() {
    return username;
  }

  public void setUsername(@NotBlank @Size(max = 60) final String username) {
    this.username = username;
  }

  public @Size(max = 120) String getPassword() {
    return password;
  }

  public void setPassword(@Size(max = 120) final String password) {
    this.password = password;
  }

  public GoogleUserEntity getGoogleUser() {
    return googleUser;
  }

  public void setGoogleUser(final GoogleUserEntity googleUser) {
    this.googleUser = googleUser;
  }

  public GitHubUserEntity getGithubUser() {
    return githubUser;
  }

  public void setGithubUser(final GitHubUserEntity githubUser) {
    this.githubUser = githubUser;
  }

  public LocalDate getCredentialsExpiryDate() {
    return credentialsExpiryDate;
  }

  public void setCredentialsExpiryDate(final LocalDate credentialsExpiryDate) {
    this.credentialsExpiryDate = credentialsExpiryDate;
  }

  public LocalDate getAccountExpiryDate() {
    return accountExpiryDate;
  }

  public void setAccountExpiryDate(final LocalDate accountExpiryDate) {
    this.accountExpiryDate = accountExpiryDate;
  }

  public @NotBlank @Size(max = 10) String getSignUpMethod() {
    return signUpMethod;
  }

  public void setSignUpMethod(@NotBlank @Size(max = 10) final String signUpMethod) {
    this.signUpMethod = signUpMethod;
  }

  public @Size(max = 30) String getMfaSecret() {
    return mfaSecret;
  }

  public void setMfaSecret(@Size(max = 30) final String mfaSecret) {
    this.mfaSecret = mfaSecret;
  }

  public boolean isMfaEnabled() {
    return mfaEnabled;
  }

  public void setMfaEnabled(final boolean mfaFactorEnabled) {
    this.mfaEnabled = mfaFactorEnabled;
  }

  public boolean isAccountNonLocked() {
    return accountNonLocked;
  }

  public void setAccountNonLocked(final boolean accountNonLocked) {
    this.accountNonLocked = accountNonLocked;
  }

  public boolean isAccountNonExpired() {
    return accountNonExpired;
  }

  public void setAccountNonExpired(final boolean accountNonExpired) {
    this.accountNonExpired = accountNonExpired;
  }

  public boolean isCredentialsNonExpired() {
    return credentialsNonExpired;
  }

  public void setCredentialsNonExpired(final boolean credentialsNonExpired) {
    this.credentialsNonExpired = credentialsNonExpired;
  }

  public boolean isEnabled() {
    return enabled;
  }

  public void setEnabled(final boolean enabled) {
    this.enabled = enabled;
  }

  public Set<RoleEntity> getRoles() {
    return roles;
  }

  public void addRole(final RoleEntity role) {
    roles.add(role);
  }
}
