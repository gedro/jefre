package org.jefree.candidate;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import org.jefree.security.audit.AuditableEntity;

@Entity(name = "OccupationExperience")
@Table(
  name = "occupation_experience",
  uniqueConstraints = {
    @UniqueConstraint(columnNames = {"url", "job_id"})
  }
)
public class OccupationExperienceEntity extends AuditableEntity<String> {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", updatable = false, nullable = false)
  private Long id;

  @NotBlank
  @Column(name="url", updatable = false, nullable = false)
  private String url;

  @Min(1)
  @Column(name="month", updatable = true, nullable = false)
  private int month;

  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "candidate_id", referencedColumnName = "id", nullable = false, updatable = false)
  private CandidateEntity candidate;

  public Long getId() {
    return id;
  }

  public void setId(final Long id) {
    this.id = id;
  }

  public String getUrl() {
    return url;
  }

  public void setUrl(final String url) {
    this.url = url;
  }

  public int getMonth() {
    return month;
  }

  public void setMonth(final int month) {
    this.month = month;
  }

  public CandidateEntity getCandidate() {
    return candidate;
  }

  public void setCandidate(final CandidateEntity candidate) {
    this.candidate = candidate;
  }
}
