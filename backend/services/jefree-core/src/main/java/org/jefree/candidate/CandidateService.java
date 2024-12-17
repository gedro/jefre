package org.jefree.candidate;

import jakarta.transaction.Transactional;
import org.jefree.security.authentication.user.User;
import org.jefree.security.authentication.user.UserNotFoundException;
import org.jefree.security.authentication.user.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class CandidateService {

  private final UserRepository userRepository;
  private final CandidateRepository candidateRepository;

  public CandidateService(final CandidateRepository candidateRepository, final UserRepository userRepository) {
    this.candidateRepository = candidateRepository;
    this.userRepository = userRepository;
  }

  @Transactional(Transactional.TxType.REQUIRED)
  public CandidateEntity getCandidate(final User user) {
    return candidateRepository.findByUserId(user.getId()).orElse(null);
  }

  @Transactional(Transactional.TxType.REQUIRED)
  public CandidateEntity getCandidate(final Long candidateId) {
    return candidateRepository.findById(candidateId).
      orElseThrow(() -> new IllegalArgumentException("Candidate not found"));
  }

  @Transactional(Transactional.TxType.REQUIRED)
  public List<CandidateEntity> getFavoriteCandidates(final User user) {
    return candidateRepository.findAll(); //TODO: implement favorite candidates logic
  }

  @Transactional(Transactional.TxType.REQUIRED)
  public CandidateEntity updateCandidate(final User user, final CandidateEntity candidate) {
    final CandidateEntity oldCandidate = candidateRepository.findByUserId(user.getId()).orElse(null);

    if(oldCandidate == null) {
      candidate.setUser(
        userRepository.findById(user.getId()).orElseThrow(() -> new UserNotFoundException("User is logged out"))
      );
    }

    final CandidateEntity entity = oldCandidate != null ? oldCandidate : candidate;

    for (final OccupationExperienceEntity occupation : candidate.getOccupations()) {
      occupation.setCandidate(entity);
    }

    for (final SkillExperienceEntity skill : candidate.getSkills()) {
      skill.setCandidate(entity);
    }

    if(oldCandidate != null) {
      if(!Objects.equals(oldCandidate.getUser().getId(), user.getId())) {
        throw new IllegalArgumentException("Candidate does not belong to the user");
      }

      oldCandidate.getWorkTypes().clear();
      oldCandidate.getJobTypes().clear();
      oldCandidate.getExperienceLevels().clear();
      oldCandidate.getOccupations().clear();
      oldCandidate.getSkills().clear();

      oldCandidate.setDisplayName(candidate.getDisplayName());
      oldCandidate.setContactEmail(candidate.getContactEmail());
      oldCandidate.setContactPhone(candidate.getContactPhone());
      oldCandidate.getWorkTypes().addAll(candidate.getWorkTypes());
      oldCandidate.getJobTypes().addAll(candidate.getJobTypes());
      oldCandidate.getExperienceLevels().addAll(candidate.getExperienceLevels());
      oldCandidate.setResume(candidate.getResume());
      oldCandidate.getOccupations().addAll(candidate.getOccupations());
      oldCandidate.getSkills().addAll(candidate.getSkills());
    }

    return candidateRepository.save(entity);
  }
}
