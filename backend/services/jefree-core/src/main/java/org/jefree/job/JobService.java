package org.jefree.job;

import jakarta.transaction.Transactional;
import org.jefree.security.authentication.user.User;
import org.jefree.security.authentication.user.UserNotFoundException;
import org.jefree.security.authentication.user.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class JobService {

  private final UserRepository userRepository;
  private final JobRepository jobRepository;

  public JobService(final JobRepository jobRepository, final UserRepository userRepository) {
    this.jobRepository = jobRepository;
    this.userRepository = userRepository;
  }

  @Transactional(Transactional.TxType.REQUIRED)
  public JobEntity saveJob(final User user, final JobEntity job) {
    job.setRecruiter(
      userRepository.findById(user.getId()).orElseThrow(() -> new UserNotFoundException("User is logged out"))
    );

    for (final JobOccupationEntity occupation : job.getOccupations()) {
      occupation.setJob(job);
    }

    for (final JobSkillEntity skill : job.getSkills()) {
      skill.setJob(job);
    }

    return jobRepository.save(job);
  }
}
