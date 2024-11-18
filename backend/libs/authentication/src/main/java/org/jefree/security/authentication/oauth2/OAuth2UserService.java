package org.jefree.security.authentication.oauth2;

import jakarta.transaction.Transactional;
import org.jefree.security.authentication.oauth2.github.GitHubClient;
import org.jefree.security.authentication.oauth2.github.GitHubEmailResponse;
import org.jefree.security.authentication.oauth2.github.GitHubUserEntity;
import org.jefree.security.authentication.oauth2.github.GitHubUserRepository;
import org.jefree.security.authentication.oauth2.google.GoogleUserEntity;
import org.jefree.security.authentication.oauth2.google.GoogleUserRepository;
import org.jefree.security.authentication.user.User;
import org.jefree.security.authentication.user.UserEntity;
import org.jefree.security.authentication.user.UserRepository;
import org.jefree.security.authentication.user.UserService;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OAuth2UserService {

  private final OAuth2AuthorizedClientService oAuth2AuthorizedClientService;
  private final GoogleUserRepository googleUserRepository;
  private final GitHubUserRepository gitHubUserRepository;
  private final GitHubClient githubClient;
  //TODO: get rid of repositories and replace them with services
  private final UserRepository userRepository;
  private final UserService userService;

  public OAuth2UserService(
    final OAuth2AuthorizedClientService oAuth2AuthorizedClientService,
    final GoogleUserRepository googleUserRepository,
    final GitHubUserRepository gitHubUserRepository,
    final GitHubClient githubClient,
    final UserRepository userRepository,
    final UserService userService
  ) {
    this.oAuth2AuthorizedClientService = oAuth2AuthorizedClientService;
    this.googleUserRepository = googleUserRepository;
    this.gitHubUserRepository = gitHubUserRepository;
    this.githubClient = githubClient;
    this.userRepository = userRepository;
    this.userService = userService;
  }

  @Transactional(Transactional.TxType.REQUIRES_NEW)
  public User saveUserIfNotExists(final OAuth2AuthenticationToken oAuth2Token) {
    if(oAuth2Token.getPrincipal() instanceof DefaultOAuth2User principal) {

      final UserEntity userEntity;
      switch (oAuth2Token.getAuthorizedClientRegistrationId()) {
        case "github" -> {
          final String foundEmail = lookupGitHubEmail(oAuth2Token);
          userEntity = userService.decorateWithRoles( saveUserIfNotExists(
            GitHubUserEntity.createFrom(principal, foundEmail), gitHubUserRepository, "github", GitHubUserEntity.class
          ));
        }
        case "google" ->
          userEntity = userService.decorateWithRoles( saveUserIfNotExists(
            GoogleUserEntity.createFrom(principal), googleUserRepository, "google", GoogleUserEntity.class
          ));
        default -> throw new IllegalArgumentException(
          "Unknown user type: " + oAuth2Token.getAuthorizedClientRegistrationId()
        );
      }

      return User.builder(userEntity).build();
    }

    return null;
  }

  private String lookupGitHubEmail(final OAuth2AuthenticationToken oAuth2Token) {
    final OAuth2AuthorizedClient client = oAuth2AuthorizedClientService.loadAuthorizedClient(
      oAuth2Token.getAuthorizedClientRegistrationId(), oAuth2Token.getName()
    );

    if(client != null) {
      final OAuth2AccessToken accessToken = client.getAccessToken();
      if(accessToken != null) {
        final List<GitHubEmailResponse> emails = githubClient.getEmails("Bearer " + accessToken.getTokenValue());
        emails.sort(GitHubEmailResponse::compareTo);

        if(!emails.isEmpty()) {
          return emails.getFirst().getEmail();
        }
      }
    }

    return "";
  }

  private <T extends OAuthEntity> UserEntity saveUserIfNotExists(
    final T user, final OAuthUserRepository<T> repository, final String type,  final Class<T> ignoredClazz
  ) {
    final T oAuthUserEntity = repository
      .findByExternalId(user.getExternalId())
      .orElseGet(() -> repository.save(user));

    final UserEntity registeredUser = oAuthUserEntity.getRegisteredUser();
    if(registeredUser != null && registeredUser.getId() != null) {
      //noinspection OptionalGetWithoutIsPresent - checked nullability above
      return userRepository.findById(registeredUser.getId()).get();
    }

    //TODO: move this to the UserService
    final UserEntity userEntity = userRepository
      .findByEmail(user.getEmail())
      .orElseGet(() -> userRepository.save(convertToUserEntity(user, type)));

    oAuthUserEntity.setRegisteredUser(userEntity);
    repository.save(oAuthUserEntity);

    return userEntity;
  }

  private UserEntity convertToUserEntity(final OAuthEntity oAuthUser, final String type) {
    final UserEntity entity = new UserEntity();

    entity.setEmail(oAuthUser.getEmail());
    entity.setUsername(oAuthUser.getUsername());
    entity.setName(oAuthUser.getName());
    entity.setSignUpMethod(type);
    entity.setPassword("");

    return entity;
  }
}
