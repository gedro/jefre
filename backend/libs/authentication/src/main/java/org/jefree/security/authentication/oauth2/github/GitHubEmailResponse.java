package org.jefree.security.authentication.oauth2.github;

public class GitHubEmailResponse implements Comparable<GitHubEmailResponse> {
  private String email;
  private boolean primary;
  private boolean verified;
  private String visibility;

  @Override
  public int compareTo(final GitHubEmailResponse o) {
    int compare = Boolean.compare(o.verified, verified);
    if(compare == 0) {
      compare = Boolean.compare(o.primary, primary);
    }
    if(compare == 0) {
      if("public".equals(visibility) && "public".equals(o.visibility)) {
        compare = 0;
      } else if("public".equals(visibility)) {
        compare = -1;
      } else if("public".equals(o.visibility)) {
        compare = 1;
      }
    }

    return compare;
  }

  public String getEmail() {
    return email;
  }

  void setEmail(String email) {
    this.email = email;
  }

  public boolean isPrimary() {
    return primary;
  }

  void setPrimary(boolean primary) {
    this.primary = primary;
  }

  public boolean isVerified() {
    return verified;
  }

  void setVerified(boolean verified) {
    this.verified = verified;
  }

  public String getVisibility() {
    return visibility;
  }

  void setVisibility(String visibility) {
    this.visibility = visibility;
  }
}
