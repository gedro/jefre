package org.jefree.concept;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OccupationRepository extends JpaRepository<OccupationEntity, String> {
  Optional<OccupationEntity> findByUrl(String url);

  @Override
  @Query("SELECT o FROM EscoOccupation o ORDER BY LOWER(o.title)")
  Page<OccupationEntity> findAll(Pageable pageable);

  @Query(
    "SELECT o FROM EscoOccupation o" +
    "         WHERE LOWER(TRIM(o.title)) LIKE LOWER(CONCAT('%', :title, '%')) " +
    "ORDER BY LEVENSHTEIN(LOWER(TRIM(o.title)), LOWER(:title))")
  Page<OccupationEntity> findByTitleContainingIgnoreCaseOrderByTitle(@Param("title") String title, Pageable pageable);
}

