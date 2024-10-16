package org.jefree.security.authentication.oauth2.github;

import org.jefree.security.authentication.oauth2.OAuthUserRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GitHubUserRepository extends OAuthUserRepository<GitHubUserEntity> {

}
