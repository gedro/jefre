package org.jefree.auth;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.web.util.UrlUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

public class UserTypeRegistrationFilter extends OncePerRequestFilter {

  private static final Logger logger = LoggerFactory.getLogger(UserTypeRegistrationFilter.class);

  /**
   * Same contract as for {@code doFilter}, but guaranteed to be
   * just invoked once per request within a single request thread.
   * See {@link #shouldNotFilterAsyncDispatch()} for details.
   * <p>Provides HttpServletRequest and HttpServletResponse arguments instead of the
   * default ServletRequest and ServletResponse ones.
   *
   * @param request
   * @param response
   * @param filterChain
   */
  @Override
  protected void doFilterInternal(
    final HttpServletRequest request, final HttpServletResponse response, final FilterChain filterChain
  ) throws ServletException, IOException {
    try {
      UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(UrlUtils.buildFullRequestUrl(request))
        .replacePath(request.getContextPath())
        .replaceQuery(null)
        .fragment(null)
        .build();
      logger.error("****************************************************************************{}", uriComponents);
      logger.error("****************************************************************************{}", request.getHeader("X-Forwarded-Proto"));
      logger.error("****************************************************************************{}", request.getHeader("X-Forwarded-Port"));

      final String registrationType = request.getParameter("registrationType");
      if(registrationType != null) {
        request.getSession().setAttribute("registrationType", registrationType);
      }
    } finally {
      filterChain.doFilter(request, response);
    }
  }
}
