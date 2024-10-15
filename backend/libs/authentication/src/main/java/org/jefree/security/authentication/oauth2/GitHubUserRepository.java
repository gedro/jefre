package org.jefree.security.authentication.oauth2;

import org.springframework.stereotype.Repository;

@Repository
public interface GitHubUserRepository extends OAuthUserRepository<GitHubUserEntity> {

}
