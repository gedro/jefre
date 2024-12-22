package org.jefree.security.authentication.oauth2;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.jefree.security.authentication.user.UserEntity;

public interface OAuthEntity {
  Long getId();

  @NotBlank @Size(max = 120) @Email String getEmail();

  @NotBlank @Size(max = 60) String getUsername();

  String getName();

  @NotBlank @Size(max = 40) String getExternalId();

  UserEntity getRegisteredUser();

  default Long getRegisteredUserId() {
    final UserEntity user = getRegisteredUser();
    return user == null ? null : user.getId();
  }

  void setRegisteredUser(final UserEntity registeredUser);
}
