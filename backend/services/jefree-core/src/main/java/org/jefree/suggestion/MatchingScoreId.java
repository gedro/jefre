package org.jefree.suggestion;

import java.io.Serializable;
import java.util.Objects;

public class MatchingScoreId implements Serializable {

  private Long candidateId;
  private Long jobId;

  public MatchingScoreId() {}

  public MatchingScoreId(final Long candidateId, final Long jobId) {
    this.candidateId = candidateId;
    this.jobId = jobId;
  }

  // Getters and Setters

  public Long getCandidateId() {
    return candidateId;
  }

  public void setCandidateId(final Long candidateId) {
    this.candidateId = candidateId;
  }

  public Long getJobId() {
    return jobId;
  }

  public void setJobId(final Long jobId) {
    this.jobId = jobId;
  }

  @Override
  public int hashCode() {
    return Objects.hash(candidateId, jobId);
  }

  @Override
  public boolean equals(final Object obj) {
    if (this == obj) return true;
    if (obj == null || getClass() != obj.getClass()) return false;
    final MatchingScoreId that = (MatchingScoreId) obj;
    return Objects.equals(candidateId, that.candidateId) && Objects.equals(jobId, that.jobId);
  }
}
