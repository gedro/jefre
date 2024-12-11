package org.jefree.concept;

import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity(name = "EscoSkill")
@Table(
  name = "skills",
  uniqueConstraints = {
    @UniqueConstraint(columnNames = "url")
  }
)
public class SkillEntity {

  @Id
  @Column(name = "url", updatable = false, nullable = false)
  @JsonView(ConceptView.Collection.class)
  private String url;

  @NotBlank
  @Column(name="title", nullable = false)
  @JsonView(ConceptView.Collection.class)
  private String title;

  @NotBlank
  @Column(name="description", columnDefinition = "TEXT", nullable = false)
  @JsonView(ConceptView.Description.class)
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
