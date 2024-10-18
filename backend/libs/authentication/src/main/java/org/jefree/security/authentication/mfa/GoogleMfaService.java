package org.jefree.security.authentication.mfa;

import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.GoogleAuthenticatorKey;
import com.warrenstrange.googleauth.GoogleAuthenticatorQRGenerator;
import org.springframework.stereotype.Service;

@Service
public class GoogleMfaService {

  private final GoogleAuthenticator authenticator;

  public GoogleMfaService(final GoogleAuthenticator authenticator) {
    this.authenticator = authenticator;
  }

  public GoogleMfaService() {
    this.authenticator = new GoogleAuthenticator();
  }

  public GoogleAuthenticatorKey generateSecret() {
    return authenticator.createCredentials();
  }

  public String getQrCodeUrl(final GoogleAuthenticatorKey secret, final String email) {
    return GoogleAuthenticatorQRGenerator.getOtpAuthURL("JEFREE", email, secret);
  }

  public boolean verifyCode(final String secret, final int code) {
    return authenticator.authorize(secret, code);
  }
}
