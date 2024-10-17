package org.jefree.security.authentication.user;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import net.minidev.json.annotate.JsonIgnore;
import org.jefree.security.authorization.annotation.IsAdminOrMe;
import org.jefree.security.authorization.annotation.Mask;
import org.jefree.security.authorization.annotation.MaskEmailWhenAuthZDenied;
import org.jefree.security.authorization.annotation.ReturnNullWhenAuthZDenied;
import org.jefree.security.authorization.role.RoleEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.function.Function;

@JsonIgnoreProperties("authorities")
@IsAdminOrMe
public class User extends org.springframework.security.core.userdetails.User {

  private final Long id;
  private final String email;
  private final String name;
  private final boolean mfaEnabled;
  private final List<String> roles;

  public User (
    final Long id, final String username, final String email, final String name, final String password,
    final Collection<? extends GrantedAuthority> authorities
  ) {
    this(
      id, username, email, password, name,
      true, true, true, true, false,
      authorities
    );
  }

  public User (
    final Long id, final String username, final String email, final String name, final String password,
    final boolean enabled, final boolean accountNonExpired, final boolean credentialsNonExpired,
    final boolean accountNonLocked, final boolean mfaEnabled,
    final Collection<? extends GrantedAuthority> authorities
  ) {
    super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
    Assert.isTrue(
      email != null && !email.isEmpty(),
      "Cannot pass null or empty values to constructor"
    );

    this.id = id;
    this.email = email;
    this.name = name;
    this.mfaEnabled = mfaEnabled;
    this.roles = getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
  }

  @ReturnNullWhenAuthZDenied
  public Long getId() {
    return id;
  }

  @MaskEmailWhenAuthZDenied
  public String getEmail() {
    return email;
  }

  @ReturnNullWhenAuthZDenied
  public String getName() {
    return name;
  }

  @ReturnNullWhenAuthZDenied
  public boolean isMfaEnabled() {
    return mfaEnabled;
  }

  @JsonIgnore
  @ReturnNullWhenAuthZDenied
  @Override
  public Collection<GrantedAuthority> getAuthorities() {
    return super.getAuthorities();
  }

  @ReturnNullWhenAuthZDenied
  public List<String> getRoles() {
    return roles;
  }

  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  @Mask("*****")
  @Override
  public String getPassword() {
    return super.getPassword();
  }

  @Override
  public String toString() {
    final StringBuilder sb = new StringBuilder();
    sb.append(super.toString()).append(", ");;
    sb.append("Id=").append(this.getId()).append(", ");
    sb.append("Email=").append(this.getEmail()).append(", ");
    sb.append("Name=").append(this.getName()).append(", ");
    sb.append("MFA Enabled=").append(this.isMfaEnabled()).append(", ");
    return sb.toString();
  }

  /**
   * Returns the hashcode of the {@code username}.
   */
  @Override
  public int hashCode() {
    return this.getId().hashCode() + this.getUsername().hashCode() + this.getEmail().hashCode();
  }

  /**
   * Returns {@code true} if the supplied object is a {@code User} instance with the
   * same {@code username} value.
   * <p>
   * In other words, the objects are equal if they have the same username, representing
   * the same principal.
   *
   * @param obj
   */
  @Override
  public boolean equals(final Object obj) {
    if (obj instanceof User user) {
      return
        this.getId().equals(user.getId()) &&
        this.getUsername().equals(user.getUsername()) &&
        this.getEmail().equals(user.getEmail());
    }
    return false;
  }

  public static UserBuilder builder(final UserEntity userEntity) {
    return builder(userEntity.getId(), userEntity.getUsername(), userEntity.getEmail())
      .name(userEntity.getName())
      .password(userEntity.getPassword())
      .credentialsExpired(!userEntity.isCredentialsNonExpired())
      .accountExpired(!userEntity.isAccountNonExpired())
      .accountLocked(!userEntity.isAccountNonLocked())
      .disabled(!userEntity.isEnabled())
      .mfaEnabled(userEntity.isMfaEnabled())
      .authorities(userEntity.getRoles().stream().map(RoleEntity::getName).toArray(String[]::new));
  }

  /**
   * Creates a UserBuilder
   * @return the UserBuilder
   */
  public static UserBuilder builder(final Long id, final String username, final String email) {
    return new UserBuilder()
      .id(id)
      .username(username)
      .email(email);
  }

  public static final class UserBuilder {

    private Long id;

    private String username;

    private String email;

    private String name;

    private String password = "";

    private List<GrantedAuthority> authorities = new ArrayList<>();

    private boolean accountExpired = false;

    private boolean accountLocked = false;

    private boolean credentialsExpired = false;

    private boolean disabled = false;

    private boolean mfaEnabled = false;

    private Function<String, String> passwordEncoder = (password) -> password;

    /**
     * Creates a new instance
     */
    private UserBuilder() {
    }

    /**
     * Populates the id. This attribute is required.
     * @param id the user id. Cannot be null.
     * @return the {@link UserBuilder} for method chaining (i.e. to populate
     * additional attributes for this user)
     */
    public UserBuilder id(final Long id) {
      this.id = id;
      return this;
    }

    /**
     * Populates the username. This attribute is required.
     * @param username the username. Cannot be null.
     * @return the {@link UserBuilder} for method chaining (i.e. to populate
     * additional attributes for this user)
     */
    public UserBuilder username(final String username) {
      Assert.notNull(username, "username cannot be null");
      this.username = username;
      return this;
    }

