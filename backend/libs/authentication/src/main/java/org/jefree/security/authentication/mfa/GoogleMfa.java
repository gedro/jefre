package org.jefree.security.authentication.mfa;

import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.GoogleAuthenticatorKey;
import com.warrenstrange.googleauth.GoogleAuthenticatorQRGenerator;
import org.springframework.stereotype.Service;

@Service
public class GoogleMfa {

  private final GoogleAuthenticator authenticator;

  public GoogleMfa(final GoogleAuthenticator authenticator) {
    this.authenticator = authenticator;
  }

  public GoogleMfa() {
    this.authenticator = new GoogleAuthenticator();
  }

  public GoogleAuthenticatorKey generateSecret() {
    return authenticator.createCredentials();
  }

  public String getQrCodeUrl(final GoogleAuthenticatorKey secret, final String username) {
    return GoogleAuthenticatorQRGenerator.getOtpAuthURL("JEFREE", username, secret);
  }

  public boolean verifyCode(final String secret, final int code) {
    return authenticator.authorize(secret, code);
  }
}
