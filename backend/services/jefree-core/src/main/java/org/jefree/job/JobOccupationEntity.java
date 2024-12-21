package org.jefree.job;

import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import org.jefree.database.DefaultView;

@Entity(name = "JobOccupation")
@Table(
  name = "job_occupations",
  indexes = {
    @Index(columnList = "url, job_id", unique = true)
  },
  uniqueConstraints = {
    @UniqueConstraint(columnNames = {"url", "job_id"})
  }
)
public class JobOccupationEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", updatable = false, nullable = false)
  @JsonView(DefaultView.Entity.class)
  private Long id;

  @NotBlank
  @Column(name="url", updatable = false, nullable = false)
  @JsonView(DefaultView.Entity.class)
  private String url;

  @NotBlank
  @Column(name="title", updatable = false, nullable = false)
  @JsonView(DefaultView.Entity.class)
  private String title;

  @Min(1)
  @Column(name="month", updatable = true, nullable = false)
  @JsonView(DefaultView.Entity.class)
  private int month = 1;

  @Min(1)
  @Max(960)
  @Column(name="max_month", updatable = true, nullable = false, columnDefinition = "integer DEFAULT 960")
  @JsonView(DefaultView.Entity.class)
  private int maxMonth = 960;

  @ManyToOne(cascade = CascadeType.REFRESH)
  @JoinColumn(name = "job_id", referencedColumnName = "id", nullable = false, updatable = false)
  @JsonView(DefaultView.Ignore.class)
  private JobEntity job;

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

  public String getTitle() {
    return title;
  }

  public void setTitle(final String title) {
    this.title = title;
  }

  public int getMonth() {
    return month;
  }

  public void setMonth(final int month) {
    this.month = month;
  }

  public int getMaxMonth() {
    return maxMonth;
  }

  public void setMaxMonth(final int maxMonth) {
    this.maxMonth = maxMonth;
  }

  public JobEntity getJob() {
    return job;
  }

  public void setJob(final JobEntity job) {
    this.job = job;
  }
}
