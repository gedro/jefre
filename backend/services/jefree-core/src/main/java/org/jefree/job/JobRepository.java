package org.jefree.job;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobRepository extends JpaRepository<JobEntity, Long> {
  List<JobEntity> findByRecruiterId(Long recruiterId);
  Optional<JobEntity> findByIdAndRecruiterId(Long id, Long recruiterId);
}
