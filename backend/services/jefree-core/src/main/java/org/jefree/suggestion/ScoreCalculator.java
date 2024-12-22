package org.jefree.suggestion;

import org.jefree.candidate.CandidateEntity;
import org.jefree.candidate.OccupationExperienceEntity;
import org.jefree.candidate.SkillExperienceEntity;
import org.jefree.job.JobEntity;
import org.jefree.job.JobOccupationEntity;
import org.jefree.job.JobSkillEntity;

import java.util.Map;
import java.util.stream.Collectors;

public class ScoreCalculator {

  public static void calculateScore(
    final JobEntity job, final CandidateEntity candidate, final MatchingScoreEntity matchingScore
  ) {
    // Calculate occupation coverage
    float occupationCoverage = calculateCoverage(
      job.getOccupations().stream().collect(Collectors.toMap(JobOccupationEntity::getTitle, e -> new int[]{e.getMonth(), e.getMaxMonth()})),
      candidate.getOccupations().stream().collect(Collectors.toMap(OccupationExperienceEntity::getTitle, OccupationExperienceEntity::getMonth))
    );

    // Calculate skill coverage
    float skillCoverage = calculateCoverage(
      job.getSkills().stream().collect(Collectors.toMap(JobSkillEntity::getTitle, e -> new int[]{e.getMonth(), e.getMaxMonth()})),
      candidate.getSkills().stream().collect(Collectors.toMap(SkillExperienceEntity::getTitle, SkillExperienceEntity::getMonth))
    );

    // Calculate the final score as the average of occupation coverage and skill coverage
    double score = (occupationCoverage + skillCoverage) / 2.0d / 10.0d;

    // Set the calculated values in the matching score entity
    matchingScore.setOccupationCoverage(occupationCoverage);
    matchingScore.setSkillCoverage(skillCoverage);
    matchingScore.setScore(score);
  }

private static float calculateCoverage(Map<String, int[]> jobAttributes, Map<String, Integer> candidateAttributes) {
  if (jobAttributes.isEmpty()) {
    return 0.0f;
  }

  int totalMaxMonths = jobAttributes.values().stream().mapToInt(attr -> attr[1]).sum();
  int matchingMonths = jobAttributes.entrySet().stream()
    .filter(entry -> candidateAttributes.containsKey(entry.getKey()))
    .mapToInt(entry -> {
      int candidateMonths = candidateAttributes.get(entry.getKey());
      int jobMinMonths = entry.getValue()[0];
      int jobMaxMonths = entry.getValue()[1];
      return candidateMonths >= jobMinMonths ? Math.min(candidateMonths, jobMaxMonths) : 0;
    })
    .sum();

  return (matchingMonths / (float) totalMaxMonths) * 100;
}
}