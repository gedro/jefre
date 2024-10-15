package org.jefree.security.web;

import jakarta.servlet.http.HttpServletRequest;
import org.jefree.security.authorization.annotation.Public;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CsrfController {

  @Public
  @GetMapping("/api/auth/csrf-token")
  public CsrfToken csrfToken(final HttpServletRequest request) {
    return (CsrfToken) request.getAttribute(CsrfToken.class.getName());
  }
}
