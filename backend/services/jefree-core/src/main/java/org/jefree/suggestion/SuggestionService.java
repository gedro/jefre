package org.jefree.suggestion;

import jakarta.transaction.Transactional;
import org.jefree.candidate.CandidateEntity;
import org.jefree.job.JobEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
public class SuggestionService {

  private static final AtomicBoolean REFRESH_SCORES = new AtomicBoolean(false);

  private final MatchingScoreRepository matchingScoreRepository;

  public SuggestionService(final MatchingScoreRepository matchingScoreRepository) {
    this.matchingScoreRepository = matchingScoreRepository;
  }

  @Transactional(Transactional.TxType.REQUIRED)
  public List<Suggestion<CandidateEntity>>  suggestCandidates(final Long jobId) {
    return matchingScoreRepository.findTop20ByJobIdOrderByScoreDesc(jobId);
  }

  @Transactional(Transactional.TxType.REQUIRED)
  public List<Suggestion<JobEntity>>  getSuggestedJobsFor(final Long candidateId) {
    return matchingScoreRepository.findTop20ByCandidateIdOrderByScoreDesc(candidateId);
  }
}
