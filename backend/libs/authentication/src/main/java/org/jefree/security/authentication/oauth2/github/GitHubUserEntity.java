package org.jefree.security.authentication.oauth2.github;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.jefree.security.audit.AuditableEntity;
import org.jefree.security.authentication.oauth2.OAuthEntity;
import org.jefree.security.authentication.user.UserEntity;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;

import java.util.Optional;

@Entity(name = "GitHubUser")
@Table(name = "github_user", indexes = {
    @Index(columnList = "external_id", unique = true)
  },
  uniqueConstraints = {
    @UniqueConstraint(columnNames = "username"),
    @UniqueConstraint(columnNames = "email"),
    @UniqueConstraint(columnNames = "external_id"),
    @UniqueConstraint(columnNames = "registered_user_id")
  }
)
public class GitHubUserEntity extends AuditableEntity<String> implements OAuthEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", updatable = false)
  private Long id;

  @NotBlank
  @Size(max = 60)
  @Column(name="username", length = 60, updatable = false)
  private String username;

  @NotBlank
  @Size(max = 40)
  @Column(name="external_id", length = 40, updatable = false)
  private String externalId;

  @Size(max = 1000)
  @Column(name="avatar_url", length = 1000, updatable = false)
  private String avatarUrl;

  @Size(max = 60)
  @Column(name="gravatar_id", length = 60, updatable = false)
  private String gravatarId;

  @NotBlank
  @Size(max = 200)
  @Column(name="github_api_url", length = 200, updatable = false)
  private String githubApiUrl;

  @NotBlank
  @Size(max = 20)
  @Column(name="type", length = 20, updatable = false)
  private String type;

  @Column(name="site_admin", updatable = false)
  private Boolean siteAdmin;

  @NotBlank
  @Size(max = 120)
  @Column(name="name", length = 120, updatable = false)
  private String name;

  @Size(max = 120)
  @Column(name="company", length = 120, updatable = false)
  private String company;

  @Size(max = 1000)
  @Column(name="blog", length = 1000, updatable = false)
  private String blog;

  @Size(max = 1000)
  @Column(name="location", length = 1000, updatable = false)
  private String location;

  @Size(max = 120)
  @Email
  @Column(name="email", length = 120, updatable = false)
  private String email;

  @Column(name="hireable", updatable = false)
  private Boolean hireable;

  @Size(max = 1000)
  @Column(name="bio", length = 1000, updatable = false)
  private String bio;

  @Size(max = 60)
  @Column(name="twitter_username", length = 60, updatable = false)
  private String twitterUsername;

  @Size(max = 120)
  @Email
  @Column(name="notification_email", length = 120, updatable = false)
  private String notificationEmail;

  @Column(name="account_created_at", updatable = false)
  private String createdAt;

  @Column(name="two_factor_authentication", updatable = false)
  private Boolean twoFactorAuthentication;

  @OneToOne(optional = true, cascade = CascadeType.REFRESH)
  @JoinColumn(name = "registered_user_id", referencedColumnName = "id")
  private UserEntity registeredUser;

  public static GitHubUserEntity createFrom(final DefaultOAuth2User principal) {
    return createFrom(principal, null);
  }

  public static GitHubUserEntity createFrom(final DefaultOAuth2User principal, final String foundEmail) {
    final GitHubUserEntity entity = new GitHubUserEntity();

    entity.username = principal.getAttribute("login");
    entity.externalId = Optional.ofNullable(principal.getAttribute("id")).map(Object::toString).orElseThrow();
    entity.avatarUrl = principal.getAttribute("avatar_url");
    entity.gravatarId = principal.getAttribute("gravatar_id");
    entity.githubApiUrl = principal.getAttribute("url");
    entity.type = principal.getAttribute("type");
    entity.siteAdmin = principal.getAttribute("site_admin");
    entity.name = principal.getAttribute("name");
    entity.company = principal.getAttribute("company");
    entity.blog = principal.getAttribute("blog");
    entity.location = principal.getAttribute("location");
    entity.email = principal.getAttribute("email");
    entity.hireable = principal.getAttribute("hireable");
    entity.bio = principal.getAttribute("bio");
    entity.twitterUsername = principal.getAttribute("twitter_username");
    entity.notificationEmail = principal.getAttribute("notification_email");
    entity.createdAt = principal.getAttribute("created_at");
    entity.twoFactorAuthentication = principal.getAttribute("two_factor_authentication");

    if(entity.email == null || entity.email.isBlank()) {
      if(entity.notificationEmail != null && !entity.notificationEmail.isBlank()) {
        entity.email = entity.notificationEmail;
      } else if(foundEmail != null && !foundEmail.isBlank()) {
        entity.email = foundEmail;
      }
    }

    return entity;
  }

  @Override
  public Long getId() {
    return id;
  }

  @Override
  public @NotBlank @Size(max = 60) String getUsername() {
    return username;
  }

  @Override
  public @NotBlank @Size(max = 40) String getExternalId() {
    return externalId;
  }

  public @NotBlank @Size(max = 200) String getGithubApiUrl() {
    return githubApiUrl;
  }

  @Override
  public @NotBlank @Size(max = 120) String getName() {
    return name;
  }

  @Override
  public @Size(max = 120) @Email String getEmail() {
    return email;
  }

  public @Size(max = 120) @Email String getNotificationEmail() {
    return notificationEmail;
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
