package org.jefree.job;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.util.Pair;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface JobRepository extends JpaRepository<JobEntity, Long> {
  List<JobEntity> findByRecruiterId(Long recruiterId);
  Optional<JobEntity> findByIdAndRecruiterId(Long id, Long recruiterId);
  List<JobSummary> findTop10ByOrderByCreatedDateDesc();

  @Query("SELECT COUNT(DISTINCT e.url) FROM JobSkill e")
  long countJobSkills();

  @Query("SELECT COUNT(DISTINCT e.url) FROM JobOccupation e")
  long countJobOccupations();

  @Query("SELECT COUNT(DISTINCT e.id) FROM Job e")
  long countRegisteredJobs();

  @Query("SELECT new org.springframework.data.util.Pair(FUNCTION('DATE', e.createdDate), COUNT(DISTINCT e.id)) " +
    "FROM Job e " +
    "WHERE e.createdDate >= :startDate " +
    "GROUP BY FUNCTION('DATE', e.createdDate) " +
    "ORDER BY FUNCTION('DATE', e.createdDate) ASC")
  List<Pair<Date, Long>> findDailySumData(LocalDateTime startDate);

  static interface JobSummary {
    Long getId();
    LocalDateTime getCreatedDate();
    String getTitle();
  }
}
