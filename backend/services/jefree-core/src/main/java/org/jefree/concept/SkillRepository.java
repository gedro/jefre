package org.jefree.concept;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SkillRepository extends JpaRepository<SkillEntity, String> {
    Optional<SkillEntity> findByUrl(String url);
}

