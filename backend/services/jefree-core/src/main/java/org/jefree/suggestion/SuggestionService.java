package org.jefree.suggestion;

import jakarta.transaction.Transactional;
import org.jefree.candidate.CandidateEntity;
import org.jefree.job.JobEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SuggestionService {

  private final static double SCORE_THRESHOLD = 3d;

  private final MatchingScoreRepository matchingScoreRepository;

  public SuggestionService(final MatchingScoreRepository matchingScoreRepository) {
    this.matchingScoreRepository = matchingScoreRepository;
  }

  @Transactional(Transactional.TxType.REQUIRED)
  public List<Suggestion<CandidateEntity>>  suggestCandidates(final Long jobId) {
    return matchingScoreRepository.findTop20ByJobIdOrderByScoreDesc(jobId, SCORE_THRESHOLD);
  }

  @Transactional(Transactional.TxType.REQUIRED)
  public List<Suggestion<JobEntity>>  getSuggestedJobsFor(final Long candidateId) {
    return matchingScoreRepository.findTop20ByCandidateIdOrderByScoreDesc(candidateId, SCORE_THRESHOLD);
  }

  @Transactional(Transactional.TxType.REQUIRES_NEW)
  public void refreshScores() {
    matchingScoreRepository.findJobCandidatePairsNotInMatchingScores().forEach(pair -> {
      final JobEntity job = pair.getFirst();
      final CandidateEntity candidate = pair.getSecond();
      final MatchingScoreEntity matchingScore = new MatchingScoreEntity();
      matchingScore.setJobId(job.getId());
      matchingScore.setJobVersion(job.getVersion());
      matchingScore.setCandidateId(candidate.getId());
      matchingScore.setCandidateVersion(candidate.getVersion());

      ScoreCalculator.calculateScore(job, candidate, matchingScore);
      matchingScoreRepository.save(matchingScore);
    });

    matchingScoreRepository.findByMismatchedJobOrCandidateVersion().forEach(pair -> {
      final JobEntity job = pair.getFirst();
      final CandidateEntity candidate = pair.getSecond();

      final MatchingScoreEntity matchingScore = matchingScoreRepository.findByJobIdAndCandidateId(job.getId(), candidate.getId());
      matchingScore.setJobVersion(job.getVersion());
      matchingScore.setCandidateVersion(candidate.getVersion());

      ScoreCalculator.calculateScore(job, candidate, matchingScore);
      matchingScoreRepository.save(matchingScore);
    });

    matchingScoreRepository.flush();
  }
}
