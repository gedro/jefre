package org.jefree.mailer.google;

import org.springframework.mail.SimpleMailMessage;

public interface EmailService {
  boolean sendEmail(final SimpleMailMessage message);
}
