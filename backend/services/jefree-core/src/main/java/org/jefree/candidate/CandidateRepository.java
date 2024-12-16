package org.jefree.candidate;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CandidateRepository extends JpaRepository<CandidateEntity, Long> {
  Optional<CandidateEntity> findByUserId(final Long userId);
}
