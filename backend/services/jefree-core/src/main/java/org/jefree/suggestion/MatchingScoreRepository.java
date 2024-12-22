package org.jefree.suggestion;

import org.jefree.candidate.CandidateEntity;
import org.jefree.job.JobEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.util.Pair;

import java.util.List;

public interface MatchingScoreRepository extends JpaRepository<MatchingScoreEntity, Long> {

  @Query(
    "SELECT new org.jefree.suggestion.Suggestion(j, m.score, m.occupationCoverage, m.skillCoverage) " +
    "   FROM MatchingScoreEntity m" +
    "               LEFT JOIN Job j  ON j.id = m.jobId AND j.version = m.jobVersion " +
    " WHERE m.candidateId = :candidateId " +
    " ORDER BY m.score DESC " +
    " LIMIT 20")
  List<Suggestion<JobEntity>> findTop20ByCandidateIdOrderByScoreDesc(@Param("candidateId") Long candidateId);

  @Query(
    "SELECT new org.jefree.suggestion.Suggestion(c, m.score, m.occupationCoverage, m.skillCoverage) " +
    "   FROM MatchingScoreEntity m" +
    "               LEFT JOIN Candidate c ON c.id = m.candidateId AND c.version = m.candidateVersion " +
    " WHERE m.jobId = :jobId " +
    " ORDER BY m.score DESC " +
    " LIMIT 20")
  List<Suggestion<CandidateEntity>> findTop20ByJobIdOrderByScoreDesc(@Param("jobId") Long jobId);

  @Query(
    "SELECT m FROM MatchingScoreEntity m " +
    " WHERE m.jobId = :jobId AND m.candidateId = :candidateId " +
    "      AND (m.jobVersion <> :jobVersion OR m.candidateVersion <> :candidateVersion)")
  List<MatchingScoreEntity> findByJobIdAndCandidateIdAndVersionNotEqual(
    @Param("jobId") Long jobId,
    @Param("candidateId") Long candidateId,
    @Param("jobVersion") Long jobVersion,
    @Param("candidateVersion") Long candidateVersion
  );

  @Query(
    "SELECT new org.springframework.data.util.Pair(j, c) " +
    "   FROM Job j, Candidate c " +
    " WHERE NOT EXISTS ( " +
    "     SELECT m FROM MatchingScoreEntity m " +
    "      WHERE m.jobId = j.id AND m.candidateId = c.id " +
    " )")
  List<Pair<JobEntity, CandidateEntity>> findJobCandidatePairsNotInMatchingScores();
}
