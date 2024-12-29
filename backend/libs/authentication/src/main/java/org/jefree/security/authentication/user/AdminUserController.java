package org.jefree.security.authentication.user;

import org.jefree.security.authorization.role.RoleView;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(value = "/api/admin", produces = MediaType.APPLICATION_JSON_VALUE)
@PreAuthorize("hasRole('ADMIN')")
public class AdminUserController {

  private final UserService userService;

  public AdminUserController(final UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/users")
  public ResponseEntity<List<User>> getAllUsers() {
    return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
  }

  @GetMapping("/users/{id}")
  public ResponseEntity<User> getUser(@PathVariable final Long id) {
    return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
  }

  @GetMapping("/roles")
  public List<RoleView> getAllRoles() {
    return userService.getRoles();
  }

  @PutMapping("/users/{id}/roles")
  public ResponseEntity<String> updateUserRoles(
    @PathVariable final Long id, @RequestParam final Set<String> roles
  ) {
    userService.updateRoles(id, roles);
    return ResponseEntity.ok("Roles updated");
  }

  @PutMapping("/users/{id}/locked")
  public ResponseEntity<String> updateAccountLockStatus(
    @PathVariable final Long id, @RequestParam final boolean locked
  ) {
    userService.userLocked(id, locked);
    return ResponseEntity.ok("Account is " + (locked ? "locked" : "unlocked"));
  }

  @PutMapping("/users/{id}/expired")
  public ResponseEntity<String> updateAccountExpiryStatus(
    @PathVariable final Long id, @RequestParam final boolean expired
  ) {
    userService.userAccountExpired(id, expired);
    return ResponseEntity.ok("Account is " + (expired ? "expired" : "not expired"));
  }

  @PutMapping("/users/{id}/enabled")
  public ResponseEntity<String> updateAccountEnabledStatus(
    @PathVariable final Long id, @RequestParam final boolean enabled
  ) {
    userService.userEnabled(id, enabled);
    return ResponseEntity.ok("Account is " + (enabled ? "enabled" : "disabled"));
  }

  @PutMapping("/users/{id}/credentials-expired")
  public ResponseEntity<String> updateCredentialsExpiryStatus(
    @PathVariable final Long id, @RequestParam final boolean expired
  ) {
    userService.userCredentialsExpired(id, expired);
    return ResponseEntity.ok("Credentials are " + (expired ? "expired" : "not expired"));
  }
}
