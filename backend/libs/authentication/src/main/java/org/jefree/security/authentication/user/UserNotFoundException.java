package org.jefree.security.authentication.user;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

// The reason is not sent back in the error response
@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "User not found")
public class UserNotFoundException extends RuntimeException {

  public UserNotFoundException(final String message) {
    super(message);
  }
}
