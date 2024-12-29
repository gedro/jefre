package org.jefree.security.authentication.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(value = "/api/user", produces = MediaType.APPLICATION_JSON_VALUE)
@PreAuthorize("hasRole('USER')")
public class UserController {

  private final UserService userService;

  public UserController(final UserService userService) {
    this.userService = userService;
  }

  @GetMapping
  public ResponseEntity<User> getUserDetails(@AuthenticationPrincipal final User user) {
    return ResponseEntity.ok().body(user);
  }

  @PutMapping("/password")
  public ResponseEntity<String> updatePassword(
    @AuthenticationPrincipal final User user,
    @RequestParam("old_password") final String oldPassword,
    @RequestParam("new_password") final String newPassword,
    @RequestParam("new_password_confirmation") final String newPasswordConfirmation
  ) {
    try {
      if(!StringUtils.hasLength(oldPassword) || !StringUtils.hasLength(newPassword)) {
        throw new RuntimeException("Password cannot be empty");
      }

      if(!newPassword.equals(newPasswordConfirmation)) {
        throw new RuntimeException("Passwords do not match");
      }

      final Optional<User> optionalUser = userService
        .validUsernameOrEmailAndPassword(user.getUsername(), oldPassword);

      if(optionalUser.isPresent()) {
        userService.updatePassword(user.getId(), newPassword);
        return ResponseEntity.ok("Password updated");
      } else {
        throw new RuntimeException("Invalid password");
      }
    } catch (final RuntimeException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
  }
}
