package org.jefree.admin;

import org.jefree.job.JobRepository;

import java.util.Collections;
import java.util.List;

public class StatisticResponse {
  private long countEscoSkills;
  private long countEscoOccupations;
  private long countJobSkills;
  private long countJobOccupations;
  private long countCandidateSkills;
  private long countCandidateOccupations;
  private long countRegisteredUsers;
  private long countRegisteredCandidates;
  private long countRegisteredRecruiters;
  private long countRegisteredJobs;
  private long countAllOccupations;
  private long countAllSkills;
  private List<JobRepository.JobSummary> recentJobs = Collections.emptyList();
  private LineDataResponse lineData;

  public long getEscoOccupationUsagePercentage() {
    return Math.round(countAllOccupations * 100d / countEscoOccupations);
  }

  public long getEscoSkillUsagePercentage() {
    return Math.round(countAllSkills * 100d / countEscoSkills);
  }

  public long getCountEscoSkills() {
    return countEscoSkills;
  }

  public void setCountEscoSkills(final long countEscoSkills) {
    this.countEscoSkills = countEscoSkills;
  }

  public long getCountEscoOccupations() {
    return countEscoOccupations;
  }

  public void setCountEscoOccupations(final long countEscoOccupations) {
    this.countEscoOccupations = countEscoOccupations;
  }

  public long getCountJobSkills() {
    return countJobSkills;
  }

  public void setCountJobSkills(final long countJobSkills) {
    this.countJobSkills = countJobSkills;
  }

  public long getCountJobOccupations() {
    return countJobOccupations;
  }

  public void setCountJobOccupations(final long countJobOccupations) {
    this.countJobOccupations = countJobOccupations;
  }

  public long getCountCandidateSkills() {
    return countCandidateSkills;
  }

  public void setCountCandidateSkills(final long countCandidateSkills) {
    this.countCandidateSkills = countCandidateSkills;
  }

  public long getCountCandidateOccupations() {
    return countCandidateOccupations;
  }

  public void setCountCandidateOccupations(final long countCandidateOccupations) {
    this.countCandidateOccupations = countCandidateOccupations;
  }

  public long getCountRegisteredUsers() {
    return countRegisteredUsers;
  }

  public void setCountRegisteredUsers(final long countRegisteredUsers) {
    this.countRegisteredUsers = countRegisteredUsers;
  }

  public long getCountRegisteredCandidates() {
    return countRegisteredCandidates;
  }

  public void setCountRegisteredCandidates(final long countRegisteredCandidates) {
    this.countRegisteredCandidates = countRegisteredCandidates;
  }

  public long getCountRegisteredRecruiters() {
    return countRegisteredRecruiters;
  }

  public void setCountRegisteredRecruiters(final long countRegisteredRecruiters) {
    this.countRegisteredRecruiters = countRegisteredRecruiters;
  }

  public long getCountRegisteredJobs() {
    return countRegisteredJobs;
  }

  public void setCountRegisteredJobs(final long countRegisteredJobs) {
    this.countRegisteredJobs = countRegisteredJobs;
  }

  public long getCountAllOccupations() {
    return countAllOccupations;
  }

  public void setCountAllOccupations(final long countAllOccupations) {
    this.countAllOccupations = countAllOccupations;
  }

  public long getCountAllSkills() {
    return countAllSkills;
  }

  public void setCountAllSkills(final long countAllSkills) {
    this.countAllSkills = countAllSkills;
  }

  public List<JobRepository.JobSummary> getRecentJobs() {
    return recentJobs;
  }

  public void setRecentJobs(final List<JobRepository.JobSummary> recentJobs) {
    this.recentJobs = recentJobs;
  }

  public LineDataResponse getLineData() {
    return lineData;
  }

  public void setLineData(final LineDataResponse lineData) {
    this.lineData = lineData;
  }
}
