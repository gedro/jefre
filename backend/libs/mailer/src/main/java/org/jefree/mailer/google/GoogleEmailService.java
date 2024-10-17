package org.jefree.mailer.google;

import com.google.api.client.auth.oauth2.BearerToken;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.auth.oauth2.TokenResponse;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.Session;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Properties;

@Primary
@Service
public class GoogleEmailService implements EmailService {

  private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();

  private final String clientId;
  private final String secretKey;
  private final String refreshToken;
  private final String fromEmail;
  private final GmailApiClient gmailApiClient;
  private final NetHttpTransport httpTransport;
  private GmailCredential gmailCredential;

  public GoogleEmailService(
    @Value("${libs.mailer.google.client-id}") final String clientId,
    @Value("${libs.mailer.google.client-secret}") final String secretKey,
    @Value("${libs.mailer.google.refresh-token}") final String refreshToken,
    @Value("${libs.mailer.google.from-email}") final String fromEmail,
    final GmailApiClient gmailApiClient
  ) throws GeneralSecurityException, IOException {

    this.clientId = clientId;
    this.secretKey = secretKey;
    this.refreshToken = refreshToken;
    this.fromEmail = fromEmail;
    this.gmailApiClient = gmailApiClient;
    this.httpTransport = GoogleNetHttpTransport.newTrustedTransport();
    this.gmailCredential = new GmailCredential(
      clientId, secretKey, refreshToken, null, null, fromEmail
    );

  }

  @Override
  public boolean sendEmail(final SimpleMailMessage message) {
    final TokenResponse tokenResponse = refreshAccessToken();

    try {
      final Message gmailMessage = createMessageWithEmail(createEmail(message));

      return createGmail(tokenResponse)
        .users()
        .messages()
        .send(gmailCredential.userEmail(), gmailMessage)
        .execute()
        .getLabelIds()
        .contains("SENT");
    } catch (final Exception e) {
      throw new RuntimeException("Failed to send email", e);
    }
  }

  private Gmail createGmail(final TokenResponse tokenResponse) {
    final Credential credential = authorize(tokenResponse);
    return new Gmail.Builder(httpTransport, JSON_FACTORY, credential)
      .setApplicationName("JEFREE")
      .build();
  }

  private MimeMessage createEmail(final SimpleMailMessage message) throws MessagingException {

    final MimeMessage email = new MimeMessage(Session.getDefaultInstance(new Properties(), null));
    email.setFrom(new InternetAddress(fromEmail));
    email.addRecipient(jakarta.mail.Message.RecipientType.TO, new InternetAddress(message.getTo()[0]));
    email.setSubject(message.getSubject());
    email.setText(message.getText());

    return email;

  }

  private Message createMessageWithEmail(final MimeMessage emailContent) throws MessagingException, IOException {
    final ByteArrayOutputStream buffer = new ByteArrayOutputStream();
    emailContent.writeTo(buffer);

    return new Message().setRaw(Base64.encodeBase64URLSafeString(buffer.toByteArray()));
  }

  private Credential authorize(final TokenResponse tokenResponse) {
    try {
      return new Credential(BearerToken.authorizationHeaderAccessMethod()).setFromTokenResponse(tokenResponse);
    } catch (final Exception e) {
      throw new RuntimeException("Failed to authorize", e);
    }
  }

  private TokenResponse refreshAccessToken() {
    final GmailCredential gmailCredentialsDto = new GmailCredential(
      clientId, secretKey, refreshToken, "refresh_token", null, null
    );

    final HttpEntity<GmailCredential> entity = new HttpEntity<>(gmailCredentialsDto);
    try {
      final GoogleTokenResponse response = gmailApiClient.getRefreshToken(gmailCredentialsDto);

      gmailCredential = new GmailCredential(
        clientId, secretKey, refreshToken, null, response.getAccessToken(), fromEmail
      );

      return response;

    } catch (final Exception e) {
      throw new RuntimeException("Failed to refresh access token", e);
    }
  }
}
