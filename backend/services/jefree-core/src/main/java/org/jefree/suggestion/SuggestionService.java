package org.jefree.suggestion;

import jakarta.transaction.Transactional;
import org.jefree.candidate.CandidateEntity;
import org.jefree.candidate.CandidateRepository;
import org.jefree.job.JobEntity;
import org.jefree.job.JobRepository;
import org.jefree.security.authentication.user.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SuggestionService {

  private final CandidateRepository candidateRepository;
  private final JobRepository jobRepository;

  public SuggestionService(
    final CandidateRepository candidateRepository,
    final JobRepository jobRepository
  ) {
    this.candidateRepository = candidateRepository;
    this.jobRepository = jobRepository;
  }

  @Transactional(Transactional.TxType.REQUIRED)
  public List<CandidateEntity> suggestCandidates(final Long jobId) {
    return candidateRepository.findAll(); //TODO: implement suggestion logic
  }

  @Transactional(Transactional.TxType.REQUIRED)
  public List<JobEntity> getSuggestedJobsFor(final User candidate) {
    return jobRepository.findAll(); //TODO: Implement suggestion logic
  }
}
