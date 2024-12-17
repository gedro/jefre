package org.jefree.suggestion;

import jakarta.transaction.Transactional;
import org.jefree.candidate.CandidateEntity;
import org.jefree.candidate.CandidateRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SuggestionService {

  private final CandidateRepository candidateRepository;

  public SuggestionService(final CandidateRepository candidateRepository) {
    this.candidateRepository = candidateRepository;
  }

  @Transactional(Transactional.TxType.REQUIRED)
  public List<CandidateEntity> suggestCandidates(final Long jobId) {
    return candidateRepository.findAll(); //TODO: implement suggestion logic
  }
}
