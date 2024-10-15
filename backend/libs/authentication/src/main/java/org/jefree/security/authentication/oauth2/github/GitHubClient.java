package org.jefree.security.authentication.oauth2.github;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@FeignClient(value = "github-emails", url = "https://api.github.com")
public interface GitHubClient {

  @GetMapping("/user/emails")
  List<GitHubEmailResponse> getEmails(
    @RequestHeader(value = "Authorization", required = true) String authorizationHeader
  );

}
