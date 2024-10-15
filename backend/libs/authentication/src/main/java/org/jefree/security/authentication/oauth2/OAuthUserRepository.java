package org.jefree.security.authentication.oauth2;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.Optional;

@NoRepositoryBean
public interface OAuthUserRepository<T> extends JpaRepository<T, Long> {
  Optional<T> findByExternalId(@NotBlank @Size(max = 40) final String externalId);
}
