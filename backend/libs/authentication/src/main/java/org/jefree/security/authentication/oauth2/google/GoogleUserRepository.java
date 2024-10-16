package org.jefree.security.authentication.oauth2.google;

import org.jefree.security.authentication.oauth2.OAuthUserRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GoogleUserRepository extends OAuthUserRepository<GoogleUserEntity> {
}
