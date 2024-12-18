package org.jefree.candidate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.util.Pair;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface CandidateRepository extends JpaRepository<CandidateEntity, Long> {
  Optional<CandidateEntity> findByUserId(final Long userId);

  @Query("SELECT COUNT(DISTINCT e.url) FROM OccupationExperience e")
  long countOccupationExperience();

  @Query("SELECT COUNT(DISTINCT e.url) FROM SkillExperience e")
  long countSkillExperience();

  @Query("SELECT COUNT(DISTINCT e.id) FROM Candidate e")
  long countRegisteredCandidates();

  @Query("SELECT new org.springframework.data.util.Pair(FUNCTION('DATE', e.createdDate), COUNT(DISTINCT e.id)) " +
    "FROM Candidate e " +
    "WHERE e.createdDate >= :startDate " +
    "GROUP BY FUNCTION('DATE', e.createdDate) " +
    "ORDER BY FUNCTION('DATE', e.createdDate) ASC")
  List<Pair<Date, Long>> findDailySumData(LocalDateTime startDate);

  @Query(
    "SELECT COUNT(DISTINCT occ.url) FROM (" +
      "SELECT e.url as url FROM JobOccupation e " +
      "UNION " +
      "SELECT e.url as url FROM OccupationExperience e" +
    ") as occ")
  long countAllOccupations();

  @Query(
    "SELECT COUNT(DISTINCT skill.url) FROM (" +
      "SELECT e.url as url FROM JobSkill e " +
      "UNION " +
      "SELECT e.url as url FROM SkillExperience e" +
      ") as skill")
  long countAllSkills();
}
