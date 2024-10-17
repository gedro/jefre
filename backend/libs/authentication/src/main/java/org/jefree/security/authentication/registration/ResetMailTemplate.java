package org.jefree.security.authentication.registration;

import org.springframework.mail.SimpleMailMessage;

public class ResetMailTemplate {

  public static SimpleMailMessage compose(final String to, final String resetUrl) {
    final SimpleMailMessage message = new SimpleMailMessage();

    message.setTo(to);
    message.setSubject("Password Reset Request");
    message.setText("Click the link to reset your password: " + resetUrl);

    return message;
  }

}
