package org.jefree.security.authentication.user;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/user", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

  @GetMapping
  public ResponseEntity<User> getUserDetails(@AuthenticationPrincipal final User user) {
    return ResponseEntity.ok().body(user);
  }
}
