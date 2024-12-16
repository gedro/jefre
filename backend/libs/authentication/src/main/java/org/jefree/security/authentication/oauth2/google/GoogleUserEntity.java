package org.jefree.security.authentication.oauth2.google;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.jefree.security.audit.AuditableEntity;
import org.jefree.security.authentication.oauth2.OAuthEntity;
import org.jefree.security.authentication.user.UserEntity;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;

import java.util.Optional;

@Entity(name = "GoogleUser")
@Table(name = "google_user", indexes = {
    @Index(columnList = "external_id", unique = true)
  },
  uniqueConstraints = {
    @UniqueConstraint(columnNames = "username"),
    @UniqueConstraint(columnNames = "email"),
    @UniqueConstraint(columnNames = "external_id"),
    @UniqueConstraint(columnNames = "registered_user_id")
  }
)
public class GoogleUserEntity extends AuditableEntity<String> implements OAuthEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", updatable = false)
  private Long id;

  @NotBlank
  @Size(max = 120)
  @Email
  @Column(name="email", length = 120, updatable = false)
  private String email;

  @NotBlank
  @Size(max = 60)
  @Column(name="username", length = 60, updatable = false)
  private String username;

  @NotBlank
  @Size(max = 120)
  @Column(name="name", length = 120, updatable = false)
  private String name;

  @Size(max = 60)
  @Column(name="given_name", length = 60, updatable = false)
  private String givenName;

  @Size(max = 60)
  @Column(name="family_name", length = 60, updatable = false)
  private String familyName;

  @Size(max = 1000)
  @Column(name="image_url", length = 1000, updatable = false)
  private String imageUrl;

  @NotBlank
  @Size(max = 40)
  @Column(name="external_id", length = 40, updatable = false)
  private String externalId;

  @Column(name="email_verified", updatable = false)
  private boolean emailVerified;

  @OneToOne(optional = true, cascade = CascadeType.REFRESH)
  @JoinColumn(name = "registered_user_id", referencedColumnName = "id")
  private UserEntity registeredUser;



  public static GoogleUserEntity createFrom(final DefaultOAuth2User principal) {
    final GoogleUserEntity entity = new GoogleUserEntity();

    entity.email = principal.getAttribute("email");
    entity.username = Optional.ofNullable(entity.email).map(email -> email.split("@")[0]).orElse(null);
    entity.name = principal.getAttribute("name");
    entity.givenName = principal.getAttribute("given_name");
    entity.familyName = principal.getAttribute("family_name");
    entity.imageUrl = principal.getAttribute("picture");
    entity.externalId = principal.getAttribute("sub");
    entity.emailVerified = "true".equals(principal.getAttribute("email_verified"));

    return entity;
  }

  @Override
  public Long getId() {
    return id;
  }

  @Override
  public @NotBlank @Size(max = 120) @Email String getEmail() {
    return email;
  }

  @Override
  public @NotBlank @Size(max = 60) String getUsername() {
    return username;
  }

  @Override
  public @NotBlank @Size(max = 120) String getName() {
    return name;
  }

  public @Size(max = 1000) String getImageUrl() {
    return imageUrl;
  }

  @Override
  public @NotBlank @Size(max = 40) String getExternalId() {
    return externalId;
  }

  @Override
  public UserEntity getRegisteredUser() {
    return registeredUser;
  }

  @Override
  public void setRegisteredUser(final UserEntity registeredUser) {
    this.registeredUser = registeredUser;
  }
}
