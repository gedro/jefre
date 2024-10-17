package org.jefree.mailer.google;

public record GmailCredential(

  String client_id,
  String client_secret,
  String refresh_token,
  String grant_type,
  String access_token,
  String userEmail

) {

}
