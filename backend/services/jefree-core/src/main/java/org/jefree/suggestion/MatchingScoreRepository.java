package org.jefree.suggestion;

import org.jefree.candidate.CandidateEntity;
import org.jefree.job.JobEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.util.Pair;

import java.util.List;

public interface MatchingScoreRepository extends JpaRepository<MatchingScoreEntity, Long> {
  MatchingScoreEntity findByJobIdAndCandidateId(Long jobId, Long candidateId);

  @Query(
    "SELECT new org.jefree.suggestion.Suggestion(j, m.score, m.occupationCoverage, m.skillCoverage) " +
    "   FROM MatchingScore m" +
    "               LEFT JOIN Job j  ON j.id = m.jobId AND j.version = m.jobVersion " +
    " WHERE m.candidateId = :candidateId " +
    "      AND m.score > :score " +
    " ORDER BY m.score DESC " +
    " LIMIT 20")
  List<Suggestion<JobEntity>> findTop20ByCandidateIdOrderByScoreDesc(@Param("candidateId") Long candidateId, @Param("score") Double score);

  @Query(
    "SELECT new org.jefree.suggestion.Suggestion(c, m.score, m.occupationCoverage, m.skillCoverage) " +
    "   FROM MatchingScore m" +
    "               LEFT JOIN Candidate c ON c.id = m.candidateId AND c.version = m.candidateVersion " +
    " WHERE m.jobId = :jobId " +
    "      AND m.score > :score " +
    " ORDER BY m.score DESC " +
    " LIMIT 20")
  List<Suggestion<CandidateEntity>> findTop20ByJobIdOrderByScoreDesc(@Param("jobId") Long jobId, @Param("score") Double score);

  @Query(
    "SELECT new org.springframework.data.util.Pair(j, c) " +
    "   FROM MatchingScore  m " +
    "     JOIN Job j ON m.jobId = j.id " +
    "     JOIN Candidate c ON m.candidateId = c.id " +
    " WHERE m.jobVersion <> j.version OR m.candidateVersion <> c.version"
  )
  List<Pair<JobEntity, CandidateEntity>> findByMismatchedJobOrCandidateVersion();

  @Query(
    "SELECT new org.springframework.data.util.Pair(j, c) " +
    "   FROM Job j, Candidate c " +
    " WHERE NOT EXISTS ( " +
    "     SELECT m FROM MatchingScore m " +
    "      WHERE m.jobId = j.id AND m.candidateId = c.id " +
    " )")
  List<Pair<JobEntity, CandidateEntity>> findJobCandidatePairsNotInMatchingScores();
}
