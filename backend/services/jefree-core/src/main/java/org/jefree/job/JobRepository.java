package org.jefree.job;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<JobEntity, Long> {
  List<JobEntity> findByRecruiterId(Long recruiterId);
}
