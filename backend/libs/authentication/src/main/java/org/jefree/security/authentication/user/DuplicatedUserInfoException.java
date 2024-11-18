package org.jefree.security.authentication.user;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

// The reason is not sent back in the error response
@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Duplicated user information")
public class DuplicatedUserInfoException extends RuntimeException {

  public DuplicatedUserInfoException(final String message) {
    super(message);
  }
}
