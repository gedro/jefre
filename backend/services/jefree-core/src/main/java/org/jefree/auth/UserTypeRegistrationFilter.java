package org.jefree.auth;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class UserTypeRegistrationFilter extends OncePerRequestFilter {

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
      final String registrationType = request.getParameter("registrationType");
      if(registrationType != null) {
        request.getSession().setAttribute("registrationType", registrationType);
      }
    } finally {
      filterChain.doFilter(request, response);
    }
  }
}
