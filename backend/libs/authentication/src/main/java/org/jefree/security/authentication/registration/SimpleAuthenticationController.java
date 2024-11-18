package org.jefree.security.authentication.registration;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.jefree.security.MessageResponse;
import org.jefree.security.authentication.jwt.JwtService;
import org.jefree.security.authentication.user.DuplicatedUserInfoException;
import org.jefree.security.authentication.user.User;
import org.jefree.security.authentication.user.UserService;
import org.jefree.security.authorization.annotation.Public;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class SimpleAuthenticationController {

  private final UserService userService;
  private final JwtService jwtService;

  public SimpleAuthenticationController(
    final UserService userService,
    final JwtService jwtService
  ) {
    this.userService = userService;
    this.jwtService = jwtService;
  }

  @Public
  @GetMapping
  public ResponseEntity<?> statusCheck() {
    return ResponseEntity.ok("READY");
  }

  @Public
  @PostMapping("/public/auth/signin")
  public ResponseEntity<AuthResponse> login(
    @Valid @RequestBody final LoginRequest loginRequest, final HttpServletRequest request
  ) {
    final Optional<User> userOptional = userService.validUsernameOrEmailAndPassword(
      loginRequest.getUsername(), loginRequest.getPassword()
    );
    if (userOptional.isEmpty()) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    final User user = userOptional.get();
    final String token = jwtService.generateNewJwtAndStoreToSecurityContext(user, request);

    return ResponseEntity.ok(new AuthResponse(user.getId(), user.getName(), user.getRoles(), token));
  }

  @Public
  @ResponseStatus(HttpStatus.CREATED)
  @PostMapping("/public/auth/signup")
  public ResponseEntity<MessageResponse> signUp(@Valid @RequestBody final SignupRequest request) {
    if (
      userService.hasUserWithUsername(request.getUsername()) &&
      userService.validUsernameOrEmailAndPassword(request.getUsername(), request.getPassword()).isEmpty()
    ) {
      throw new DuplicatedUserInfoException(
        String.format("Username %s has already been used", request.getUsername())
      );
    }
    if (
      userService.hasUserWithEmail(request.getEmail()) &&
      userService.validUsernameOrEmailAndPassword(request.getEmail(), request.getPassword()).isEmpty()
    ) {
      throw new DuplicatedUserInfoException(
        String.format("Email %s has already been used", request.getEmail())
      );
    }

    if(!userService.getUserByUsername(request.getUsername()).equals(userService.getUserByEmail(request.getEmail()))) {
      throw new DuplicatedUserInfoException(
        String.format("Username %s or Email %s has already been used", request.getUsername(), request.getEmail())
      );
    }

    userService.saveUser(createUser(request), request.getPassword());

    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }

  private User.UserBuilder createUser(@Valid final SignupRequest signUpRequest) {
    return User.builder(null, signUpRequest.getUsername(), signUpRequest.getEmail())
      .name(signUpRequest.getName());
  }

  @Public
  @PostMapping("/public/auth/forgot-password")
  public ResponseEntity<MessageResponse> forgotPassword(@RequestParam final String email) {
    try {
      userService.generatePasswordResetToken(email);
      return ResponseEntity.ok(new MessageResponse("Password reset email sent!"));
    } catch (final Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(new MessageResponse("Error sending password reset email"));
    }
  }

  @Public
  @PostMapping("/public/auth/reset-password")
  public ResponseEntity<?> resetPassword(@RequestParam final String token, @RequestParam final String newPassword) {
    try {
      userService.resetPassword(token, newPassword);
      return ResponseEntity.ok(new MessageResponse("Password reset successful"));
    } catch (final Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse(e.getMessage()));
    }
  }

}
