package org.jefree.job;

import jakarta.transaction.Transactional;
import org.jefree.security.authentication.user.User;
import org.jefree.security.authentication.user.UserNotFoundException;
import org.jefree.security.authentication.user.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

  private final UserRepository userRepository;
  private final JobRepository jobRepository;

  public JobService(final JobRepository jobRepository, final UserRepository userRepository) {
    this.jobRepository = jobRepository;
    this.userRepository = userRepository;
  }

  @Transactional(Transactional.TxType.REQUIRED)
  public JobEntity getJob(final Long jobId) {
    return jobRepository.findById(jobId).orElseThrow(() -> new RuntimeException("Job not found"));
  }

  @Transactional(Transactional.TxType.REQUIRED)
  public List<JobEntity> getRecruiterJobs(final User recruiter) {
    return jobRepository.findByRecruiterId(recruiter.getId());
  }

  @Transactional(Transactional.TxType.REQUIRED)
  public List<JobEntity> getSuggestedJobsFor(final User candidate) {
    return jobRepository.findAll(); //TODO: Implement suggestion logic
  }

  @Transactional(Transactional.TxType.REQUIRED)
  public JobEntity getUserJob(final User user, final Long jobId) {
    return jobRepository.findByIdAndRecruiterId(jobId, user.getId())
      .orElseThrow(() -> new RuntimeException("Job not found"));
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

  @Transactional(Transactional.TxType.REQUIRED)
  public JobEntity updateJob(final User user, final Long jobId, final JobEntity job) {
    final JobEntity oldJob = jobRepository.findByIdAndRecruiterId(jobId, user.getId())
      .orElseThrow(() -> new RuntimeException("Job not found"));

    for (final JobOccupationEntity occupation : job.getOccupations()) {
      occupation.setJob(oldJob);
    }

    for (final JobSkillEntity skill : job.getSkills()) {
      skill.setJob(oldJob);
    }

    oldJob.getOccupations().clear();
    oldJob.getSkills().clear();

    oldJob.setTitle(job.getTitle());
    oldJob.setDescription(job.getDescription());
    oldJob.setJobType(job.getJobType());
    oldJob.setExperienceLevel(job.getExperienceLevel());
    oldJob.setWorkType(job.getWorkType());
    oldJob.setVacancyEndDate(job.getVacancyEndDate());
    oldJob.setCountry(job.getCountry());
    oldJob.setCity(job.getCity());
    oldJob.setCompanyName(job.getCompanyName());
    oldJob.setContactEmail(job.getContactEmail());
    oldJob.setContactPhone(job.getContactPhone());
    oldJob.setContactPerson(job.getContactPerson());
    oldJob.getSkills().addAll(job.getSkills());
    oldJob.getOccupations().addAll(job.getOccupations());

    return jobRepository.save(oldJob);
  }
}
