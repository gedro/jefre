package org.jefree.admin;

import org.jefree.candidate.CandidateRepository;
import org.jefree.concept.OccupationRepository;
import org.jefree.concept.SkillRepository;
import org.jefree.job.JobRepository;
import org.jefree.security.authentication.user.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class StatisticsService {

  private final UserRepository userRepository;
  private final OccupationRepository occupationRepository;
  private final SkillRepository skillRepository;
  private final CandidateRepository candidateRepository;
  private final JobRepository jobRepository;

  public StatisticsService(
    final UserRepository userRepository,
    final OccupationRepository occupationRepository,
    final SkillRepository skillRepository,
    final CandidateRepository candidateRepository,
    final JobRepository jobRepository
  ) {
    this.userRepository = userRepository;
    this.occupationRepository = occupationRepository;
    this.skillRepository = skillRepository;
    this.candidateRepository = candidateRepository;
    this.jobRepository = jobRepository;
  }

  public StatisticResponse getStatistics() {
    final StatisticResponse response = new StatisticResponse();

    response.setCountEscoSkills(skillRepository.countEscoSkills());
    response.setCountEscoOccupations(occupationRepository.countEscoOccupations());
    response.setCountJobSkills(jobRepository.countJobSkills());
    response.setCountJobOccupations(jobRepository.countJobOccupations());
    response.setCountCandidateSkills(candidateRepository.countSkillExperience());
    response.setCountCandidateOccupations(candidateRepository.countOccupationExperience());
    response.setCountRegisteredUsers(userRepository.countRegisteredUsers());
    response.setCountRegisteredCandidates(candidateRepository.countRegisteredCandidates());
    response.setCountRegisteredRecruiters(userRepository.countRegisteredRecruiters());
    response.setCountRegisteredJobs(jobRepository.countRegisteredJobs());
    response.setCountAllOccupations(candidateRepository.countAllOccupations());
    response.setCountAllSkills(candidateRepository.countAllSkills());
    response.setRecentJobs(jobRepository.findTop10ByOrderByCreatedDateDesc());
    response.setLineData(getLineData());

    return response;
  }

  private LineDataResponse getLineData() {
    final LocalDateTime threeWeeksAgo = LocalDateTime.now().minusWeeks(3);
    final LineDataResponse response = new LineDataResponse(threeWeeksAgo);

    response.setRegisteredUsers(userRepository.findDailyUserSumData(threeWeeksAgo));
    response.setRegisteredCandidates(candidateRepository.findDailySumData(threeWeeksAgo));
    response.setRegisteredRecruiters(userRepository.findDailyRecruiterSumData(threeWeeksAgo));
    response.setOpenJobs(jobRepository.findDailySumData(threeWeeksAgo));

    return response;
  }
}
