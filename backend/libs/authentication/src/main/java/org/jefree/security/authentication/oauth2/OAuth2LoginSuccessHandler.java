package org.jefree.security.authentication.oauth2;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jefree.security.authentication.jwt.JwtService;
import org.jefree.security.authentication.user.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Component
public class OAuth2LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

  private final OAuth2UserService oAuth2UserService;
  private final JwtService jwtService;
  private final String frontendUrl;

  public OAuth2LoginSuccessHandler(
    final OAuth2UserService oAuth2UserService,
    final JwtService jwtService,
    @Value("${app.frontend-url}") final String frontendUrl
  ) {
    this.oAuth2UserService = oAuth2UserService;
    this.jwtService = jwtService;
    this.frontendUrl = frontendUrl;
  }

  /**
   * @param request        the request which caused the successful authentication 
   * @param response       the response
   * @param authentication the <tt>Authentication</tt> object which was created during
   *                       the authentication process.
   * @throws ServletException
   * @throws IOException
   */
  @Override
  public void onAuthenticationSuccess(
    final HttpServletRequest request, final HttpServletResponse response, final Authentication authentication
  ) throws ServletException, IOException {
    if(authentication instanceof OAuth2AuthenticationToken oAuth2Token) {
      final User user = oAuth2UserService.saveUserIfNotExists(oAuth2Token);
      if(user != null) {
        final String jwtToken = jwtService.generateToken(user);

        jwtService.storeJwtUserToSecurityContext(user, request);

        final String targetUrl = UriComponentsBuilder.fromUriString(frontendUrl + "/oauth2/redirect")
          .queryParam("token", jwtToken)
          .build().toUriString();

        super.setDefaultTargetUrl(targetUrl);
      }
    }

    super.onAuthenticationSuccess(request, response, authentication);
  }
}
