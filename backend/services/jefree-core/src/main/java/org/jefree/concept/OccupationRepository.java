package org.jefree.concept;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OccupationRepository extends JpaRepository<OccupationEntity, String> {
  Optional<OccupationEntity> findByUrl(String url);
}

