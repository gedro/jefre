package org.jefree.mailer.google;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(value = "gmail-client", url = "https://www.googleapis.com")
public interface GmailApiClient {

  @PostMapping("/oauth2/v4/token")
  GoogleTokenResponse getRefreshToken(final GmailCredential gmailCredential);

}
