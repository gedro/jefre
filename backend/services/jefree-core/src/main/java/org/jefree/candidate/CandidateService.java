package org.jefree.candidate;

import jakarta.transaction.Transactional;
import org.jefree.security.authentication.user.User;
import org.jefree.security.authentication.user.UserNotFoundException;
import org.jefree.security.authentication.user.UserRepository;
import org.springframework.stereotype.Service;

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
  public CandidateEntity updateCandidate(final User user, final CandidateEntity candidate) {
    final CandidateEntity oldCandidate = candidateRepository.findByUserId(candidate.getId()).orElse(null);

    if(oldCandidate == null) {
      candidate.setUser(
        userRepository.findById(user.getId()).orElseThrow(() -> new UserNotFoundException("User is logged out"))
      );
    }

    for (final OccupationExperienceEntity occupation : candidate.getOccupations()) {
      occupation.setCandidate(candidate);
    }

    for (final SkillExperienceEntity skill : candidate.getSkills()) {
      skill.setCandidate(candidate);
    }

    if(oldCandidate != null) {
      if(!Objects.equals(oldCandidate.getUser().getId(), user.getId())) {
        throw new IllegalArgumentException("Candidate does not belong to the user");
      }

      oldCandidate.setDisplayName(candidate.getDisplayName());
      oldCandidate.setContactEmail(candidate.getContactEmail());
      oldCandidate.setContactPhone(candidate.getContactPhone());
      oldCandidate.setWorkTypes(candidate.getWorkTypes());
      oldCandidate.setJobTypes(candidate.getJobTypes());
      oldCandidate.setExperienceLevels(candidate.getExperienceLevels());
      oldCandidate.setResume(candidate.getResume());
      oldCandidate.setOccupations(candidate.getOccupations());
      oldCandidate.setSkills(candidate.getSkills());
    }

    return candidateRepository.save(oldCandidate != null ? oldCandidate : candidate);
  }
}
