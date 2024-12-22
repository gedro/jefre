package org.jefree.suggestion;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import org.jefree.database.DefaultView;

@JsonView(DefaultView.Entity.class)
public class Suggestion<T> {

  private final T value;
  private final double score;
  private final float occupationCoverage;
  private final float skillCoverage;

  public Suggestion(final T value, final double score, final float occupationCoverage, final float skillCoverage) {
    this.value = value;
    this.score = score;
    this.occupationCoverage = occupationCoverage;
    this.skillCoverage = skillCoverage;
  }

  @JsonView(SuggestionView.Candidate.class)
  public T getCandidate() {
    return  value;
  }

  @JsonView(SuggestionView.Job.class)
  public T getJob() {
    return  value;
  }

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "0.##")
  public double getScore() {
    return score;
  }

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "0.##")
  public float getOccupationCoverage() {
    return occupationCoverage;
  }

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "0.##")
  public float getSkillCoverage() {
    return skillCoverage;
  }
}
