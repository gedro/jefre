package org.jefree.suggestion;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(
  name = "matching_scores",
  indexes = {
    @Index(columnList = "candidate_id, candidate_version, job_id, job_version", unique = true),
    @Index(columnList = "job_id"),
    @Index(columnList = "candidate_id")
  },
  uniqueConstraints = {
    @UniqueConstraint(columnNames = {"candidate_id", "candidate_version", "job_id", "job_version"})
  }
)
@IdClass(MatchingScoreId.class)
public class MatchingScoreEntity {

  @Id
  @Column(name = "candidate_id", nullable = false)
  private Long candidateId;

  @NotNull
  @Column(name = "candidate_version", nullable = false)
  private Long candidateVersion;

  @Id
  @Column(name = "job_id", nullable = false)
  private Long jobId;

  @NotNull
  @Column(name = "job_version", nullable = false)
  private Long jobVersion;

  @NotNull
  @Column(name = "score", updatable = true, nullable = false)
  private Double score = 0.0d;

  @NotNull
  @Column(name = "occupation_coverage", updatable = true, nullable = false)
  private Float occupationCoverage = 0.0f;

  @NotNull
  @Column(name = "skill_coverage", updatable = true, nullable = false)
  private Float skillCoverage = 0.0f;

  public Long getCandidateId() {
    return candidateId;
  }

  public void setCandidateId(final Long candidateId) {
    this.candidateId = candidateId;
  }

  public Long getCandidateVersion() {
    return candidateVersion;
  }

  public void setCandidateVersion(final Long candidateVersion) {
    this.candidateVersion = candidateVersion;
  }

  public Long getJobId() {
    return jobId;
  }

  public void setJobId(final Long jobId) {
    this.jobId = jobId;
  }

  public Long getJobVersion() {
    return jobVersion;
  }

  public void setJobVersion(final Long jobVersion) {
    this.jobVersion = jobVersion;
  }

  public Double getScore() {
    return score;
  }

  public void setScore(final Double score) {
    this.score = score;
  }

  public Float getOccupationCoverage() {
    return occupationCoverage;
  }

  public void setOccupationCoverage(final Float occupationCoverage) {
    this.occupationCoverage = occupationCoverage;
  }

  public Float getSkillCoverage() {
    return skillCoverage;
  }

  public void setSkillCoverage(final Float skillCoverage) {
    this.skillCoverage = skillCoverage;
  }
}