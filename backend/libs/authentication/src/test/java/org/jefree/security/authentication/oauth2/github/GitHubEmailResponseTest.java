package org.jefree.security.authentication.oauth2.github;

import org.junit.jupiter.api.Test;

import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;

class GitHubEmailResponseTest {

  @Test
  void compareTo() {
    final GitHubEmailResponse emailResponse1 = new GitHubEmailResponse();
    emailResponse1.setEmail("1");
    emailResponse1.setVerified(true);
    emailResponse1.setPrimary(true);
    emailResponse1.setVisibility("public");

    final GitHubEmailResponse emailResponse2 = new GitHubEmailResponse();
    emailResponse2.setEmail("5");
    emailResponse2.setVerified(false);
    emailResponse2.setPrimary(true);
    emailResponse2.setVisibility("public");

    final GitHubEmailResponse emailResponse3 = new GitHubEmailResponse();
    emailResponse3.setEmail("2");
    emailResponse3.setVerified(true);
    emailResponse3.setPrimary(true);
    emailResponse3.setVisibility("private");

    final GitHubEmailResponse emailResponse4 = new GitHubEmailResponse();
    emailResponse4.setEmail("6");
    emailResponse4.setVerified(false);
    emailResponse4.setPrimary(true);
    emailResponse4.setVisibility("private");

    final GitHubEmailResponse emailResponse5 = new GitHubEmailResponse();
    emailResponse5.setEmail("3");
    emailResponse5.setVerified(true);
    emailResponse5.setPrimary(false);
    emailResponse5.setVisibility("public");

    final GitHubEmailResponse emailResponse6 = new GitHubEmailResponse();
    emailResponse6.setEmail("7");
    emailResponse6.setVerified(false);
    emailResponse6.setPrimary(false);
    emailResponse6.setVisibility("public");

    final GitHubEmailResponse emailResponse7 = new GitHubEmailResponse();
    emailResponse7.setEmail("4");
    emailResponse7.setVerified(true);
    emailResponse7.setPrimary(false);
    emailResponse7.setVisibility("private");

    final GitHubEmailResponse emailResponse8 = new GitHubEmailResponse();
    emailResponse8.setEmail("8");
    emailResponse8.setVerified(false);
    emailResponse8.setPrimary(false);
    emailResponse8.setVisibility("private");

    final String sortedEmails = Stream.of(
        emailResponse1, emailResponse2, emailResponse3, emailResponse4,
        emailResponse5, emailResponse6, emailResponse7, emailResponse8
      )
      .sorted(GitHubEmailResponse::compareTo)
      .map(GitHubEmailResponse::getEmail)
      .collect(Collectors.joining(","));

    assertEquals("1,2,3,4,5,6,7,8", sortedEmails);
  }
}