package org.jefree.suggestion;

import com.fasterxml.jackson.annotation.JsonView;
import org.jefree.database.DefaultView;

import java.text.DecimalFormat;

@JsonView(DefaultView.Entity.class)
public class Suggestion<T> {

  private final T value;

  private final String score;
  private final String occupationCoverage;
  private final String skillCoverage;

  public Suggestion(final T value, final double score, final float occupationCoverage, final float skillCoverage) {
    final DecimalFormat format = new DecimalFormat("0.##");
    this.value = value;
    this.score = format.format(score);
    this.occupationCoverage = format.format(occupationCoverage);
    this.skillCoverage = format.format(skillCoverage);
  }

  @JsonView(SuggestionView.Candidate.class)
  public T getCandidate() {
    return  value;
  }

  @JsonView(SuggestionView.Job.class)
  public T getJob() {
    return  value;
  }

  public String getScore() {
    return score;
  }

  public String getOccupationCoverage() {
    return occupationCoverage;
  }

  public String getSkillCoverage() {
    return skillCoverage;
  }
}
