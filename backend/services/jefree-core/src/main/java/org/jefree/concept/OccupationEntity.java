package org.jefree.concept;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity(name = "EscoOccupation")
@Table(
  name = "occupations",
  uniqueConstraints = {
    @UniqueConstraint(columnNames = "url")
  }
)
public class OccupationEntity {

  @Id
  @Column(name = "url", updatable = false, nullable = false)
  private String url;

  @NotBlank
  @Column(name="title", nullable = false)
  private String title;

  @NotBlank
  @Column(name="description", columnDefinition = "TEXT", nullable = false)
  private String description;

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

  public String getDescription() {
    return description;
  }

  public void setDescription(final String description) {
    this.description = description;
  }
}
