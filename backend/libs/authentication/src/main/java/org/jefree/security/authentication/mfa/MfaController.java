package org.jefree.security.authentication.mfa;

import com.warrenstrange.googleauth.GoogleAuthenticatorKey;
import org.jefree.security.authentication.user.User;
import org.jefree.security.authentication.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class MfaController {

  private final static String BASE_PATH = "/api/auth/mfa";

  private final UserService userService;
  private final GoogleMfaService mfaService;

  public MfaController (
    final UserService userService,
    final GoogleMfaService mfaService
  ) {
    this.userService = userService;
    this.mfaService = mfaService;
  }

  @PostMapping(BASE_PATH + "/start")
  public ResponseEntity<String> enableMfa(@AuthenticationPrincipal final User user) {
    final GoogleAuthenticatorKey secret = mfaService.generateSecret();
    userService.storeMfaSecret(user, secret.getKey());

    final String qrCodeUrl = mfaService.getQrCodeUrl(secret, user.getEmail());
    return ResponseEntity.ok(qrCodeUrl);
  }

  @PostMapping(BASE_PATH + "/disable")
  public ResponseEntity<String> disableMfa(@AuthenticationPrincipal final User user) {
    userService.disableMfa(user);
    return ResponseEntity.ok("MFA disabled");
  }

  @PostMapping(BASE_PATH + "/verify")
  public ResponseEntity<String> verify2FA(@AuthenticationPrincipal final User user, @RequestParam final int code) {
    final boolean isValid = mfaService.verifyCode(userService.getMfaSecret(user), code);

    if (isValid) {
      userService.enableMfa(user);
      return ResponseEntity.ok("MFA Verified");
    } else {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid MFA Code");
    }
  }
}
