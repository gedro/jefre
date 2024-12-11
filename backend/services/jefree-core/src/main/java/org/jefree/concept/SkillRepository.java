package org.jefree.concept;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SkillRepository extends JpaRepository<SkillEntity, String> {
  Optional<SkillEntity> findByUrl(String url);

  @Override
  @Query("SELECT s FROM EscoSkill s ORDER BY LOWER(s.title)")
  Page<SkillEntity> findAll(Pageable pageable);

  @Query(
    "SELECT s FROM EscoSkill s" +
    "         WHERE LOWER(TRIM(s.title)) LIKE LOWER(CONCAT('%', :title, '%')) " +
    "ORDER BY LEVENSHTEIN(LOWER(TRIM(s.title)), LOWER(:title))")
  Page<SkillEntity> findByTitleContainingIgnoreCaseOrderByTitle(@Param("title") String title, Pageable pageable);
}