    /**
     * Populates the email. This attribute is required.
     * @param email the email. Cannot be null.
     * @return the {@link UserBuilder} for method chaining (i.e. to populate
     * additional attributes for this user)
     */
    public UserBuilder email(final String email) {
      Assert.notNull(email, "email cannot be null");
      this.email = email;
      return this;
    }

    public UserBuilder name(final String name) {
      this.name = name;
      return this;
    }

    /**
     * Populates the password. This attribute is required.
     * @param password the password. Cannot be null.
     * @return the {@link UserBuilder} for method chaining (i.e. to populate
     * additional attributes for this user)
     */
    public UserBuilder password(final String password) {
      Assert.notNull(password, "password cannot be null");
      this.password = password;
      return this;
    }

    /**
     * Encodes the current password (if non-null) and any future passwords supplied to
     * {@link #password(String)}.
     * @param encoder the encoder to use
     * @return the {@link UserBuilder} for method chaining (i.e. to populate
     * additional attributes for this user)
     */
    public UserBuilder passwordEncoder(final Function<String, String> encoder) {
      Assert.notNull(encoder, "encoder cannot be null");
      this.passwordEncoder = encoder;
      return this;
    }

    /**
     * Populates the roles. This method is a shortcut for calling
     * {@link #authorities(String...)}, but automatically prefixes each entry with
     * "ROLE_". This means the following:
     *
     * <code>
     *     builder.roles("USER","ADMIN");
     * </code>
     *
     * is equivalent to
     *
     * <code>
     *     builder.authorities("ROLE_USER","ROLE_ADMIN");
     * </code>
     *
     * <p>
     * This attribute is required, but can also be populated with
     * {@link #authorities(String...)}.
     * </p>
     * @param roles the roles for this user (i.e. USER, ADMIN, etc). Cannot be null,
     * contain null values or start with "ROLE_"
     * @return the {@link UserBuilder} for method chaining (i.e. to populate
     * additional attributes for this user)
     */
    public UserBuilder roles(final String... roles) {
      final List<GrantedAuthority> authorities = new ArrayList<>(roles.length);
      for (final String role : roles) {
        Assert.isTrue(
          !role.startsWith("ROLE_"),
          () -> role + " cannot start with ROLE_ (it is automatically added)"
        );
        authorities.add(new SimpleGrantedAuthority("ROLE_" + role));
      }
      return authorities(authorities);
    }

    /**
     * Populates the authorities. This attribute is required.
     * @param authorities the authorities for this user. Cannot be null, or contain
     * null values
     * @return the {@link UserBuilder} for method chaining (i.e. to populate
     * additional attributes for this user)
     * @see #roles(String...)
     */
    public UserBuilder authorities(final GrantedAuthority... authorities) {
      Assert.notNull(authorities, "authorities cannot be null");
      return authorities(Arrays.asList(authorities));
    }

    /**
     * Populates the authorities. This attribute is required.
     * @param authorities the authorities for this user. Cannot be null, or contain
     * null values
     * @return the {@link UserBuilder} for method chaining (i.e. to populate
     * additional attributes for this user)
     * @see #roles(String...)
     */
    public UserBuilder authorities(final Collection<? extends GrantedAuthority> authorities) {
      Assert.notNull(authorities, "authorities cannot be null");
      this.authorities = new ArrayList<>(authorities);
      return this;
    }

    /**
     * Populates the authorities. This attribute is required.
     * @param authorities the authorities for this user (i.e. ROLE_USER, ROLE_ADMIN,
     * etc). Cannot be null, or contain null values
     * @return the {@link UserBuilder} for method chaining (i.e. to populate
     * additional attributes for this user)
     * @see #roles(String...)
     */
    public UserBuilder authorities(final String... authorities) {
      Assert.notNull(authorities, "authorities cannot be null");
      return authorities(AuthorityUtils.createAuthorityList(authorities));
    }

    /**
     * Defines if the account is expired or not. Default is false.
     * @param accountExpired true if the account is expired, false otherwise
     * @return the {@link UserBuilder} for method chaining (i.e. to populate
     * additional attributes for this user)
     */
    public UserBuilder accountExpired(final boolean accountExpired) {
      this.accountExpired = accountExpired;
      return this;
    }

    /**
     * Defines if the account is locked or not. Default is false.
     * @param accountLocked true if the account is locked, false otherwise
     * @return the {@link UserBuilder} for method chaining (i.e. to populate
     * additional attributes for this user)
     */
    public UserBuilder accountLocked(final boolean accountLocked) {
      this.accountLocked = accountLocked;
      return this;
    }

    /**
     * Defines if the credentials are expired or not. Default is false.
     * @param credentialsExpired true if the credentials are expired, false otherwise
     * @return the {@link UserBuilder} for method chaining (i.e. to populate
     * additional attributes for this user)
     */
    public UserBuilder credentialsExpired(final boolean credentialsExpired) {
      this.credentialsExpired = credentialsExpired;
      return this;
    }

    /**
     * Defines if the account is disabled or not. Default is false.
     * @param disabled true if the account is disabled, false otherwise
     * @return the {@link UserBuilder} for method chaining (i.e. to populate
     * additional attributes for this user)
     */
    public UserBuilder disabled(final boolean disabled) {
      this.disabled = disabled;
      return this;
    }

    public UserBuilder mfaEnabled(final boolean mfaEnabled) {
      this.mfaEnabled = mfaEnabled;
      return this;
    }

    public User build() {
      final String encodedPassword = "".equals(password) ? "" : this.passwordEncoder.apply(this.password);
      return new User (
        this.id, this.username, email, name, encodedPassword,
        !this.disabled, !this.accountExpired, !this.credentialsExpired,
        !this.accountLocked, this.mfaEnabled, this.authorities
      );
    }
  }
}
