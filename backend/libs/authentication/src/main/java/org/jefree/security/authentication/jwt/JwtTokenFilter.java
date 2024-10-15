package org.jefree.security.authentication.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtTokenFilter extends OncePerRequestFilter {

  private static final Logger logger = LoggerFactory.getLogger(JwtTokenFilter.class);

  private final JwtService jwtService;

  public JwtTokenFilter(final JwtService jwtService) {
    this.jwtService = jwtService;
  }

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

      jwtService
        .getValidatedJwtClaimsFrom(request)
        .map(jwtService::extractUserDetails)
        .ifPresent(user -> jwtService.storeJwtUserToSecurityContext(user, request));

    } catch (final Exception e) {
      logger.error("Cannot set user authentication: {}", e.getMessage(), e);
    }

    filterChain.doFilter(request, response);
  }
}
