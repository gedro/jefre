package org.jefree.mailer;

import org.jefree.mailer.google.EmailService;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@ConditionalOnMissingBean(EmailService.class)
@Service
public class SimpleEmailService implements EmailService {

  private final JavaMailSender mailSender;

  public SimpleEmailService(final JavaMailSender mailSender) {
    this.mailSender = mailSender;
  }

  @Override
  public boolean sendEmail(final SimpleMailMessage message) {
    mailSender.send(message);
    return true;
  }
}
